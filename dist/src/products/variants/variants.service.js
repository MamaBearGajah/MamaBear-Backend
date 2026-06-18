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
exports.VariantsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const cache_service_1 = require("../../cache/cache.service");
let VariantsService = class VariantsService {
    prisma;
    cache;
    constructor(prisma, cache) {
        this.prisma = prisma;
        this.cache = cache;
    }
    async syncProductStock(productId) {
        const result = await this.prisma.productVariant.aggregate({
            where: { productId, isActive: true },
            _sum: { stock: true, reservedStock: true },
        });
        const hasVariants = await this.prisma.productVariant.count({ where: { productId } });
        if (hasVariants > 0) {
            await this.prisma.product.update({
                where: { id: productId },
                data: {
                    stock: result._sum.stock ?? 0,
                    reservedStock: result._sum.reservedStock ?? 0,
                },
            });
        }
        await this.cache.del(cache_service_1.CacheService.keys.product(productId));
        await this.cache.delByPattern('products:list:*');
        await this.cache.delByPattern('products:best-sellers:*');
    }
    withComputedFields(variant) {
        return {
            ...variant,
            effectivePrice: variant.discountPrice ?? variant.basePrice,
            availableStock: variant.stock - variant.reservedStock,
        };
    }
    async findVariants(productId) {
        const variants = await this.prisma.productVariant.findMany({
            where: { productId },
            orderBy: { createdAt: 'asc' },
            include: {
                product: {
                    select: {
                        id: true,
                        name: true,
                        stock: true,
                        category: { select: { id: true, name: true, slug: true } },
                    },
                },
            },
        });
        return variants.map(this.withComputedFields.bind(this));
    }
    async findOneVariant(productId, variantId) {
        const variant = await this.prisma.productVariant.findFirst({
            where: { id: variantId, productId },
            include: {
                product: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                        stock: true,
                        category: { select: { id: true, name: true, slug: true } },
                    },
                },
            },
        });
        if (!variant)
            throw new common_1.NotFoundException('Varian tidak ditemukan di produk ini');
        return this.withComputedFields(variant);
    }
    async addVariant(productId, dto) {
        const product = await this.prisma.product.findUnique({ where: { id: productId } });
        if (!product)
            throw new common_1.NotFoundException('Produk tidak ditemukan');
        const variant = await this.prisma.productVariant.create({
            data: { ...dto, productId },
        });
        await this.syncProductStock(productId);
        return this.withComputedFields(variant);
    }
    async updateVariant(productId, variantId, dto) {
        const existing = await this.prisma.productVariant.findFirst({
            where: { id: variantId, productId },
        });
        if (!existing)
            throw new common_1.NotFoundException('Varian tidak ditemukan di produk ini');
        const variant = await this.prisma.productVariant.update({
            where: { id: variantId },
            data: dto,
        });
        await this.syncProductStock(productId);
        return this.withComputedFields(variant);
    }
    async removeVariant(productId, variantId) {
        const existing = await this.prisma.productVariant.findFirst({
            where: { id: variantId, productId },
        });
        if (!existing)
            throw new common_1.NotFoundException('Varian tidak ditemukan di produk ini');
        const variant = await this.prisma.productVariant.delete({ where: { id: variantId } });
        await this.syncProductStock(productId);
        return variant;
    }
    async setVariantImage(productId, variantId, imageUrl) {
        const variant = await this.prisma.productVariant.findFirst({
            where: { id: variantId, productId },
        });
        if (!variant)
            throw new common_1.NotFoundException('Varian tidak ditemukan di produk ini');
        return this.prisma.productVariant.update({
            where: { id: variantId },
            data: { imageUrl },
        });
    }
    async deleteVariantImage(productId, variantId) {
        const variant = await this.prisma.productVariant.findFirst({
            where: { id: variantId, productId },
        });
        if (!variant)
            throw new common_1.NotFoundException('Varian tidak ditemukan di produk ini');
        return this.prisma.productVariant.update({
            where: { id: variantId },
            data: { imageUrl: null },
        });
    }
    async batchUpdateVariantImages(productId, dto) {
        const product = await this.prisma.product.findUnique({ where: { id: productId } });
        if (!product)
            throw new common_1.NotFoundException('Produk tidak ditemukan');
        return this.prisma.$transaction(dto.variants.map((item) => this.prisma.productVariant.updateMany({
            where: { id: item.variantId, productId },
            data: { imageUrl: item.imageUrl },
        })));
    }
};
exports.VariantsService = VariantsService;
exports.VariantsService = VariantsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cache_service_1.CacheService])
], VariantsService);
//# sourceMappingURL=variants.service.js.map