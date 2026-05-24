import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { AddToCartDto, UpdateCartItemDto, MergeGuestCartDto } from './dto/create-cart.dto.js';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  private async getOrCreateCart(userId: string) {
    let cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: { select: { id: true, name: true, mainImage: true, slug: true, basePrice: true, discountPrice: true } },
          },
        },
      },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId },
        include: {
          items: {
            include: {
              product: { select: { id: true, name: true, mainImage: true, slug: true, basePrice: true, discountPrice: true } },
            },
          },
        },
      });
    }

    return cart;
  }

  async getCart(userId: string) {
    return this.getOrCreateCart(userId);
  }

  async addItem(userId: string, dto: AddToCartDto) {
    const product = await this.prisma.product.findUnique({ where: { id: dto.productId } });
    if (!product) throw new NotFoundException('Produk tidak ditemukan');
    if (product.stock < dto.quantity) throw new BadRequestException('Stok tidak mencukupi');

    const price = product.discountPrice ?? product.basePrice;
    const cart = await this.getOrCreateCart(userId);

    const existing = cart.items.find(
      (i) => i.productId === dto.productId && i.variantId === (dto.variantId ?? null),
    );

    if (existing) {
      await this.prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + dto.quantity },
      });
    } else {
      await this.prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: dto.productId,
          variantId: dto.variantId,
          quantity: dto.quantity,
          price,
        },
      });
    }

    return this.getOrCreateCart(userId);
  }

  async updateItem(userId: string, itemId: string, dto: UpdateCartItemDto) {
    const cart = await this.getOrCreateCart(userId);
    const item = cart.items.find((i) => i.id === itemId);
    if (!item) throw new NotFoundException('Item tidak ditemukan di keranjang');

    const product = await this.prisma.product.findUnique({ where: { id: item.productId } });
    if (product && product.stock < dto.quantity)
      throw new BadRequestException('Stok tidak mencukupi');

    await this.prisma.cartItem.update({ where: { id: itemId }, data: { quantity: dto.quantity } });
    return this.getOrCreateCart(userId);
  }

  async removeItem(userId: string, itemId: string) {
    const cart = await this.getOrCreateCart(userId);
    const item = cart.items.find((i) => i.id === itemId);
    if (!item) throw new NotFoundException('Item tidak ditemukan di keranjang');

    await this.prisma.cartItem.delete({ where: { id: itemId } });
    return { message: 'Item berhasil dihapus dari keranjang' };
  }

  async clearCart(userId: string) {
    const cart = await this.getOrCreateCart(userId);
    await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    return { message: 'Keranjang berhasil dikosongkan' };
  }

  async mergeGuest(userId: string, dto: MergeGuestCartDto) {
    const guestCart = await this.prisma.guestCart.findFirst({
      where: { sessionId: dto.sessionId },
      include: { items: true },
    });

    if (!guestCart || guestCart.items.length === 0) {
      return this.getOrCreateCart(userId);
    }

    const userCart = await this.getOrCreateCart(userId);

    // Validasi stok semua item sebelum merge
    const stockErrors: { productId: string; requested: number; available: number }[] = [];

    for (const guestItem of guestCart.items) {
      const product = await this.prisma.product.findUnique({ where: { id: guestItem.productId } });
      if (!product) continue;

      const existingInCart = userCart.items.find(
        (i) => i.productId === guestItem.productId && i.variantId === guestItem.variantId,
      );
      const totalRequested = guestItem.quantity + (existingInCart?.quantity ?? 0);

      if (product.stock < totalRequested) {
        stockErrors.push({
          productId: guestItem.productId,
          requested: totalRequested,
          available: product.stock,
        });
      }
    }

    if (stockErrors.length > 0) {
      throw new ConflictException({
        message: 'Stok tidak mencukupi untuk beberapa item',
        details: stockErrors,
      });
    }

    // Merge items dengan recalculate effective price dari produk saat ini
    for (const guestItem of guestCart.items) {
      const product = await this.prisma.product.findUnique({ where: { id: guestItem.productId } });
      if (!product) continue;

      const effectivePrice = product.discountPrice ?? product.basePrice;
      const existing = userCart.items.find(
        (i) => i.productId === guestItem.productId && i.variantId === guestItem.variantId,
      );

      if (existing) {
        await this.prisma.cartItem.update({
          where: { id: existing.id },
          data: { quantity: existing.quantity + guestItem.quantity, price: effectivePrice },
        });
      } else {
        await this.prisma.cartItem.create({
          data: {
            cartId: userCart.id,
            productId: guestItem.productId,
            variantId: guestItem.variantId,
            quantity: guestItem.quantity,
            price: effectivePrice,
          },
        });
      }
    }

    // Hapus guest cart (items ter-cascade delete otomatis)
    await this.prisma.guestCart.delete({ where: { id: guestCart.id } });

    return this.getOrCreateCart(userId);
  }
}
