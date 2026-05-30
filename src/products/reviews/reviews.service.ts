import { PrismaService } from 'src/prisma/prisma.service';
import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';
import { ReviewQueryDto } from '../dto/review-query.dto';

@Injectable()
export class ReviewsService {
    constructor(private readonly prisma: PrismaService) {}

    async findByProduct(productId: string, query: ReviewQueryDto) {
      const { page = 1, limit = 10, rating } = query
      const skip = (page - 1) * limit

      const where = {
        productId,
        ...(rating && { rating }),
      }

      const [data, total] = await this.prisma.$transaction([
        this.prisma.productReview.findMany({
          where, 
          skip,
          take: limit,
          orderBy: { [query.sortBy ?? 'createdAt']: query.sortOrder ?? 'desc' },
          include: {
            user: { select: { id: true, name: true } },
          },
        }),
        this.prisma.productReview.count({ where }),
      ])

      return {
        data,
        meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
      }
    }

    async create(productId: string, userId: string, dto: CreateReviewDto) {
      const product = await this.prisma.product.findUnique({ where: { id: productId } })
      if (!product) throw new NotFoundException('Produk tidak ditemukan!')

      const existing = await this.prisma.productReview.findFirst({
        where: { productId, userId },
      })
      if (!existing) throw new ConflictException('Anda sudah memberikan review untuk produk ini.')

      const order = await this.prisma.order.findFirst({
        where: { id: dto.orderId, userId },
        include: { items: true },
      })
      if (!order) throw new NotFoundException('Order tidak ditemukan!')

      const hasProduct = order.items.some(item => item.productId === productId)
      const isVerifiedPurchase = !!order && hasProduct

      return this.prisma.productReview.create({
        data: {
          productId,
          userId,
          orderId: dto.orderId,
          rating: dto.rating,
          review: dto.review,
          isVerifiedPurchase,
        },
      })
    }

    async update(id: string, userId: string, dto: UpdateReviewDto) {
      const review = await this.prisma.productReview.findUnique({ where: { id } })
      if (!review) throw new NotFoundException('Review tidak ditemukan!')
      if (review.userId !== userId) throw new ForbiddenException('Review ini bukan merupakan review Anda')

      return this.prisma.productReview.update({
        where: { id },
        data: {
          ...(dto.rating && { rating: dto.rating }),
          ...(dto.review !== undefined && { review: dto.review }),
        }
      })
    }

    async remove(id: string, userId: string) {
      const review = await this.prisma.productReview.findUnique({ where: { id } })
      if (!review) throw new NotFoundException('Review tidak ditemukan!')
      if (review.userId !== userId) throw new ForbiddenException('Review ini bukan merupakan review Anda')

        return this.prisma.productReview.delete({ where: { id } })
    }

    async helpfulVote(reviewId: string, userId: string, isHelpful: boolean) {
      const review = await this.prisma.productReview.findUnique({ where: { id: reviewId } })
      if (!review) throw new NotFoundException('Review tidak ditemukan!')
      
      const existing = await this.prisma.productReviewHelpful.findFirst({
        where: { reviewId, userId },
      })

      if (existing) {
        return this.prisma.productReviewHelpful.update({
          where: { id: existing.id },
          data: { isHelpful },
        })
      }

      return this.prisma.productReviewHelpful.create({
        data: { reviewId, userId, isHelpful },
      })
    }
}