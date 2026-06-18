"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../../generated/prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const cache_service_1 = require("../cache/cache.service");
let SearchService = class SearchService {
    prisma;
    cache;
    constructor(prisma, cache) {
        this.prisma = prisma;
        this.cache = cache;
    }
    async search(query) {
        const { q, minPrice, maxPrice, categoryId, inStock, variantName, variantValue, sortBy = 'createdAt', sortOrder = 'desc', page = 1, limit = 10, } = query;
        const cacheKey = cache_service_1.CacheService.keys.search(JSON.stringify(query));
        const cached = await this.cache.get(cacheKey);
        if (cached)
            return cached;
        const skip = (page - 1) * limit;
        let categoryIds = null;
        if (categoryId) {
            categoryIds = await this.getAllDescendantIds(categoryId);
        }
        let priceFilteredIds = null;
        if (minPrice !== undefined || maxPrice !== undefined) {
            const min = minPrice ?? 0;
            const max = maxPrice ?? Number.MAX_SAFE_INTEGER;
            const rows = await this.prisma.$queryRaw(client_1.Prisma.sql `
          SELECT id FROM "Product"
          WHERE status = 'active'
            AND "deletedAt" IS NULL
            AND COALESCE("discountPrice", "basePrice") >= ${min}
            AND COALESCE("discountPrice", "basePrice") <= ${max}
            ${categoryIds
                ? client_1.Prisma.sql `AND "categoryId" = ANY(${categoryIds}::uuid[])`
                : client_1.Prisma.empty}
        `);
            priceFilteredIds = rows.map((r) => r.id);
        }
        const where = { status: 'active', deletedAt: null };
        if (priceFilteredIds) {
            where.id = { in: priceFilteredIds };
        }
        else if (categoryIds) {
            where.categoryId = { in: categoryIds };
        }
        if (q) {
            where.OR = [
                { name: { contains: q, mode: 'insensitive' } },
                { description: { contains: q, mode: 'insensitive' } },
                { sku: { contains: q, mode: 'insensitive' } },
                { variants: { some: { value: { contains: q, mode: 'insensitive' }, isActive: true } } },
            ];
            this.trackSearch(q).catch(() => { });
        }
        if (inStock)
            where.stock = { gt: 0 };
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
        const result = {
            data: products,
            meta: { page, limit, totalItems: total, totalPages: Math.ceil(total / limit) },
        };
        await this.cache.set(cacheKey, result, 60 * 2);
        return result;
    }
    async getSuggestions(q) {
        if (!q)
            return [];
        const cacheKey = cache_service_1.CacheService.keys.searchSuggestions(q);
        const cached = await this.cache.get(cacheKey);
        if (cached)
            return cached;
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
        const suggestions = products.map((p) => p.name);
        await this.cache.set(cacheKey, suggestions, 60 * 5);
        return suggestions;
    }
    async getPopularSearches(limit = 10) {
        const cacheKey = cache_service_1.CacheService.keys.popularSearches();
        const cached = await this.cache.get(cacheKey);
        if (cached)
            return cached;
        const searches = await this.prisma.searchAnalytic.findMany({
            orderBy: { count: 'desc' },
            take: limit,
            select: { query: true, count: true },
        });
        await this.cache.set(cacheKey, searches, 60 * 10);
        return searches;
    }
    async trackSearch(query) {
        const normalized = query.trim().toLowerCase();
        await this.prisma.searchAnalytic.upsert({
            where: { query: normalized },
            update: { count: { increment: 1 } },
            create: { query: normalized, count: 1 },
        });
        await this.cache.del(cache_service_1.CacheService.keys.popularSearches());
    }
    buildOrderBy(sortBy, sortOrder) {
        if (sortBy === 'price') {
            return [
                { discountPrice: { sort: sortOrder, nulls: 'last' } },
                { basePrice: sortOrder },
            ];
        }
        const allowedSorts = ['createdAt', 'basePrice', 'soldCount', 'avgRating', 'name'];
        const field = allowedSorts.includes(sortBy) ? sortBy : 'createdAt';
        return { [field]: sortOrder };
    }
    async getAllDescendantIds(categoryId) {
        const ids = [categoryId];
        const queue = [categoryId];
        while (queue.length > 0) {
            const parentId = queue.shift();
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
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cache_service_1.CacheService])
], SearchService);
//# sourceMappingURL=search.service.js.map