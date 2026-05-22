import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  
  private slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
  }

  // ─── STOCK HELPERS ────────────────────────────────────────────────────────────

  /**
   * Sync stock produk induk dari total stock semua variant aktif.
   * Dipanggil dari VariantsService setiap kali variant ditambah/diupdate/dihapus.
   */
  async syncProductStock(productId: string) {
    const result = await this.prisma.productVariant.aggregate({
      where: { productId, isActive: true },
      _sum: { stock: true },
    });

    const hasVariants = await this.prisma.productVariant.count({ where: { productId } });

    if (hasVariants > 0) {
      await this.prisma.product.update({
        where: { id: productId },
        data: { stock: result._sum.stock ?? 0 },
      });
    }
  }

  /**
   * Reserve stok saat order dibuat (belum bayar).
   * Schema saat ini belum punya reservedStock, jadi langsung kurangi stock.
   * Dipanggil dari OrdersService saat order dibuat.
   */
  async reserveStock(items: { productId: string; variantId?: string; quantity: number }[]) {
    await this.prisma.$transaction(async (tx) => {
      for (const item of items) {
        if (item.variantId) {
          const variant = await tx.productVariant.findUnique({
            where: { id: item.variantId },
          });
          if (!variant) throw new NotFoundException('Variant tidak ditemukan');
          if (variant.stock < item.quantity) {
            throw new BadRequestException(
              `Stok tidak cukup untuk variant ${variant.name} ${variant.value}. Tersedia: ${variant.stock}`,
            );
          }

          await tx.productVariant.update({
            where: { id: item.variantId },
            data: { stock: { decrement: item.quantity } },
          });

          await tx.product.update({
            where: { id: item.productId },
            data: { stock: { decrement: item.quantity } },
          });
        } else {
          const product = await tx.product.findUnique({
            where: { id: item.productId },
          });
          if (!product) throw new NotFoundException('Produk tidak ditemukan');
          if (product.stock < item.quantity) {
            throw new BadRequestException(
              `Stok tidak cukup untuk produk ${product.name}. Tersedia: ${product.stock}`,
            );
          }

          await tx.product.update({
            where: { id: item.productId },
            data: { stock: { decrement: item.quantity } },
          });
        }
      }
    });
  }

  /**
   * Increment soldCount setelah payment sukses.
   * Dipanggil dari PaymentsService saat payment confirmed.
   * Note: stock sudah dikurangi di reserveStock saat order dibuat.
   */
  async confirmStockDeduction(items: { productId: string; variantId?: string; quantity: number }[]) {
    await this.prisma.$transaction(async (tx) => {
      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { soldCount: { increment: item.quantity } },
        });
      }
    });
  }

  /**
   * Kembalikan stok saat order dibatalkan / payment gagal / expired.
   * Dipanggil dari PaymentsService atau OrdersService saat cancel.
   */
  async releaseReservation(items: { productId: string; variantId?: string; quantity: number }[]) {
    await this.prisma.$transaction(async (tx) => {
      for (const item of items) {
        if (item.variantId) {
          await tx.productVariant.update({
            where: { id: item.variantId },
            data: { stock: { increment: item.quantity } },
          });

          await tx.product.update({
            where: { id: item.productId },
            data: { stock: { increment: item.quantity } },
          });
        } else {
          await tx.product.update({
            where: { id: item.productId },
            data: { stock: { increment: item.quantity } },
          });
        }
      }
    });
  }

  // ─── PRODUCTS ─────────────────────────────────────────────────────────────────

  async findAll(query: ProductQueryDto) {
    const {
      page = 1, limit = 20, q, categoryId,
      minPrice, maxPrice, inStock,
      sortBy = 'createdAt', sortOrder = 'desc',
    } = query;

    const where: any = { status: 'active' };

    if (q) {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
        { sku: { contains: q, mode: 'insensitive' } },
      ];
    }

    if (categoryId) where.categoryId = categoryId;

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.basePrice = {
        ...(minPrice !== undefined && { gte: minPrice }),
        ...(maxPrice !== undefined && { lte: maxPrice }),
      }
    }

    if (inStock) {
      where.stock = { gt: 0 };
    }

    const [data, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          images: { where: { isFeatured: true }, take: 1 },
          category: { select: { id: true, name: true, slug: true } },
        },
      }),
      this.prisma.product.count({ where }),
    ])

    return { data, meta: { page, limit, totalItems: total, totalPages: Math.ceil(total / limit) } }
  }

  async findBestSellers(limit = 10) {
    return this.prisma.product.findMany({
      where: { status: 'active' },
      orderBy: { soldCount: 'desc' },
      take: limit,
      include: {
        images: {
          where: { imageType: 'main' },
          select: { imageUrl: true, altText: true },
          take: 1,
        },
        category: { select: { id: true, name: true, slug: true } },
      },
    });
  }

  async create(dto: CreateProductDto) {
    const productSlug = dto.slug || this.slugify(dto.name);

    const existing = await this.prisma.product.findFirst({
      where: { OR: [{ slug: productSlug }, { sku: dto.sku }] },
    });
    if (existing) throw new BadRequestException('Slug atau SKU sudah digunakan');

    const { images, variants, ...productData } = dto;

    const existing = await this.prisma.product.findFirst({
      where: {
        OR: [{ slug: productSlug }, { sku: dto.sku }]
      }
    })

    const { images, variants, ...productData } = dto
    
    return this.prisma.product.create({
      data: {
        ...productData,
        slug: productSlug,
        images: images ? { create: images } : undefined,
        variants: variants ? { create: variants } : undefined,
      },
      include: {
        images: true,
        variants: true,
        category: true,
      },
    })
  }

  // Find Product by ID
  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        images: true,
        variants: { where: { isActive: true } },
        category: true,
      },
    });
    if (!product) throw new NotFoundException('Produk tidak ditemukan');
    return product;
  }

  // Find Product by Slug
  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        images: true,
        variants: { where: { isActive: true } },
        category: true,
      },
    });
    if (!product) throw new NotFoundException('Produk tidak ditemukan');
    return product;
  }

  // Update Product by ID
  async update(id: string, dto: UpdateProductDto) {
    await this.findOne(id);
    const { images: _, variants: __, ...updateData } = dto;
    const productSlug = dto.name ? this.slugify(dto.name) : undefined;

    return this.prisma.product.update({
      where: { id },
      data: { ...updateData, ...(productSlug && { slug: productSlug }) },
      include: { images: true, variants: true, category: true },
    });
  }

  // Delete Product by ID
  async remove(id:string) {
    await this.findOne(id)
    return this.prisma.product.delete({ where: { id } })
  }

  // ─── ADMIN: ALL VARIANTS ACROSS PRODUCTS ──────────────────────────────────────
  // Tetap di ProductsService karena query lintas produk, bukan per produk

  async findAllVariants(query: { page?: number; limit?: number; productId?: string }) {
    const { page = 1, limit = 20, productId } = query;
    const where: any = { ...(productId && { productId }) };

    const [data, total] = await Promise.all([
      this.prisma.productVariant.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          product: {
            select: {
              id: true,
              name: true,
              slug: true,
              stock: true,
              images: {
                where: { imageType: 'main' },
                select: { imageUrl: true },
                take: 1,
              },
              category: { select: { id: true, name: true, slug: true } },
            },
          },
        },
      }),
      this.prisma.productVariant.count({ where }),
    ]);

    return {
      data,
      meta: { page, limit, totalItems: total, totalPages: Math.ceil(total / limit) },
    };
  }
}
