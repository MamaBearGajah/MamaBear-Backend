import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GuestAddToCartDto, GuestUpdateCartItemDto } from './dto/guest-cart.dto';

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
    orderBy: { createdAt: 'asc' as const },
  },
};

@Injectable()
export class GuestCartService {
  constructor(private prisma: PrismaService) {}

  private computeSubtotal(items: { price: any; quantity: number }[]): number {
    return items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  }

  private withSubtotal(cart: any) {
    return {
      ...cart,
      subtotal: this.computeSubtotal(cart.items),
    };
  }

  private async getOrCreate(sessionId: string) {
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

  async createCart(sessionId: string) {
    return this.withSubtotal(await this.getOrCreate(sessionId));
  }

  async getCart(sessionId: string) {
    return this.withSubtotal(await this.getOrCreate(sessionId));
  }

  async addItem(dto: GuestAddToCartDto) {
    const product = await this.prisma.product.findUnique({ where: { id: dto.productId } });
    if (!product) throw new NotFoundException('Produk tidak ditemukan');

    // FIX: Pakai availableStock = stock - reservedStock
    if (dto.variantId) {
      const variant = await this.prisma.productVariant.findUnique({ where: { id: dto.variantId } });
      if (!variant) throw new NotFoundException('Variant tidak ditemukan');
      const available = variant.stock - variant.reservedStock;
      if (available < dto.quantity) {
        throw new BadRequestException(`Stok tidak mencukupi. Tersedia: ${available}`);
      }
    } else {
      const available = product.stock - product.reservedStock;
      if (available < dto.quantity) {
        throw new BadRequestException(`Stok tidak mencukupi. Tersedia: ${available}`);
      }
    }

    // Effective price dari variant atau product
    let price: any;
    if (dto.variantId) {
      const variant = await this.prisma.productVariant.findUnique({ where: { id: dto.variantId } });
      price = variant!.discountPrice ?? variant!.basePrice;
    } else {
      price = product.discountPrice ?? product.basePrice;
    }

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

    return this.withSubtotal(await this.getOrCreate(dto.sessionId));
  }

  async updateItem(sessionId: string, itemId: string, dto: GuestUpdateCartItemDto) {
    const cart = await this.getOrCreate(sessionId);
    const item = cart.items.find((i) => i.id === itemId);
    if (!item) throw new NotFoundException('Item tidak ditemukan');

    // FIX: Pakai availableStock
    if (item.variantId) {
      const variant = await this.prisma.productVariant.findUnique({ where: { id: item.variantId } });
      if (variant) {
        const available = variant.stock - variant.reservedStock;
        if (available < dto.quantity) {
          throw new BadRequestException(`Stok tidak mencukupi. Tersedia: ${available}`);
        }
      }
    } else {
      const product = await this.prisma.product.findUnique({ where: { id: item.productId } });
      if (product) {
        const available = product.stock - product.reservedStock;
        if (available < dto.quantity) {
          throw new BadRequestException(`Stok tidak mencukupi. Tersedia: ${available}`);
        }
      }
    }

    await this.prisma.guestCartItem.update({
      where: { id: itemId },
      data: { quantity: dto.quantity },
    });

    return this.withSubtotal(await this.getOrCreate(sessionId));
  }

  async removeItem(sessionId: string, itemId: string) {
    const cart = await this.getOrCreate(sessionId);
    if (!cart.items.find((i) => i.id === itemId)) {
      throw new NotFoundException('Item tidak ditemukan');
    }

    await this.prisma.guestCartItem.delete({ where: { id: itemId } });
    return { message: 'Item berhasil dihapus' };
  }

  async clearCart(sessionId: string) {
    const cart = await this.getOrCreate(sessionId);
    await this.prisma.guestCartItem.deleteMany({ where: { guestCartId: cart.id } });
    return { message: 'Keranjang berhasil dikosongkan' };
  }

  // FIX: Hapus seluruh cart (bukan hanya items)
  async deleteCart(sessionId: string) {
    const cart = await this.prisma.guestCart.findFirst({ where: { sessionId } });
    if (!cart) throw new NotFoundException('Guest cart tidak ditemukan');
    await this.prisma.guestCart.delete({ where: { id: cart.id } });
    return { message: 'Guest cart berhasil dihapus' };
  }
}
