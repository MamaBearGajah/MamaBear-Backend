import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CacheService } from '../cache/cache.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private cache: CacheService,
  ) {}

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  private withAvailableStock<T extends { stock: number; reservedStock: number; variants?: any[] }>(product: T) {
    return {
      ...product,
      availableStock: product.stock - product.reservedStock,
      ...(product.variants && {
        variants: product.variants.map((v: any) => ({
          ...v,
          availableStock: v.stock - v.reservedStock,
          effectivePrice: v.discountPrice ?? v.basePrice,
        })),
      }),
    };
  }

  // ─── STOCK HELPERS ────────────────────────────────────────────────────────

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

    await this.invalidateProductCache(productId);
  }

  async reserveStock(items: { productId: string; variantId?: string; quantity: number }[]) {
    await this.prisma.$transaction(async (tx) => {
      for (const item of items) {
        if (item.variantId) {
          const variant = await tx.productVariant.findUnique({ where: { id: item.variantId } });
          if (!variant) throw new NotFoundException('Variant tidak ditemukan');

          const availableStock = variant.stock - variant.reservedStock;
          if (availableStock < item.quantity) {
            throw new BadRequestException(
              `Stok tidak cukup untuk variant ${variant.name} ${variant.value}. Tersedia: ${availableStock}`,
            );
          }

          await tx.productVariant.update({
            where: { id: item.variantId },
            data: { reservedStock: { increment: item.quantity } },
          });
          await tx.product.update({
            where: { id: item.productId },
            data: { reservedStock: { increment: item.quantity } },
          });
        } else {
          const product = await tx.product.findUnique({ where: { id: item.productId } });
          if (!product) throw new NotFoundException('Produk tidak ditemukan');

          const availableStock = product.stock - product.reservedStock;
          if (availableStock < item.quantity) {
            throw new BadRequestException(
              `Stok tidak cukup untuk produk ${product.name}. Tersedia: ${availableStock}`,
            );
          }

          await tx.product.update({
            where: { id: item.productId },
            data: { reservedStock: { increment: item.quantity } },
          });
        }
      }
    });
  }

  async confirmStockDeduction(items: { productId: string; variantId?: string; quantity: number }[]) {
    await this.prisma.$transaction(async (tx) => {
      for (const item of items) {
        if (item.variantId) {
          await tx.productVariant.update({
            where: { id: item.variantId },
            data: {
              stock: { decrement: item.quantity },
              reservedStock: { decrement: item.quantity },
            },
          });
        }

        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: { decrement: item.quantity },
            reservedStock: { decrement: item.quantity },
            soldCount: { increment: item.quantity },
          },
        });
      }
    });
  }

  async releaseReservation(items: { productId: string; variantId?: string; quantity: number }[]) {
    await this.prisma.$transaction(async (tx) => {
      for (const item of items) {
        if (item.variantId) {
          await tx.productVariant.update({
            where: { id: item.variantId },
            data: { reservedStock: { decrement: item.quantity } },
          });
        }

        await tx.product.update({
          where: { id: item.productId },
          data: { reservedStock: { decrement: item.quantity } },
        });
      }
    });
  }

  // ─── PRODUCTS ─────────────────────────────────────────────────────────────

  async findAll(query: ProductQueryDto) {
    const {
      page = 1, limit = 20, q, categoryId,
      minPrice, maxPrice, inStock,
      sortBy = 'createdAt', sortOrder = 'desc',
    } = query;

    const where: any = { status: 'active', deletedAt: null };

    // FIX: Gunakan AND supaya q filter dan price filter tidak bentrok
    const andConditions: any[] = [];

    // Search filter
    if (q) {
      andConditions.push({
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } },
          { sku: { contains: q, mode: 'insensitive' } },
        ],
      });
    }

    // Price filter: pakai discountPrice jika ada, fallback ke basePrice
    // Ini supaya filter "Rp 100k–125k" hanya loloskan produk yang harganya
    // (setelah diskon) memang dalam range tersebut
    if (minPrice !== undefined || maxPrice !== undefined) {
      andConditions.push({
        OR: [
          // Punya discountPrice → bandingkan discountPrice
          {
            discountPrice: {
              not: null,
              ...(minPrice !== undefined && { gte: minPrice }),
              ...(maxPrice !== undefined && { lte: maxPrice }),
            },
          },
          // Tidak punya discountPrice → bandingkan basePrice
          {
            discountPrice: null,
            basePrice: {
              ...(minPrice !== undefined && { gte: minPrice }),
              ...(maxPrice !== undefined && { lte: maxPrice }),
            },
          },
        ],
      });
    }

    if (andConditions.length > 0) {
      where.AND = andConditions;
    }

    if (categoryId) where.categoryId = categoryId;
    if (inStock) where.stock = { gt: 0 };

    const cacheKey = CacheService.keys.products(JSON.stringify(query));
    const cached = await this.cache.get(cacheKey);
    if (cached) return cached;

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
    ]);

    const result = {
      data: data.map((p) => ({
        ...p,
        availableStock: p.stock - p.reservedStock,
      })),
      meta: { page, limit, totalItems: total, totalPages: Math.ceil(total / limit) },
    };

    await this.cache.set(cacheKey, result, 60 * 2);
    return result;
  }

  async findBestSellers(limit = 10) {
    const cacheKey = CacheService.keys.productBestSellers(limit);
    const cached = await this.cache.get(cacheKey);
    if (cached) return cached;

    const products = await this.prisma.product.findMany({
      where: { status: 'active', deletedAt: null },
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

    const result = products.map((p) => ({
      ...p,
      availableStock: p.stock - p.reservedStock,
    }));
    await this.cache.set(cacheKey, result, 60 * 5);
    return result;
  }

  async create(dto: CreateProductDto) {
    const productSlug = dto.slug || this.slugify(dto.name);

    const existing = await this.prisma.product.findFirst({
      where: { OR: [{ slug: productSlug }, { sku: dto.sku }] },
    });
    if (existing) throw new BadRequestException('Slug atau SKU sudah digunakan');

    const { images, variants, ...productData } = dto;

    const product = await this.prisma.product.create({
      data: {
        ...productData,
        slug: productSlug,
        images: images ? { create: images } : undefined,
        variants: variants ? { create: variants } : undefined,
      },
      include: { images: true, variants: true, category: true },
    });

    await this.cache.delByPattern('products:*');
    return product;
  }

  async findOne(id: string) {
    const cacheKey = CacheService.keys.product(id);
    const cached = await this.cache.get(cacheKey);
    if (cached) return cached;

    const product = await this.prisma.product.findFirst({
      where: { id, deletedAt: null },
      include: {
        images: {
          orderBy: [
            { imageType: 'asc' },
            { sortOrder: 'asc' },
          ],
        },
        variants: {
          where: { isActive: true },
          orderBy: { createdAt: 'asc' },
        },
        category: true,
      },
    });
    if (!product) throw new NotFoundException('Produk tidak ditemukan');

    const result = this.withAvailableStock(product as any);
    await this.cache.set(cacheKey, result, 60 * 5);
    return result;
  }

  async findBySlug(slug: string) {
    const cacheKey = CacheService.keys.productSlug(slug);
    const cached = await this.cache.get(cacheKey);
    if (cached) return cached;

    const product = await this.prisma.product.findFirst({
      where: { slug, deletedAt: null },
      include: {
        images: {
          orderBy: [
            { imageType: 'asc' },
            { sortOrder: 'asc' },
          ],
        },
        variants: {
          where: { isActive: true },
          orderBy: { createdAt: 'asc' },
        },
        category: true,
      },
    });
    if (!product) throw new NotFoundException('Produk tidak ditemukan');

    const result = this.withAvailableStock(product as any);
    await this.cache.set(cacheKey, result, 60 * 5);
    return result;
  }

  async update(id: string, dto: UpdateProductDto) {
    await this.findOne(id);
    const { images: _, variants: __, ...updateData } = dto;
    const productSlug = dto.name ? this.slugify(dto.name) : undefined;

    const product = await this.prisma.product.update({
      where: { id },
      data: { ...updateData, ...(productSlug && { slug: productSlug }) },
      include: { images: true, variants: true, category: true },
    });

    await this.invalidateProductCache(id);
    return product;
  }

  async remove(id: string) {
    await this.findOne(id);
    const product = await this.prisma.product.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    await this.invalidateProductCache(id);
    return product;
  }

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

  // ─── NAME + ID ONLY (untuk dropdown create variant) ───────────────────────

  async findAllNameAndId(query: ProductQueryDto) {
    const {
      page = 1,
      limit = 100,
      q,
      sortBy = 'name',
      sortOrder = 'asc',
    } = query;

    const where: any = { status: 'active', deletedAt: null };

    if (q) {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { sku: { contains: q, mode: 'insensitive' } },
      ];
    }

    const cacheKey = `products:name-id:${JSON.stringify({ page, limit, q, sortBy, sortOrder })}`;
    const cached = await this.cache.get(cacheKey);
    if (cached) return cached;

    const [data, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        select: { id: true, name: true },
      }),
      this.prisma.product.count({ where }),
    ]);

    const result = {
      data,
      meta: { page, limit, totalItems: total, totalPages: Math.ceil(total / limit) },
    };

    await this.cache.set(cacheKey, result, 60 * 5);
    return result;
  }

  private async invalidateProductCache(id: string) {
    await this.cache.del(CacheService.keys.product(id));
    await this.cache.delByPattern('products:list:*');
    await this.cache.delByPattern('products:best-sellers:*');
  }
}