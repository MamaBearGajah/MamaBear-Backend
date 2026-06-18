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
exports.PromotionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const create_promotion_dto_1 = require("./dto/create-promotion.dto");
let PromotionService = class PromotionService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    include = {
        sections: {
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
        },
        benefits: {
            orderBy: { sortOrder: 'asc' },
        },
    };
    async findBySlug(slug) {
        const now = new Date();
        const promo = await this.prisma.promotionLanding.findUnique({
            where: { slug },
            include: this.include,
        });
        if (!promo)
            throw new common_1.NotFoundException('Halaman promosi tidak ditemukan');
        if (promo.endDate && promo.endDate < now && promo.status === 'active') {
            await this.prisma.promotionLanding.update({
                where: { id: promo.id },
                data: { status: 'ended' },
            });
            promo.status = 'ended';
        }
        const bundles = await this.getActiveBundlesForPromo(promo.heroBundleId);
        return { ...promo, bundles };
    }
    async findActive() {
        const now = new Date();
        const promo = await this.prisma.promotionLanding.findFirst({
            where: {
                status: create_promotion_dto_1.PromotionStatus.active,
                OR: [{ startDate: null }, { startDate: { lte: now } }],
                AND: [{ OR: [{ endDate: null }, { endDate: { gte: now } }] }],
            },
            orderBy: { startDate: 'desc' },
            include: this.include,
        });
        if (!promo)
            return null;
        const bundles = await this.getActiveBundlesForPromo(promo.heroBundleId);
        return { ...promo, bundles };
    }
    async findAll() {
        return this.prisma.promotionLanding.findMany({
            orderBy: { createdAt: 'desc' },
            include: this.include,
        });
    }
    async findOne(id) {
        const promo = await this.prisma.promotionLanding.findUnique({
            where: { id },
            include: this.include,
        });
        if (!promo)
            throw new common_1.NotFoundException('Promosi tidak ditemukan');
        return promo;
    }
    async create(dto) {
        const existing = await this.prisma.promotionLanding.findUnique({
            where: { slug: dto.slug },
        });
        if (existing)
            throw new common_1.BadRequestException(`Slug "${dto.slug}" sudah digunakan`);
        return this.prisma.promotionLanding.create({
            data: {
                title: dto.title,
                slug: dto.slug,
                subtitle: dto.subtitle,
                description: dto.description,
                badgeText: dto.badgeText,
                startDate: dto.startDate ? new Date(dto.startDate) : undefined,
                endDate: dto.endDate ? new Date(dto.endDate) : undefined,
                status: dto.status ?? 'draft',
                heroBundleId: dto.heroBundleId,
                sections: dto.sections?.length
                    ? { create: dto.sections.map((s, i) => ({ ...s, sortOrder: s.sortOrder ?? i })) }
                    : undefined,
                benefits: dto.benefits?.length
                    ? { create: dto.benefits.map((b, i) => ({ ...b, sortOrder: b.sortOrder ?? i })) }
                    : undefined,
            },
            include: this.include,
        });
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.$transaction(async (tx) => {
            if (dto.sections !== undefined) {
                await tx.promotionSection.deleteMany({ where: { promotionId: id } });
                if (dto.sections.length > 0) {
                    await tx.promotionSection.createMany({
                        data: dto.sections.map((s, i) => ({
                            promotionId: id,
                            title: s.title,
                            subtitle: s.subtitle,
                            sortOrder: s.sortOrder ?? i,
                            isActive: s.isActive ?? true,
                        })),
                    });
                }
            }
            if (dto.benefits !== undefined) {
                await tx.promotionBenefit.deleteMany({ where: { promotionId: id } });
                if (dto.benefits.length > 0) {
                    await tx.promotionBenefit.createMany({
                        data: dto.benefits.map((b, i) => ({
                            promotionId: id,
                            icon: b.icon,
                            title: b.title,
                            description: b.description,
                            sortOrder: b.sortOrder ?? i,
                        })),
                    });
                }
            }
            return tx.promotionLanding.update({
                where: { id },
                data: {
                    ...(dto.title !== undefined && { title: dto.title }),
                    ...(dto.slug !== undefined && { slug: dto.slug }),
                    ...(dto.subtitle !== undefined && { subtitle: dto.subtitle }),
                    ...(dto.description !== undefined && { description: dto.description }),
                    ...(dto.badgeText !== undefined && { badgeText: dto.badgeText }),
                    ...(dto.startDate !== undefined && { startDate: dto.startDate ? new Date(dto.startDate) : null }),
                    ...(dto.endDate !== undefined && { endDate: dto.endDate ? new Date(dto.endDate) : null }),
                    ...(dto.status !== undefined && { status: dto.status }),
                    ...(dto.heroBundleId !== undefined && { heroBundleId: dto.heroBundleId }),
                },
                include: this.include,
            });
        });
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.promotionLanding.delete({ where: { id } });
        return { message: 'Promosi berhasil dihapus' };
    }
    async getActiveBundlesForPromo(heroBundleId) {
        const now = new Date();
        const bundles = await this.prisma.bundle.findMany({
            where: {
                isActive: true,
                OR: [{ startDate: null }, { startDate: { lte: now } }],
                AND: [{ OR: [{ endDate: null }, { endDate: { gte: now } }] }],
            },
            orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
            include: {
                items: {
                    include: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                slug: true,
                            },
                        },
                    },
                },
            },
        });
        let heroBundle = heroBundleId
            ? bundles.find((b) => b.id === heroBundleId) ?? null
            : null;
        if (!heroBundle && bundles.length > 0) {
            heroBundle = [...bundles].sort((a, b) => Number(b.discountPrice ?? b.bundlePrice) - Number(a.discountPrice ?? a.bundlePrice))[0];
        }
        const collectionBundles = heroBundle
            ? bundles.filter((b) => b.id !== heroBundle.id)
            : bundles;
        return { heroBundle, collectionBundles, allBundles: bundles };
    }
};
exports.PromotionService = PromotionService;
exports.PromotionService = PromotionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PromotionService);
//# sourceMappingURL=promotion.service.js.map