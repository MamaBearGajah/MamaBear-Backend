// src/admin/admin-products/admin-products.service.ts — GANTI FILE LAMA DENGAN INI
// Perubahan: tambah method duplicateProduct()

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductStatus } from '../../../generated/prisma/enums';
import { createObjectCsvStringifier } from 'csv-writer';
import { Readable } from 'node:stream';
import csvParser from 'csv-parser';

@Injectable()
export class AdminProductsService {
  constructor(private prisma: PrismaService) {}

  async exportProductsToCsv(): Promise<string> {
    const products = await this.prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { variants: true } } },
    });

    const csvStringifier = createObjectCsvStringifier({
      header: [
        { id: 'id',           title: 'ID' },
        { id: 'name',         title: 'NAME' },
        { id: 'slug',         title: 'SLUG' },
        { id: 'sku',          title: 'SKU' },
        { id: 'basePrice',    title: 'BASE_PRICE' },
        { id: 'discountPrice',title: 'DISCOUNT_PRICE' },
        { id: 'stock',        title: 'STOCK' },
        { id: 'weight',       title: 'WEIGHT' },
        { id: 'status',       title: 'STATUS' },
        { id: 'variants',     title: 'VARIANT_COUNT' },
        { id: 'description',  title: 'DESCRIPTION' },
        { id: 'createdAt',    title: 'CREATED_AT' },
      ],
    });

    const records = products.map((p) => ({
      id:            p.id,
      name:          p.name,
      slug:          p.slug,
      sku:           p.sku ?? '',
      basePrice:     Number(p.basePrice).toFixed(0),
      discountPrice: p.discountPrice ? Number(p.discountPrice).toFixed(0) : '',
      stock:         p.stock,
      weight:        p.weight,
      status:        p.status,
      variants:      p._count.variants,
      description:   (p.description ?? '').replace(/\n/g, ' '),
      createdAt:     p.createdAt.toISOString().slice(0, 10),
    }));

    return csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(records);
  }

  async importProductsFromCsv(fileBuffer: Buffer) {
    const results: any[] = [];
    const stream = Readable.from(fileBuffer);

    await new Promise((resolve, reject) => {
      stream
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', resolve)
        .on('error', reject);
    });

    let importedCount = 0;
    let failedCount = 0;
    const errors: Array<{ row: number; reason: string }> = [];

    for (let i = 0; i < results.length; i++) {
      const row = results[i];
      const rowNumber = i + 1;

      if (!row.name || !row.slug || !row.basePrice || !row.stock) {
        failedCount++;
        errors.push({ row: rowNumber, reason: 'Missing required fields (name, slug, basePrice, or stock)' });
        continue;
      }

      try {
        const existingProduct = await this.prisma.product.findUnique({ where: { slug: row.slug } });
        if (existingProduct) {
          failedCount++;
          errors.push({ row: rowNumber, reason: `Duplicate skipped. Slug "${row.slug}" already exists.` });
          continue;
        }

        const status = Object.values(ProductStatus).includes(row.status)
          ? (row.status as ProductStatus)
          : ProductStatus.draft;

        await this.prisma.product.create({
          data: {
            name:        row.name,
            slug:        row.slug,
            basePrice:   parseFloat(row.basePrice),
            stock:       parseInt(row.stock, 10),
            description: row.description || null,
            weight:      row.weight ? parseInt(row.weight, 10) : 0,
            sku:         row.sku || `SKU-${Date.now()}-${rowNumber}`,
            status,
            mainImage:   row.mainImage || row.imageUrl || '',
          },
        });

        importedCount++;
      } catch (error: any) {
        failedCount++;
        errors.push({ row: rowNumber, reason: error.message || 'Internal database error' });
      }
    }

    return { imported: importedCount, failed: failedCount, errors };
  }

  async bulkUpdateProducts(dto: { ids: string[]; data: { status?: ProductStatus; basePrice?: number } }) {
    const { ids, data } = dto;

    const found = await this.prisma.product.findMany({
      where: { id: { in: ids } },
      select: { id: true },
    });

    const foundIds = found.map((p) => p.id);
    const notFound = ids.filter((id) => !foundIds.includes(id));

    const result = await this.prisma.product.updateMany({
      where: { id: { in: foundIds } },
      data: {
        ...(data.status    !== undefined && { status: data.status }),
        ...(data.basePrice !== undefined && { basePrice: data.basePrice }),
      },
    });

    return {
      updated: result.count,
      notFound: notFound.length > 0 ? notFound : undefined,
    };
  }

  // ── Duplicate product ───────────────────────────────────────────────────────
  async duplicateProduct(productId: string) {
    const source = await this.prisma.product.findUnique({
      where: { id: productId },
      include: {
        images: true,
        variants: true,
      },
    });

    if (!source) throw new NotFoundException('Produk tidak ditemukan');

    // Generate unique slug & SKU
    const timestamp = Date.now();
    const newSlug = `${source.slug}-copy-${timestamp}`;
    const newSku  = `${source.sku}-COPY-${timestamp}`;

    const duplicate = await this.prisma.$transaction(async (tx) => {
      // Buat produk baru
      const newProduct = await tx.product.create({
        data: {
          name:          `${source.name} (Copy)`,
          slug:          newSlug,
          sku:           newSku,
          description:   source.description,
          notes:         source.notes,
          basePrice:     source.basePrice,
          discountPrice: source.discountPrice,
          weight:        source.weight,
          stock:         0, // reset stok ke 0 untuk produk baru
          mainImage:     source.mainImage,
          status:        ProductStatus.draft, // selalu draft
          categoryId:    source.categoryId,
        },
      });

      // Referensikan gambar yang sama (tidak copy file di cloud)
      if (source.images.length > 0) {
        await tx.productImage.createMany({
          data: source.images.map((img) => ({
            productId:  newProduct.id,
            imageUrl:   img.imageUrl,
            publicId:   img.publicId,
            altText:    img.altText,
            imageType:  img.imageType,
            sortOrder:  img.sortOrder,
            isFeatured: img.isFeatured,
          })),
        });
      }

      // Duplikasi variants
      if (source.variants.length > 0) {
        await tx.productVariant.createMany({
          data: source.variants.map((v) => ({
            productId:      newProduct.id,
            name:           v.name,
            value:          v.value,
            basePrice:      v.basePrice,
            discountPrice:  v.discountPrice,
            priceAdjustment:v.priceAdjustment,
            stock:          0, // reset stok variant
            weight:         v.weight,
            imageUrl:       v.imageUrl,
            altText:        v.altText,
            sku:            v.sku ? `${v.sku}-COPY-${timestamp}` : null,
            isActive:       v.isActive,
            sortOrder:      v.sortOrder,
          })),
        });
      }

      return newProduct;
    });

    return {
      message: 'Produk berhasil diduplikasi',
      data: { id: duplicate.id, slug: duplicate.slug, sku: duplicate.sku },
    };
  }
}
