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
exports.BundleService = exports.UpdateBundleDto = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const create_bundle_dto_1 = require("./dto/create-bundle.dto");
const swagger_1 = require("@nestjs/swagger");
class UpdateBundleDto extends (0, swagger_1.PartialType)(create_bundle_dto_1.CreateBundleDto) {
}
exports.UpdateBundleDto = UpdateBundleDto;
let BundleService = class BundleService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    include = {
        items: {
            include: {
                product: {
                    include: { images: { where: { isFeatured: true }, take: 1 } },
                },
            },
        },
    };
    async findAll(onlyActive = false) {
        const now = new Date();
        return this.prisma.bundle.findMany({
            where: onlyActive
                ? {
                    isActive: true,
                    OR: [{ startDate: null }, { startDate: { lte: now } }],
                    AND: [{ OR: [{ endDate: null }, { endDate: { gte: now } }] }],
                }
                : {},
            orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
            include: this.include,
        });
    }
    async findOne(id) {
        const bundle = await this.prisma.bundle.findUnique({ where: { id }, include: this.include });
        if (!bundle)
            throw new common_1.NotFoundException('Bundle tidak ditemukan');
        return bundle;
    }
    async findBySlug(slug) {
        const bundle = await this.prisma.bundle.findUnique({ where: { slug }, include: this.include });
        if (!bundle)
            throw new common_1.NotFoundException('Bundle tidak ditemukan');
        return bundle;
    }
    async create(dto) {
        const existing = await this.prisma.bundle.findUnique({ where: { slug: dto.slug } });
        if (existing)
            throw new common_1.BadRequestException(`Slug "${dto.slug}" sudah digunakan`);
        return this.prisma.bundle.create({
            data: {
                name: dto.name,
                slug: dto.slug,
                description: dto.description,
                imageUrl: dto.imageUrl,
                publicId: dto.publicId,
                bundlePrice: dto.bundlePrice,
                discountPrice: dto.discountPrice,
                isActive: dto.isActive ?? true,
                stock: dto.stock ?? 0,
                sortOrder: dto.sortOrder ?? 0,
                startDate: dto.startDate ? new Date(dto.startDate) : undefined,
                endDate: dto.endDate ? new Date(dto.endDate) : undefined,
                items: {
                    create: dto.items.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                    })),
                },
            },
            include: this.include,
        });
    }
    async update(id, dto) {
        await this.findOne(id);
        if (dto.slug) {
            const slugConflict = await this.prisma.bundle.findFirst({
                where: { slug: dto.slug, NOT: { id } },
            });
            if (slugConflict) {
                throw new common_1.BadRequestException(`Slug "${dto.slug}" sudah digunakan`);
            }
        }
        return this.prisma.$transaction(async (tx) => {
            if (dto.items) {
                await tx.bundleItem.deleteMany({ where: { bundleId: id } });
                await tx.bundleItem.createMany({
                    data: dto.items.map((item) => ({ bundleId: id, productId: item.productId, quantity: item.quantity })),
                });
            }
            return tx.bundle.update({
                where: { id },
                data: {
                    ...(dto.name && { name: dto.name }),
                    ...(dto.slug && { slug: dto.slug }),
                    ...(dto.description !== undefined && { description: dto.description }),
                    ...(dto.imageUrl && { imageUrl: dto.imageUrl }),
                    ...(dto.publicId !== undefined && { publicId: dto.publicId }),
                    ...(dto.bundlePrice !== undefined && { bundlePrice: dto.bundlePrice }),
                    ...(dto.discountPrice !== undefined && { discountPrice: dto.discountPrice }),
                    ...(dto.isActive !== undefined && { isActive: dto.isActive }),
                    ...(dto.stock !== undefined && { stock: dto.stock }),
                    ...(dto.sortOrder !== undefined && { sortOrder: dto.sortOrder }),
                    ...(dto.startDate !== undefined && { startDate: dto.startDate ? new Date(dto.startDate) : null }),
                    ...(dto.endDate !== undefined && { endDate: dto.endDate ? new Date(dto.endDate) : null }),
                },
                include: this.include,
            });
        });
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.bundle.delete({ where: { id } });
        return { message: 'Bundle berhasil dihapus' };
    }
};
exports.BundleService = BundleService;
exports.BundleService = BundleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BundleService);
//# sourceMappingURL=bundle.service.js.map