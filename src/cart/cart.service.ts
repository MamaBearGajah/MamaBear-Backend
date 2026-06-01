import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddToCartDto, UpdateCartItemDto, MergeGuestCartDto } from './dto/create-cart.dto';

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
    orderBy: { createdAt: 'asc' as const },
  },
};

@Injectable()
export class CartService {
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

  private async getOrCreateCart(userId: string) {
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

  async getCart(userId: string) {
    const cart = await this.getOrCreateCart(userId);
    return this.withSubtotal(cart);
  }

  async addItem(userId: string, dto: AddToCartDto) {
    const product = await this.prisma.product.findUnique({ where: { id: dto.productId } });
    if (!product) throw new NotFoundException('Produk tidak ditemukan');

    // FIX: Pakai availableStock = stock - reservedStock
    const availableStock = product.stock - product.reservedStock;

    if (dto.variantId) {
      const variant = await this.prisma.productVariant.findUnique({ where: { id: dto.variantId } });
      if (!variant) throw new NotFoundException('Variant tidak ditemukan');
      const variantAvailable = variant.stock - variant.reservedStock;
      if (variantAvailable < dto.quantity) {
        throw new BadRequestException(`Stok tidak mencukupi. Tersedia: ${variantAvailable}`);
      }
    } else {
      if (availableStock < dto.quantity) {
        throw new BadRequestException(`Stok tidak mencukupi. Tersedia: ${availableStock}`);
      }
    }

    // Effective price: dari variant kalau ada, fallback ke product
    let price: any;
    if (dto.variantId) {
      const variant = await this.prisma.productVariant.findUnique({ where: { id: dto.variantId } });
      price = variant!.discountPrice ?? variant!.basePrice;
    } else {
      price = product.discountPrice ?? product.basePrice;
    }

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

    return this.withSubtotal(await this.getOrCreateCart(userId));
  }

  async updateItem(userId: string, itemId: string, dto: UpdateCartItemDto) {
    const cart = await this.getOrCreateCart(userId);
    const item = cart.items.find((i) => i.id === itemId);
    if (!item) throw new NotFoundException('Item tidak ditemukan di keranjang');

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

    await this.prisma.cartItem.update({ where: { id: itemId }, data: { quantity: dto.quantity } });
    return this.withSubtotal(await this.getOrCreateCart(userId));
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
      return this.withSubtotal(await this.getOrCreateCart(userId));
    }

    const userCart = await this.getOrCreateCart(userId);

    // FIX: Validasi pakai availableStock
    const stockErrors: { productId: string; requested: number; available: number }[] = [];

    for (const guestItem of guestCart.items) {
      const existingInCart = userCart.items.find(
        (i) => i.productId === guestItem.productId && i.variantId === guestItem.variantId,
      );
      const totalRequested = guestItem.quantity + (existingInCart?.quantity ?? 0);

      if (guestItem.variantId) {
        const variant = await this.prisma.productVariant.findUnique({ where: { id: guestItem.variantId } });
        if (!variant) continue;
        const available = variant.stock - variant.reservedStock;
        if (available < totalRequested) {
          stockErrors.push({ productId: guestItem.productId, requested: totalRequested, available });
        }
      } else {
        const product = await this.prisma.product.findUnique({ where: { id: guestItem.productId } });
        if (!product) continue;
        const available = product.stock - product.reservedStock;
        if (available < totalRequested) {
          stockErrors.push({ productId: guestItem.productId, requested: totalRequested, available });
        }
      }
    }

    if (stockErrors.length > 0) {
      throw new ConflictException({
        message: 'Stok tidak mencukupi untuk beberapa item',
        details: stockErrors,
      });
    }

    // Merge dengan recalculate effective price
    for (const guestItem of guestCart.items) {
      let effectivePrice: any;

      if (guestItem.variantId) {
        const variant = await this.prisma.productVariant.findUnique({ where: { id: guestItem.variantId } });
        if (!variant) continue;
        effectivePrice = variant.discountPrice ?? variant.basePrice;
      } else {
        const product = await this.prisma.product.findUnique({ where: { id: guestItem.productId } });
        if (!product) continue;
        effectivePrice = product.discountPrice ?? product.basePrice;
      }

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

    await this.prisma.guestCart.delete({ where: { id: guestCart.id } });

    return this.withSubtotal(await this.getOrCreateCart(userId));
  }
}