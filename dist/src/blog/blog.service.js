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
exports.BlogService = exports.UpdateBlogDto = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const cache_service_1 = require("../cache/cache.service");
const create_blog_dto_1 = require("./dto/create-blog.dto");
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("../../generated/prisma/enums");
class UpdateBlogDto extends (0, swagger_1.PartialType)(create_blog_dto_1.CreateBlogDto) {
}
exports.UpdateBlogDto = UpdateBlogDto;
let BlogService = class BlogService {
    prisma;
    cache;
    constructor(prisma, cache) {
        this.prisma = prisma;
        this.cache = cache;
    }
    publicSelect = {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        status: true,
        viewCount: true,
        publishedAt: true,
        createdAt: true,
        author: { select: { id: true, name: true } },
    };
    async findAll(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const cacheKey = `blog:list:${page}:${limit}`;
        const cached = await this.cache.get(cacheKey);
        if (cached)
            return cached;
        const [posts, total] = await Promise.all([
            this.prisma.blogPost.findMany({
                where: { status: enums_1.BlogStatus.published },
                orderBy: { publishedAt: 'desc' },
                skip,
                take: limit,
                select: this.publicSelect,
            }),
            this.prisma.blogPost.count({ where: { status: enums_1.BlogStatus.published } }),
        ]);
        const result = { data: posts, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
        await this.cache.set(cacheKey, result, 300);
        return result;
    }
    async findBySlug(slug) {
        const cacheKey = `blog:slug:${slug}`;
        const cached = await this.cache.get(cacheKey);
        if (cached) {
            this.prisma.blogPost.update({ where: { slug }, data: { viewCount: { increment: 1 } } }).catch(() => { });
            return cached;
        }
        const post = await this.prisma.blogPost.findUnique({
            where: { slug },
            include: { author: { select: { id: true, name: true } } },
        });
        if (!post || post.status !== enums_1.BlogStatus.published)
            throw new common_1.NotFoundException('Artikel tidak ditemukan');
        await this.prisma.blogPost.update({ where: { slug }, data: { viewCount: { increment: 1 } } });
        await this.cache.set(cacheKey, post, 300);
        return post;
    }
    async findAllAdmin(page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const [posts, total] = await Promise.all([
            this.prisma.blogPost.findMany({
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
                include: { author: { select: { id: true, name: true } } },
            }),
            this.prisma.blogPost.count(),
        ]);
        return { data: posts, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
    }
    async create(authorId, dto) {
        const existing = await this.prisma.blogPost.findUnique({ where: { slug: dto.slug } });
        if (existing)
            throw new common_1.BadRequestException(`Slug "${dto.slug}" sudah digunakan`);
        const post = await this.prisma.blogPost.create({
            data: {
                title: dto.title,
                slug: dto.slug,
                excerpt: dto.excerpt,
                coverImage: dto.coverImage,
                coverPublicId: dto.coverPublicId,
                content: dto.content,
                status: dto.status ?? enums_1.BlogStatus.draft,
                authorId,
                ...(dto.status === enums_1.BlogStatus.published && { publishedAt: new Date() }),
            },
            include: { author: { select: { id: true, name: true } } },
        });
        await this.invalidateCache();
        return post;
    }
    async update(id, dto) {
        const post = await this.prisma.blogPost.findUnique({ where: { id } });
        if (!post)
            throw new common_1.NotFoundException('Artikel tidak ditemukan');
        const wasPublished = post.status === enums_1.BlogStatus.published;
        const willPublish = dto.status === enums_1.BlogStatus.published;
        const updated = await this.prisma.blogPost.update({
            where: { id },
            data: {
                ...(dto.title && { title: dto.title }),
                ...(dto.slug && { slug: dto.slug }),
                ...(dto.excerpt !== undefined && { excerpt: dto.excerpt }),
                ...(dto.coverImage !== undefined && { coverImage: dto.coverImage }),
                ...(dto.coverPublicId !== undefined && { coverPublicId: dto.coverPublicId }),
                ...(dto.content && { content: dto.content }),
                ...(dto.status && { status: dto.status }),
                ...(!wasPublished && willPublish && { publishedAt: new Date() }),
            },
            include: { author: { select: { id: true, name: true } } },
        });
        await this.invalidateCache(post.slug, dto.slug);
        return updated;
    }
    async remove(id) {
        const post = await this.prisma.blogPost.findUnique({ where: { id } });
        if (!post)
            throw new common_1.NotFoundException('Artikel tidak ditemukan');
        await this.prisma.blogPost.delete({ where: { id } });
        await this.invalidateCache(post.slug);
        return { message: 'Artikel berhasil dihapus' };
    }
    async invalidateCache(oldSlug, newSlug) {
        await this.cache.delByPattern('blog:list:*');
        if (oldSlug)
            await this.cache.del(`blog:slug:${oldSlug}`);
        if (newSlug && newSlug !== oldSlug)
            await this.cache.del(`blog:slug:${newSlug}`);
    }
};
exports.BlogService = BlogService;
exports.BlogService = BlogService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cache_service_1.CacheService])
], BlogService);
//# sourceMappingURL=blog.service.js.map