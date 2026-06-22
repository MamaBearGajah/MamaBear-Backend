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
var BannerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const cache_service_1 = require("../cache/cache.service");
const CACHE_KEY = 'banners:active';
const CACHE_TTL = 60;
let BannerService = BannerService_1 = class BannerService {
    prisma;
    cache;
    logger = new common_1.Logger(BannerService_1.name);
    constructor(prisma, cache) {
        this.prisma = prisma;
        this.cache = cache;
    }
    async getActiveBanners() {
        try {
            const cached = await this.cache.get(CACHE_KEY);
            if (cached)
                return cached;
        }
        catch {
        }
        const now = new Date();
        const banners = await this.prisma.banner.findMany({
            where: {
                isActive: true,
                OR: [{ startDate: null }, { startDate: { lte: now } }],
                AND: [{ OR: [{ endDate: null }, { endDate: { gte: now } }] }],
            },
            orderBy: { sortOrder: 'asc' },
        });
        try {
            await this.cache.set(CACHE_KEY, banners, CACHE_TTL);
        }
        catch {
        }
        return banners;
    }
    async create(dto) {
        const banner = await this.prisma.banner.create({
            data: {
                imageUrl: dto.imageUrl,
                altText: dto.altText,
                label: dto.label,
                title: dto.title,
                desc: dto.desc,
                path: dto.path,
                isActive: dto.isActive ?? true,
                sortOrder: dto.sortOrder ?? 0,
                startDate: dto.startDate ? new Date(dto.startDate) : undefined,
                endDate: dto.endDate ? new Date(dto.endDate) : undefined,
            },
        });
        await this.invalidateCache();
        return banner;
    }
    async findAll() {
        return this.prisma.banner.findMany({
            orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
        });
    }
    async findOne(id) {
        const banner = await this.prisma.banner.findUnique({ where: { id } });
        if (!banner)
            throw new common_1.NotFoundException('Banner tidak ditemukan');
        return banner;
    }
    async update(id, dto) {
        await this.findOne(id);
        const banner = await this.prisma.banner.update({
            where: { id },
            data: {
                ...(dto.imageUrl && { imageUrl: dto.imageUrl }),
                ...(dto.altText !== undefined && { altText: dto.altText }),
                ...(dto.label !== undefined && { label: dto.label }),
                ...(dto.title !== undefined && { title: dto.title }),
                ...(dto.desc !== undefined && { desc: dto.desc }),
                ...(dto.path !== undefined && { path: dto.path }),
                ...(dto.isActive !== undefined && { isActive: dto.isActive }),
                ...(dto.sortOrder !== undefined && { sortOrder: dto.sortOrder }),
                ...(dto.startDate !== undefined && {
                    startDate: dto.startDate ? new Date(dto.startDate) : null,
                }),
                ...(dto.endDate !== undefined && {
                    endDate: dto.endDate ? new Date(dto.endDate) : null,
                }),
            },
        });
        await this.invalidateCache();
        return banner;
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.banner.delete({ where: { id } });
        await this.invalidateCache();
        return { message: 'Banner berhasil dihapus' };
    }
    async invalidateCache() {
        try {
            await this.cache.del(CACHE_KEY);
        }
        catch (err) {
            this.logger.warn(`Gagal invalidate cache banner: ${err}`);
        }
    }
};
exports.BannerService = BannerService;
exports.BannerService = BannerService = BannerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cache_service_1.CacheService])
], BannerService);
//# sourceMappingURL=banner.service.js.map