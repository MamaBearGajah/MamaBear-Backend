import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { GuestAddToCartDto, GuestUpdateCartItemDto } from './dto/guest-cart.dto.js';

@Injectable()
export class GuestCartService {
  constructor(private prisma: PrismaService) {}

  private async getOrCreate(sessionId: string) {
    let cart = await this.prisma.guestCart.findFirst({
      where: { sessionId },
      include: {
        items: true,
      },
    });

    if (!cart) {
      cart = await this.prisma.guestCart.create({
        data: { sessionId },
        include: { items: true },
      });
    }

    return cart;
  }

  async createCart(sessionId: string) {
    return this.getOrCreate(sessionId);
  }

  async getCart(sessionId: string) {
    return this.getOrCreate(sessionId);
  }

  async addItem(dto: GuestAddToCartDto) {
    const product = await this.prisma.product.findUnique({ where: { id: dto.productId } });
    if (!product) throw new NotFoundException('Produk tidak ditemukan');
    if (product.stock < dto.quantity) throw new BadRequestException('Stok tidak mencukupi');

    const price = product.discountPrice ?? product.basePrice;
    const cart = await this.getOrCreate(dto.sessionId);

    const existing = cart.items.find(
      (i) => i.productId === dto.productId && i.variantId === (dto.variantId ?? null),
    );

    if (existing) {
      await this.prisma.guestCartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + dto.quantity },
      });
    } else {
      await this.prisma.guestCartItem.create({
        data: {
          guestCartId: cart.id,
          productId: dto.productId,
          variantId: dto.variantId,
          quantity: dto.quantity,
          price,
        },
      });
    }

    return this.getOrCreate(dto.sessionId);
  }

  async updateItem(sessionId: string, itemId: string, dto: GuestUpdateCartItemDto) {
    const cart = await this.getOrCreate(sessionId);
    const item = cart.items.find((i) => i.id === itemId);
    if (!item) throw new NotFoundException('Item tidak ditemukan');

    await this.prisma.guestCartItem.update({
      where: { id: itemId },
      data: { quantity: dto.quantity },
    });

    return this.getOrCreate(sessionId);
  }

  async removeItem(sessionId: string, itemId: string) {
    const cart = await this.getOrCreate(sessionId);
    if (!cart.items.find((i) => i.id === itemId))
      throw new NotFoundException('Item tidak ditemukan');

    await this.prisma.guestCartItem.delete({ where: { id: itemId } });
    return { message: 'Item berhasil dihapus' };
  }

  async clearCart(sessionId: string) {
    const cart = await this.getOrCreate(sessionId);
    await this.prisma.guestCartItem.deleteMany({ where: { guestCartId: cart.id } });
    return { message: 'Keranjang berhasil dikosongkan' };
  }
}
