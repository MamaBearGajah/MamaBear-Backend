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
          const product = await tx.product.findUnique({ where: { id: item.productId } });
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

  // ─── PRODUCTS ─────────────────────────────────────────────────────────────

  async findAll(query: ProductQueryDto) {
    const cacheKey = CacheService.keys.products(JSON.stringify(query));
    const cached = await this.cache.get(cacheKey);
    if (cached) return cached;

    const result = await this.queryProducts(query);
    await this.cache.set(cacheKey, result, 60 * 2); // 2 menit
    return result;
  }

  // ✅ /products/filter — endpoint terpisah dengan logika yang sama
  async filter(query: ProductQueryDto) {
    return this.findAll(query);
  }

  async findBestSellers(limit = 10) {
    const cacheKey = CacheService.keys.productBestSellers(limit);
    const cached = await this.cache.get(cacheKey);
    if (cached) return cached;

    const products = await this.prisma.product.findMany({
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

    await this.cache.set(cacheKey, products, 60 * 5); // 5 menit
    return products;
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

    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        images: true,
        variants: { where: { isActive: true } },
        category: true,
      },
    });
    if (!product) throw new NotFoundException('Produk tidak ditemukan');

    await this.cache.set(cacheKey, product, 60 * 5);
    return product;
  }

  async findBySlug(slug: string) {
    const cacheKey = CacheService.keys.productSlug(slug);
    const cached = await this.cache.get(cacheKey);
    if (cached) return cached;

    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        images: true,
        variants: { where: { isActive: true } },
        category: true,
      },
    });
    if (!product) throw new NotFoundException('Produk tidak ditemukan');

    await this.cache.set(cacheKey, product, 60 * 5);
    return product;
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
    const product = await this.prisma.product.delete({ where: { id } });
    await this.invalidateProductCache(id);
    return product;
  }

  // ─── ADMIN: ALL VARIANTS ACROSS PRODUCTS ──────────────────────────────────

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

  // ─── Private Helpers ──────────────────────────────────────────────────────

  private async queryProducts(query: ProductQueryDto) {
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
      };
    }

    if (inStock) where.stock = { gt: 0 };

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

    return {
      data,
      meta: { page, limit, totalItems: total, totalPages: Math.ceil(total / limit) },
    };
  }

  private async invalidateProductCache(id: string) {
    await this.cache.del(CacheService.keys.product(id));
    await this.cache.delByPattern('products:list:*');
    await this.cache.delByPattern('products:best-sellers:*');
  }
}