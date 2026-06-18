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
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const enums_1 = require("../../../generated/prisma/enums");
let ReviewsService = class ReviewsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getReviews(productId, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc', userId) {
        const product = await this.prisma.product.findUnique({ where: { id: productId } });
        if (!product)
            throw new common_1.NotFoundException('Produk tidak ditemukan');
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
            const { helpfuls, ...rest } = r;
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
    async createReview(productId, userId, dto) {
        if (dto.rating == null && !dto.review) {
            throw new common_1.BadRequestException('Rating atau review harus diisi (minimal salah satu)');
        }
        const product = await this.prisma.product.findUnique({ where: { id: productId } });
        if (!product)
            throw new common_1.NotFoundException('Produk tidak ditemukan');
        const order = await this.prisma.order.findFirst({
            where: {
                id: dto.orderId,
                userId,
                status: 'delivered',
                items: { some: { productId } },
            },
        });
        if (!order)
            throw new common_1.ForbiddenException('Pembelian terverifikasi diperlukan untuk memberi ulasan');
        const existing = await this.prisma.productReview.findUnique({
            where: { userId_productId_orderId: { userId, productId, orderId: dto.orderId } },
        });
        if (existing)
            throw new common_1.ConflictException('Anda sudah mengulas produk ini untuk pesanan ini');
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
    async updateReview(reviewId, userId, dto) {
        if (dto.rating == null && !dto.review) {
            throw new common_1.BadRequestException('Rating atau review harus diisi (minimal salah satu)');
        }
        const review = await this.prisma.productReview.findUnique({ where: { id: reviewId } });
        if (!review)
            throw new common_1.NotFoundException('Review tidak ditemukan');
        if (review.userId !== userId)
            throw new common_1.ForbiddenException('Review ini bukan milik Anda');
        return this.prisma.productReview.update({
            where: { id: reviewId },
            data: {
                ...(dto.rating != null && { rating: dto.rating }),
                ...(dto.review !== undefined && { review: dto.review }),
            },
            include: { user: { select: { id: true, name: true } } },
        });
    }
    async deleteReview(reviewId, userId, role) {
        const review = await this.prisma.productReview.findUnique({ where: { id: reviewId } });
        if (!review)
            throw new common_1.NotFoundException('Review tidak ditemukan');
        const isAdmin = role === enums_1.Role.admin || role === enums_1.Role.super_admin;
        if (!isAdmin && review.userId !== userId) {
            throw new common_1.ForbiddenException('Review ini bukan milik Anda');
        }
        await this.prisma.productReview.delete({ where: { id: reviewId } });
        return { message: 'Review berhasil dihapus' };
    }
    async toggleHelpful(reviewId, userId, isHelpful) {
        const review = await this.prisma.productReview.findUnique({ where: { id: reviewId } });
        if (!review)
            throw new common_1.NotFoundException('Review tidak ditemukan');
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
    async getRatingSummary(productId) {
        const product = await this.prisma.product.findUnique({ where: { id: productId } });
        if (!product)
            throw new common_1.NotFoundException('Produk tidak ditemukan');
        const reviews = await this.prisma.productReview.findMany({
            where: { productId, rating: { not: null } },
            select: { rating: true },
        });
        const rated = reviews.filter((r) => r.rating !== null);
        const ratingCount = rated.length;
        const totalRating = rated.reduce((sum, r) => sum + r.rating, 0);
        const avgRating = ratingCount > 0 ? totalRating / ratingCount : 0;
        const breakdown = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        for (const r of rated) {
            breakdown[r.rating] = (breakdown[r.rating] ?? 0) + 1;
        }
        return { avgRating: Math.round(avgRating * 10) / 10, ratingCount, breakdown };
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map