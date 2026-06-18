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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const cache_service_1 = require("../cache/cache.service");
const CHILDREN_INCLUDE = {
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
    include: {
        children: {
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
            include: {
                children: {
                    where: { isActive: true },
                    orderBy: { sortOrder: 'asc' },
                    include: {
                        children: {
                            where: { isActive: true },
                            orderBy: { sortOrder: 'asc' },
                        },
                    },
                },
            },
        },
    },
};
let CategoriesService = class CategoriesService {
    prisma;
    cache;
    constructor(prisma, cache) {
        this.prisma = prisma;
        this.cache = cache;
    }
    slugify(text) {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    }
    async findAll(query) {
        const cacheKey = cache_service_1.CacheService.keys.categories(JSON.stringify(query));
        const cached = await this.cache.get(cacheKey);
        if (cached)
            return cached;
        const { isActive, parentId, page = 1, limit = 20 } = query;
        const skip = (page - 1) * limit;
        const where = {
            ...(isActive !== undefined && { isActive }),
            ...(parentId !== undefined && { parentId }),
        };
        const [data, total] = await this.prisma.$transaction([
            this.prisma.category.findMany({
                where,
                skip,
                take: limit,
                orderBy: { sortOrder: 'asc' },
                include: { children: CHILDREN_INCLUDE },
            }),
            this.prisma.category.count({ where }),
        ]);
        const result = {
            data,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
        };
        await this.cache.set(cacheKey, result, 60 * 10);
        return result;
    }
    async findOne(id) {
        const cacheKey = cache_service_1.CacheService.keys.category(id);
        const cached = await this.cache.get(cacheKey);
        if (cached)
            return cached;
        const category = await this.prisma.category.findUnique({
            where: { id },
            include: {
                children: CHILDREN_INCLUDE,
                parent: true,
            },
        });
        if (!category)
            throw new common_1.NotFoundException(`Kategori dengan id ${id} tidak ditemukan`);
        await this.cache.set(cacheKey, category, 60 * 10);
        return category;
    }
    async getBreadcrumb(id) {
        const breadcrumb = [];
        let currentId = id;
        while (currentId) {
            const category = await this.prisma.category.findUnique({
                where: { id: currentId },
                select: { id: true, name: true, slug: true, parentId: true },
            });
            if (!category)
                break;
            breadcrumb.unshift({ id: category.id, name: category.name, slug: category.slug });
            currentId = category.parentId;
        }
        if (breadcrumb.length === 0 || breadcrumb[breadcrumb.length - 1].id !== id) {
            throw new common_1.NotFoundException(`Kategori dengan id ${id} tidak ditemukan`);
        }
        return breadcrumb;
    }
    async create(dto) {
        const slug = dto.slug || this.slugify(dto.name);
        const existing = await this.prisma.category.findUnique({ where: { slug } });
        if (existing)
            throw new common_1.ConflictException(`Slug '${slug}' sudah digunakan`);
        if (dto.parentId) {
            const parent = await this.prisma.category.findUnique({ where: { id: dto.parentId } });
            if (!parent)
                throw new common_1.NotFoundException('Kategori parent tidak ditemukan');
        }
        const category = await this.prisma.category.create({
            data: { ...dto, slug },
        });
        await this.invalidateCategoryCache();
        return category;
    }
    async update(id, dto) {
        await this.findOne(id);
        if (dto.slug) {
            const existing = await this.prisma.category.findFirst({
                where: { slug: dto.slug, NOT: { id } },
            });
            if (existing)
                throw new common_1.ConflictException(`Slug '${dto.slug}' sudah digunakan`);
        }
        if (dto.parentId) {
            if (dto.parentId === id) {
                throw new common_1.ConflictException('Kategori tidak boleh menjadi parent dari dirinya sendiri');
            }
            let checkParentId = dto.parentId;
            while (checkParentId) {
                const parentCategory = await this.prisma.category.findUnique({
                    where: { id: checkParentId },
                    select: { id: true, parentId: true },
                });
                if (!parentCategory) {
                    throw new common_1.NotFoundException(`Kategori parent dengan id ${checkParentId} tidak ditemukan`);
                }
                if (parentCategory.id === id) {
                    throw new common_1.ConflictException('Circular reference terdeteksi! Kategori tidak boleh menjadi sub-kategori dari keturunannya sendiri.');
                }
                checkParentId = parentCategory.parentId;
            }
        }
        const category = await this.prisma.category.update({ where: { id }, data: dto });
        await this.invalidateCategoryCache(id);
        return category;
    }
    async remove(id) {
        const category = await this.prisma.category.findUnique({
            where: { id },
            include: { products: true, children: true },
        });
        if (!category)
            throw new common_1.NotFoundException(`Kategori dengan id ${id} tidak ditemukan`);
        if (category.products.length > 0) {
            throw new common_1.ConflictException(`Kategori masih memiliki ${category.products.length} produk, tidak bisa dihapus`);
        }
        if (category.children.length > 0) {
            throw new common_1.ConflictException(`Kategori masih memiliki ${category.children.length} sub-kategori, tidak bisa dihapus`);
        }
        const deleted = await this.prisma.category.delete({ where: { id } });
        await this.invalidateCategoryCache(id);
        return deleted;
    }
    async findProducts(id, query) {
        await this.findOne(id);
        const cacheKey = cache_service_1.CacheService.keys.categoryProducts(id, JSON.stringify(query));
        const cached = await this.cache.get(cacheKey);
        if (cached)
            return cached;
        const { page = 1, limit = 20 } = query;
        const skip = (page - 1) * limit;
        const categoryIds = await this.getAllDescendantIds(id);
        const andConditions = [];
        if (query.q) {
            andConditions.push({
                OR: [
                    { name: { contains: query.q, mode: 'insensitive' } },
                    { description: { contains: query.q, mode: 'insensitive' } },
                ],
            });
        }
        if (query.minPrice !== undefined || query.maxPrice !== undefined) {
            andConditions.push({
                OR: [
                    {
                        discountPrice: {
                            not: null,
                            ...(query.minPrice !== undefined && { gte: query.minPrice }),
                            ...(query.maxPrice !== undefined && { lte: query.maxPrice }),
                        },
                    },
                    {
                        discountPrice: null,
                        basePrice: {
                            ...(query.minPrice !== undefined && { gte: query.minPrice }),
                            ...(query.maxPrice !== undefined && { lte: query.maxPrice }),
                        },
                    },
                ],
            });
        }
        if (query.variantName || query.variantValue) {
            andConditions.push({
                variants: {
                    some: {
                        isActive: true,
                        ...(query.variantName && { name: { contains: query.variantName, mode: 'insensitive' } }),
                        ...(query.variantValue && { value: { contains: query.variantValue, mode: 'insensitive' } }),
                    },
                },
            });
        }
        const where = {
            categoryId: { in: categoryIds },
            status: 'active',
            deletedAt: null,
            ...(andConditions.length > 0 && { AND: andConditions }),
            ...(query.inStock && { stock: { gt: 0 } }),
        };
        const [data, total] = await this.prisma.$transaction([
            this.prisma.product.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [query.sortBy ?? 'createdAt']: query.sortOrder ?? 'desc' },
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    basePrice: true,
                    discountPrice: true,
                    stock: true,
                    status: true,
                    categoryId: true,
                    avgRating: true,
                    reviewCount: true,
                    category: { select: { id: true, name: true, slug: true } },
                    images: {
                        where: { isFeatured: true },
                        take: 1,
                        select: { imageUrl: true, altText: true },
                    },
                    variants: {
                        where: { isActive: true },
                        select: { id: true, name: true, value: true, basePrice: true, discountPrice: true, stock: true },
                    },
                },
            }),
            this.prisma.product.count({ where }),
        ]);
        const result = {
            data,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
        };
        await this.cache.set(cacheKey, result, 60 * 2);
        return result;
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
    async invalidateCategoryCache(id) {
        await this.cache.delByPattern('categories:*');
        if (id)
            await this.cache.del(cache_service_1.CacheService.keys.category(id));
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cache_service_1.CacheService])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map