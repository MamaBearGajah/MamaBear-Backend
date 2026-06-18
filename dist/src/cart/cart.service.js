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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const PRODUCT_SELECT = {
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
};
const VARIANT_SELECT = {
    id: true,
    name: true,
    value: true,
    basePrice: true,
    discountPrice: true,
    priceAdjustment: true,
    stock: true,
    reservedStock: true,
    imageUrl: true,
};
const CART_INCLUDE = {
    items: {
        include: {
            product: { select: PRODUCT_SELECT },
            variant: { select: VARIANT_SELECT },
        },
        orderBy: { createdAt: 'asc' },
    },
};
let CartService = class CartService {
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
    async getOrCreateCart(userId) {
        let cart = await this.prisma.cart.findUnique({
            where: { userId },
            include: CART_INCLUDE,
        });
        if (!cart) {
            cart = await this.prisma.cart.create({
                data: { userId },
                include: CART_INCLUDE,
            });
        }
        return cart;
    }
    async getCart(userId) {
        const cart = await this.getOrCreateCart(userId);
        return this.withSubtotal(cart);
    }
    async addItem(userId, dto) {
        const product = await this.prisma.product.findUnique({ where: { id: dto.productId } });
        if (!product)
            throw new common_1.NotFoundException('Produk tidak ditemukan');
        const availableStock = product.stock - product.reservedStock;
        if (dto.variantId) {
            const variant = await this.prisma.productVariant.findUnique({ where: { id: dto.variantId } });
            if (!variant)
                throw new common_1.NotFoundException('Variant tidak ditemukan');
            const variantAvailable = variant.stock - variant.reservedStock;
            if (variantAvailable < dto.quantity) {
                throw new common_1.BadRequestException(`Stok tidak mencukupi. Tersedia: ${variantAvailable}`);
            }
        }
        else {
            if (availableStock < dto.quantity) {
                throw new common_1.BadRequestException(`Stok tidak mencukupi. Tersedia: ${availableStock}`);
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
        const cart = await this.getOrCreateCart(userId);
        const existing = cart.items.find((i) => i.productId === dto.productId && i.variantId === (dto.variantId ?? null));
        if (existing) {
            await this.prisma.cartItem.update({
                where: { id: existing.id },
                data: {
                    quantity: existing.quantity + dto.quantity,
                    ...(dto.notes !== undefined && { notes: dto.notes }),
                },
            });
        }
        else {
            await this.prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    productId: dto.productId,
                    variantId: dto.variantId,
                    quantity: dto.quantity,
                    price,
                    notes: dto.notes,
                },
            });
        }
        return this.withSubtotal(await this.getOrCreateCart(userId));
    }
    async updateItem(userId, itemId, dto) {
        const cart = await this.getOrCreateCart(userId);
        const item = cart.items.find((i) => i.id === itemId);
        if (!item)
            throw new common_1.NotFoundException('Item tidak ditemukan di keranjang');
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
        await this.prisma.cartItem.update({
            where: { id: itemId },
            data: {
                quantity: dto.quantity,
                ...(dto.notes !== undefined && { notes: dto.notes }),
            },
        });
        return this.withSubtotal(await this.getOrCreateCart(userId));
    }
    async removeItem(userId, itemId) {
        const cart = await this.getOrCreateCart(userId);
        const item = cart.items.find((i) => i.id === itemId);
        if (!item)
            throw new common_1.NotFoundException('Item tidak ditemukan di keranjang');
        await this.prisma.cartItem.delete({ where: { id: itemId } });
        return { message: 'Item berhasil dihapus dari keranjang' };
    }
    async clearCart(userId) {
        const cart = await this.getOrCreateCart(userId);
        await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
        return { message: 'Keranjang berhasil dikosongkan' };
    }
    async mergeGuest(userId, dto) {
        const guestCart = await this.prisma.guestCart.findFirst({
            where: { sessionId: dto.sessionId },
            include: { items: true },
        });
        if (!guestCart || guestCart.items.length === 0) {
            return this.withSubtotal(await this.getOrCreateCart(userId));
        }
        const userCart = await this.getOrCreateCart(userId);
        const stockErrors = [];
        for (const guestItem of guestCart.items) {
            const existingInCart = userCart.items.find((i) => i.productId === guestItem.productId && i.variantId === guestItem.variantId);
            const totalRequested = guestItem.quantity + (existingInCart?.quantity ?? 0);
            if (guestItem.variantId) {
                const variant = await this.prisma.productVariant.findUnique({ where: { id: guestItem.variantId } });
                if (!variant)
                    continue;
                const available = variant.stock - variant.reservedStock;
                if (available < totalRequested) {
                    stockErrors.push({ productId: guestItem.productId, requested: totalRequested, available });
                }
            }
            else {
                const product = await this.prisma.product.findUnique({ where: { id: guestItem.productId } });
                if (!product)
                    continue;
                const available = product.stock - product.reservedStock;
                if (available < totalRequested) {
                    stockErrors.push({ productId: guestItem.productId, requested: totalRequested, available });
                }
            }
        }
        if (stockErrors.length > 0) {
            throw new common_1.ConflictException({
                message: 'Stok tidak mencukupi untuk beberapa item',
                details: stockErrors,
            });
        }
        for (const guestItem of guestCart.items) {
            let effectivePrice;
            if (guestItem.variantId) {
                const variant = await this.prisma.productVariant.findUnique({ where: { id: guestItem.variantId } });
                if (!variant)
                    continue;
                effectivePrice = variant.discountPrice ?? variant.basePrice;
            }
            else {
                const product = await this.prisma.product.findUnique({ where: { id: guestItem.productId } });
                if (!product)
                    continue;
                effectivePrice = product.discountPrice ?? product.basePrice;
            }
            const existing = userCart.items.find((i) => i.productId === guestItem.productId && i.variantId === guestItem.variantId);
            if (existing) {
                await this.prisma.cartItem.update({
                    where: { id: existing.id },
                    data: {
                        quantity: existing.quantity + guestItem.quantity,
                        price: effectivePrice,
                        ...(guestItem.notes && !existing.notes && { notes: guestItem.notes }),
                    },
                });
            }
            else {
                await this.prisma.cartItem.create({
                    data: {
                        cartId: userCart.id,
                        productId: guestItem.productId,
                        variantId: guestItem.variantId,
                        quantity: guestItem.quantity,
                        price: effectivePrice,
                        notes: guestItem.notes,
                    },
                });
            }
        }
        await this.prisma.guestCart.delete({ where: { id: guestCart.id } });
        return this.withSubtotal(await this.getOrCreateCart(userId));
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartService);
//# sourceMappingURL=cart.service.js.map