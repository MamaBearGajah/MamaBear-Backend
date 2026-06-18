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
exports.GuestCartService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const GUEST_CART_INCLUDE = {
    items: {
        include: {
            product: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    basePrice: true,
                    discountPrice: true,
                    stock: true,
                    reservedStock: true,
                    images: {
                        where: { isFeatured: true },
                        select: { imageUrl: true, altText: true },
                        take: 1,
                    },
                },
            },
            variant: {
                select: {
                    id: true,
                    name: true,
                    value: true,
                    basePrice: true,
                    discountPrice: true,
                    priceAdjustment: true,
                    stock: true,
                    reservedStock: true,
                    imageUrl: true,
                },
            },
        },
        orderBy: { createdAt: 'asc' },
    },
};
let GuestCartService = class GuestCartService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    computeSubtotal(items) {
        return items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
    }
    withSubtotal(cart) {
        return {
            ...cart,
            subtotal: this.computeSubtotal(cart.items),
        };
    }
    async getOrCreate(sessionId) {
        let cart = await this.prisma.guestCart.findFirst({
            where: { sessionId },
            include: GUEST_CART_INCLUDE,
        });
        if (!cart) {
            cart = await this.prisma.guestCart.create({
                data: { sessionId },
                include: GUEST_CART_INCLUDE,
            });
        }
        return cart;
    }
    async createCart(sessionId) {
        return this.withSubtotal(await this.getOrCreate(sessionId));
    }
    async getCart(sessionId) {
        return this.withSubtotal(await this.getOrCreate(sessionId));
    }
    async addItem(dto) {
        const product = await this.prisma.product.findUnique({ where: { id: dto.productId } });
        if (!product)
            throw new common_1.NotFoundException('Produk tidak ditemukan');
        if (dto.variantId) {
            const variant = await this.prisma.productVariant.findUnique({ where: { id: dto.variantId } });
            if (!variant)
                throw new common_1.NotFoundException('Variant tidak ditemukan');
            const available = variant.stock - variant.reservedStock;
            if (available < dto.quantity) {
                throw new common_1.BadRequestException(`Stok tidak mencukupi. Tersedia: ${available}`);
            }
        }
        else {
            const available = product.stock - product.reservedStock;
            if (available < dto.quantity) {
                throw new common_1.BadRequestException(`Stok tidak mencukupi. Tersedia: ${available}`);
            }
        }
        let price;
        if (dto.variantId) {
            const variant = await this.prisma.productVariant.findUnique({ where: { id: dto.variantId } });
            price = variant.discountPrice ?? variant.basePrice;
        }
        else {
            price = product.discountPrice ?? product.basePrice;
        }
        const cart = await this.getOrCreate(dto.sessionId);
        const existing = cart.items.find((i) => i.productId === dto.productId && i.variantId === (dto.variantId ?? null));
        if (existing) {
            await this.prisma.guestCartItem.update({
                where: { id: existing.id },
                data: {
                    quantity: existing.quantity + dto.quantity,
                    ...(dto.notes !== undefined && { notes: dto.notes }),
                },
            });
        }
        else {
            await this.prisma.guestCartItem.create({
                data: {
                    guestCartId: cart.id,
                    productId: dto.productId,
                    variantId: dto.variantId,
                    quantity: dto.quantity,
                    price,
                    notes: dto.notes,
                },
            });
        }
        return this.withSubtotal(await this.getOrCreate(dto.sessionId));
    }
    async updateItem(sessionId, itemId, dto) {
        const cart = await this.getOrCreate(sessionId);
        const item = cart.items.find((i) => i.id === itemId);
        if (!item)
            throw new common_1.NotFoundException('Item tidak ditemukan');
        if (item.variantId) {
            const variant = await this.prisma.productVariant.findUnique({ where: { id: item.variantId } });
            if (variant) {
                const available = variant.stock - variant.reservedStock;
                if (available < dto.quantity) {
                    throw new common_1.BadRequestException(`Stok tidak mencukupi. Tersedia: ${available}`);
                }
            }
        }
        else {
            const product = await this.prisma.product.findUnique({ where: { id: item.productId } });
            if (product) {
                const available = product.stock - product.reservedStock;
                if (available < dto.quantity) {
                    throw new common_1.BadRequestException(`Stok tidak mencukupi. Tersedia: ${available}`);
                }
            }
        }
        await this.prisma.guestCartItem.update({
            where: { id: itemId },
            data: {
                quantity: dto.quantity,
                ...(dto.notes !== undefined && { notes: dto.notes }),
            },
        });
        return this.withSubtotal(await this.getOrCreate(sessionId));
    }
    async removeItem(sessionId, itemId) {
        const cart = await this.getOrCreate(sessionId);
        if (!cart.items.find((i) => i.id === itemId)) {
            throw new common_1.NotFoundException('Item tidak ditemukan');
        }
        await this.prisma.guestCartItem.delete({ where: { id: itemId } });
        return { message: 'Item berhasil dihapus' };
    }
    async clearCart(sessionId) {
        const cart = await this.getOrCreate(sessionId);
        await this.prisma.guestCartItem.deleteMany({ where: { guestCartId: cart.id } });
        return { message: 'Keranjang berhasil dikosongkan' };
    }
    async deleteCart(sessionId) {
        const cart = await this.prisma.guestCart.findFirst({ where: { sessionId } });
        if (!cart)
            throw new common_1.NotFoundException('Guest cart tidak ditemukan');
        await this.prisma.guestCart.delete({ where: { id: cart.id } });
        return { message: 'Guest cart berhasil dihapus' };
    }
};
exports.GuestCartService = GuestCartService;
exports.GuestCartService = GuestCartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GuestCartService);
//# sourceMappingURL=guest-cart.service.js.map