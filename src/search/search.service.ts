// src/search/search.service.ts
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
      q,
      minPrice,
      maxPrice,
      categoryId,
      inStock,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 10,
    } = query;

    const cacheKey = CacheService.keys.search(JSON.stringify(query));
    const cached = await this.cache.get(cacheKey);
    if (cached) return cached;

    const skip = (page - 1) * limit;

    const where: any = { status: 'active' };

    if (q) {
      where.OR = [
        { name:        { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
        { sku:         { contains: q, mode: 'insensitive' } },
      ];

      // Track analytics async — tidak block response
      this.trackSearch(q).catch(() => {});
    }

    if (categoryId) {
      // Rekursif: cari semua descendant category IDs
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

    // ✅ Sort di DB — bukan in-memory
    const orderBy = this.buildOrderBy(sortBy, sortOrder);

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          images: { where: { isFeatured: true }, take: 1, select: { imageUrl: true, altText: true } },
          category: { select: { id: true, name: true, slug: true } },
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    const result = {
      data: products,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };

    await this.cache.set(cacheKey, result, 60 * 2); // 2 menit
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
        name: { contains: q, mode: 'insensitive' },
      },
      select: { name: true, slug: true },
      take: 10,
    });

    const suggestions = products.map((p) => ({ name: p.name, slug: p.slug }));
    await this.cache.set(cacheKey, suggestions, 60 * 5); // 5 menit
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

    await this.cache.set(cacheKey, searches, 60 * 10); // 10 menit
    return searches;
  }

  // ─── Private Helpers ──────────────────────────────────────────────────────

  private async trackSearch(query: string) {
    const normalized = query.trim().toLowerCase();
    await this.prisma.searchAnalytic.upsert({
      where: { query: normalized },
      update: { count: { increment: 1 } },
      create: { query: normalized, count: 1 },
    });
    // Invalidate popular searches cache
    await this.cache.del(CacheService.keys.popularSearches());
  }

  private buildOrderBy(sortBy: string, sortOrder: 'asc' | 'desc') {
    // Sort by effective price: gunakan discountPrice jika ada, fallback ke basePrice
    // Prisma tidak support conditional column sort langsung,
    // jadi sort by discountPrice dulu (nulls last), lalu basePrice sebagai fallback
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