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
exports.WishlistService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const PRODUCT_SELECT = {
    id: true,
    name: true,
    slug: true,
    basePrice: true,
    discountPrice: true,
    status: true,
    images: {
        where: { isFeatured: true },
        select: { imageUrl: true, altText: true },
        take: 1,
    },
};
let WishlistService = class WishlistService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getWishlist(userId) {
        const items = await this.prisma.wishlist.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            include: { product: { select: PRODUCT_SELECT } },
        });
        return {
            count: items.length,
            items: items.map((w) => ({
                id: w.id,
                productId: w.productId,
                addedAt: w.createdAt,
                product: w.product,
            })),
        };
    }
    async addToWishlist(userId, productId) {
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
        });
        if (!product)
            throw new common_1.NotFoundException('Produk tidak ditemukan');
        const existing = await this.prisma.wishlist.findUnique({
            where: { userId_productId: { userId, productId } },
        });
        if (existing) {
            throw new common_1.ConflictException('Produk sudah ada di wishlist');
        }
        const item = await this.prisma.wishlist.create({
            data: { userId, productId },
            include: { product: { select: PRODUCT_SELECT } },
        });
        return {
            id: item.id,
            productId: item.productId,
            addedAt: item.createdAt,
            product: item.product,
        };
    }
    async removeFromWishlist(userId, productId) {
        const existing = await this.prisma.wishlist.findUnique({
            where: { userId_productId: { userId, productId } },
        });
        if (!existing) {
            throw new common_1.NotFoundException('Item tidak ada di wishlist');
        }
        await this.prisma.wishlist.delete({
            where: { userId_productId: { userId, productId } },
        });
        return { message: 'Berhasil dihapus dari wishlist', productId };
    }
    async checkWishlist(userId, productId) {
        const item = await this.prisma.wishlist.findUnique({
            where: { userId_productId: { userId, productId } },
        });
        return { inWishlist: Boolean(item) };
    }
};
exports.WishlistService = WishlistService;
exports.WishlistService = WishlistService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WishlistService);
//# sourceMappingURL=wishlist.service.js.map