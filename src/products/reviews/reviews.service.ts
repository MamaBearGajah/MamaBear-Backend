import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';
import { Role } from 'generated/prisma/enums';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async getReviews(
    productId: string,
    page = 1,
    limit = 10,
    sortBy: 'rating' | 'createdAt' = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'desc',
    userId?: string,
  ) {
    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new NotFoundException('Produk tidak ditemukan');

    const [reviews, total] = await Promise.all([
      this.prisma.productReview.findMany({
        where: { productId },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          user: { select: { id: true, name: true } },
          helpfuls: userId
            ? { where: { userId }, select: { isHelpful: true } }
            : false,
        },
      }),
      this.prisma.productReview.count({ where: { productId } }),
    ]);

    const data = reviews.map((r) => {
      const { helpfuls, ...rest } = r as any;
      const userVote = userId && helpfuls && helpfuls.length > 0
        ? helpfuls[0].isHelpful
        : null;
      return { ...rest, userVote };
    });

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async createReview(productId: string, userId: string, dto: CreateReviewDto) {
    if (dto.rating == null && !dto.review) {
      throw new BadRequestException('Rating atau review harus diisi (minimal salah satu)');
    }

    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new NotFoundException('Produk tidak ditemukan');

    const order = await this.prisma.order.findFirst({
      where: {
        id: dto.orderId,
        userId,
        status: 'delivered',
        items: { some: { productId } },
      },
    });
    if (!order) throw new ForbiddenException('Pembelian terverifikasi diperlukan untuk memberi ulasan');

    const existing = await this.prisma.productReview.findUnique({
      where: { userId_productId_orderId: { userId, productId, orderId: dto.orderId } },
    });
    if (existing) throw new ConflictException('Anda sudah mengulas produk ini untuk pesanan ini');

    return this.prisma.productReview.create({
      data: {
        productId,
        userId,
        orderId: dto.orderId,
        rating: dto.rating,
        review: dto.review,
        isVerifiedPurchase: true,
      },
      include: { user: { select: { id: true, name: true } } },
    });
  }

  async updateReview(reviewId: string, userId: string, dto: UpdateReviewDto) {
    if (dto.rating == null && !dto.review) {
      throw new BadRequestException('Rating atau review harus diisi (minimal salah satu)');
    }

    const review = await this.prisma.productReview.findUnique({ where: { id: reviewId } });
    if (!review) throw new NotFoundException('Review tidak ditemukan');
    if (review.userId !== userId) throw new ForbiddenException('Review ini bukan milik Anda');

    return this.prisma.productReview.update({
      where: { id: reviewId },
      data: {
        ...(dto.rating != null && { rating: dto.rating }),
        ...(dto.review !== undefined && { review: dto.review }),
      },
      include: { user: { select: { id: true, name: true } } },
    });
  }

  async deleteReview(reviewId: string, userId: string, role: Role) {
    const review = await this.prisma.productReview.findUnique({ where: { id: reviewId } });
    if (!review) throw new NotFoundException('Review tidak ditemukan');

    const isAdmin = role === Role.admin || role === Role.super_admin;
    if (!isAdmin && review.userId !== userId) {
      throw new ForbiddenException('Review ini bukan milik Anda');
    }

    await this.prisma.productReview.delete({ where: { id: reviewId } });
    return { message: 'Review berhasil dihapus' };
  }

  async toggleHelpful(reviewId: string, userId: string, isHelpful: boolean) {
    const review = await this.prisma.productReview.findUnique({ where: { id: reviewId } });
    if (!review) throw new NotFoundException('Review tidak ditemukan');

    const existing = await this.prisma.productReviewHelpful.findUnique({
      where: { reviewId_userId: { reviewId, userId } },
    });

    if (existing && existing.isHelpful === isHelpful) {
      await this.prisma.productReviewHelpful.delete({
        where: { reviewId_userId: { reviewId, userId } },
      });
      const count = await this.prisma.productReviewHelpful.count({
        where: { reviewId, isHelpful: true },
      });
      await this.prisma.productReview.update({
        where: { id: reviewId },
        data: { helpfulCount: count },
      });
      return { message: 'Helpful vote dihapus' };
    }

    await this.prisma.productReviewHelpful.upsert({
      where: { reviewId_userId: { reviewId, userId } },
      create: { reviewId, userId, isHelpful },
      update: { isHelpful },
    });

    const count = await this.prisma.productReviewHelpful.count({
      where: { reviewId, isHelpful: true },
    });

    await this.prisma.productReview.update({
      where: { id: reviewId },
      data: { helpfulCount: count },
    });

    return { message: 'Helpful vote berhasil direcord', isHelpful };
  }

  async getRatingSummary(productId: string) {
    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new NotFoundException('Produk tidak ditemukan');

    const reviews = await this.prisma.productReview.findMany({
      where: { productId, rating: { not: null } },
      select: { rating: true },
    });

    const rated = reviews.filter((r) => r.rating !== null) as { rating: number }[];
    const ratingCount = rated.length;
    const totalRating = rated.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = ratingCount > 0 ? totalRating / ratingCount : 0;

    const breakdown: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    for (const r of rated) {
      breakdown[r.rating] = (breakdown[r.rating] ?? 0) + 1;
    }

    return { avgRating: Math.round(avgRating * 10) / 10, ratingCount, breakdown };
  }
}