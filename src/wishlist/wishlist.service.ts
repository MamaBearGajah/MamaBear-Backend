import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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

@Injectable()
export class WishlistService {
  constructor(private readonly prisma: PrismaService) {}

  /** GET /wishlist — ambil semua produk di wishlist user */
  async getWishlist(userId: string) {
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

  /** POST /wishlist — tambah produk ke wishlist */
  async addToWishlist(userId: string, productId: string) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) throw new NotFoundException('Produk tidak ditemukan');

    const existing = await this.prisma.wishlist.findUnique({
      where: { userId_productId: { userId, productId } },
    });
    if (existing) {
      throw new ConflictException('Produk sudah ada di wishlist');
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

  /** DELETE /wishlist/:productId — hapus dari wishlist */
  async removeFromWishlist(userId: string, productId: string) {
    const existing = await this.prisma.wishlist.findUnique({
      where: { userId_productId: { userId, productId } },
    });
    if (!existing) {
      throw new NotFoundException('Item tidak ada di wishlist');
    }

    await this.prisma.wishlist.delete({
      where: { userId_productId: { userId, productId } },
    });

    return { message: 'Berhasil dihapus dari wishlist', productId };
  }

  /** Cek apakah produk ada di wishlist user (untuk product detail page) */
  async checkWishlist(
    userId: string,
    productId: string,
  ): Promise<{ inWishlist: boolean }> {
    const item = await this.prisma.wishlist.findUnique({
      where: { userId_productId: { userId, productId } },
    });
    return { inWishlist: Boolean(item) };
  }
}