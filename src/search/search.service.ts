import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CacheService } from '../cache/cache.service';
import { SearchQueryDto } from './dto/search-query.dto';

@Injectable()
export class SearchService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheService,
  ) {}

  async search(query: SearchQueryDto) {
    const {
      q, minPrice, maxPrice, categoryId, inStock,
      variantName, variantValue,
      sortBy = 'createdAt', sortOrder = 'desc',
      page = 1, limit = 10,
    } = query;

    const cacheKey = CacheService.keys.search(JSON.stringify(query));
    const cached = await this.cache.get(cacheKey);
    if (cached) return cached;

    const skip = (page - 1) * limit;
    const where: any = { status: 'active', deletedAt: null };

    if (q) {
      where.OR = [
        { name:        { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
        { sku:         { contains: q, mode: 'insensitive' } },
        { variants:    { some: { value: { contains: q, mode: 'insensitive' }, isActive: true } } },
      ];
      this.trackSearch(q).catch(() => {});
    }

    if (categoryId) {
      const categoryIds = await this.getAllDescendantIds(categoryId);
      where.categoryId = { in: categoryIds };
    }

    if (inStock) where.stock = { gt: 0 };

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.basePrice = {
        ...(minPrice !== undefined && { gte: minPrice }),
        ...(maxPrice !== undefined && { lte: maxPrice }),
      };
    }

    if (variantName || variantValue) {
      where.variants = {
        some: {
          isActive: true,
          ...(variantName && { name: { contains: variantName, mode: 'insensitive' } }),
          ...(variantValue && { value: { contains: variantValue, mode: 'insensitive' } }),
        },
      };
    }

    const orderBy = this.buildOrderBy(sortBy, sortOrder);

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          images: {
            where: { isFeatured: true },
            take: 1,
            select: { imageUrl: true, altText: true },
          },
          category: { select: { id: true, name: true, slug: true } },
          variants: {
            where: { isActive: true },
            select: { id: true, name: true, value: true, basePrice: true, discountPrice: true, stock: true },
          },
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    // ✅ { data, meta } → TransformInterceptor akan wrap jadi { success, data, meta }
    const result = {
      data: products,
      meta: {
        page,
        limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
      },
    };

    await this.cache.set(cacheKey, result, 60 * 2);
    return result;
  }

  async getSuggestions(q: string) {
    if (!q) return [];

    const cacheKey = CacheService.keys.searchSuggestions(q);
    const cached = await this.cache.get<string[]>(cacheKey);
    if (cached) return cached;

    const products = await this.prisma.product.findMany({
      where: {
        status: 'active',
        deletedAt: null,
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { variants: { some: { value: { contains: q, mode: 'insensitive' }, isActive: true } } },
        ],
      },
      select: { name: true, slug: true },
      take: 10,
    });

    // ✅ Contract: array of strings
    const suggestions = products.map((p) => p.name);
    await this.cache.set(cacheKey, suggestions, 60 * 5);
    return suggestions;
  }

  async getPopularSearches(limit = 10) {
    const cacheKey = CacheService.keys.popularSearches();
    const cached = await this.cache.get(cacheKey);
    if (cached) return cached;

    const searches = await this.prisma.searchAnalytic.findMany({
      orderBy: { count: 'desc' },
      take: limit,
      select: { query: true, count: true },
    });

    await this.cache.set(cacheKey, searches, 60 * 10);
    return searches;
  }

  private async trackSearch(query: string) {
    const normalized = query.trim().toLowerCase();
    await this.prisma.searchAnalytic.upsert({
      where: { query: normalized },
      update: { count: { increment: 1 } },
      create: { query: normalized, count: 1 },
    });
    await this.cache.del(CacheService.keys.popularSearches());
  }

  private buildOrderBy(sortBy: string, sortOrder: 'asc' | 'desc') {
    if (sortBy === 'price') {
      return [
        { discountPrice: { sort: sortOrder, nulls: 'last' } as any },
        { basePrice: sortOrder },
      ];
    }
    const allowedSorts = ['createdAt', 'basePrice', 'soldCount', 'avgRating', 'name'];
    const field = allowedSorts.includes(sortBy) ? sortBy : 'createdAt';
    return { [field]: sortOrder };
  }

  private async getAllDescendantIds(categoryId: string): Promise<string[]> {
    const ids: string[] = [categoryId];
    const queue = [categoryId];
    while (queue.length > 0) {
      const parentId = queue.shift()!;
      const children = await this.prisma.category.findMany({
        where: { parentId },
        select: { id: true },
      });
      for (const child of children) {
        ids.push(child.id);
        queue.push(child.id);
      }
    }
    return ids;
  }
}