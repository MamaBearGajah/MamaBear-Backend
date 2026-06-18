import { PrismaService } from '../../prisma/prisma.service';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';
import { Role } from "../../../generated/prisma/enums";
export declare class ReviewsService {
    private prisma;
    constructor(prisma: PrismaService);
    getReviews(productId: string, page?: number, limit?: number, sortBy?: 'rating' | 'createdAt', sortOrder?: 'asc' | 'desc', userId?: string): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    createReview(productId: string, userId: string, dto: CreateReviewDto): Promise<{
        user: {
            id: string;
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        productId: string;
        orderId: string;
        rating: number | null;
        review: string | null;
        isVerifiedPurchase: boolean;
        helpfulCount: number;
    }>;
    updateReview(reviewId: string, userId: string, dto: UpdateReviewDto): Promise<{
        user: {
            id: string;
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        productId: string;
        orderId: string;
        rating: number | null;
        review: string | null;
        isVerifiedPurchase: boolean;
        helpfulCount: number;
    }>;
    deleteReview(reviewId: string, userId: string, role: Role): Promise<{
        message: string;
    }>;
    toggleHelpful(reviewId: string, userId: string, isHelpful: boolean): Promise<{
        message: string;
        isHelpful?: undefined;
    } | {
        message: string;
        isHelpful: boolean;
    }>;
    getRatingSummary(productId: string): Promise<{
        avgRating: number;
        ratingCount: number;
        breakdown: Record<number, number>;
    }>;
}
