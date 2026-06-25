import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';
import { HelpfulVoteDto } from '../dto/helpful-vote.dto';
import { ReviewQueryDto } from '../dto/review-query.dto';
import { Role } from "../../../generated/prisma/enums";
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    getReviews(productId: string, query: ReviewQueryDto, userId?: string): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getRatingSummary(productId: string): Promise<{
        avgRating: number;
        ratingCount: number;
        breakdown: Record<number, number>;
    }>;
    createReview(productId: string, dto: CreateReviewDto, userId: string): Promise<{
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
        rating: number | null;
        review: string | null;
        isVerifiedPurchase: boolean;
        helpfulCount: number;
        orderId: string;
    }>;
    updateReview(reviewId: string, dto: UpdateReviewDto, userId: string): Promise<{
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
        rating: number | null;
        review: string | null;
        isVerifiedPurchase: boolean;
        helpfulCount: number;
        orderId: string;
    }>;
    deleteReview(reviewId: string, userId: string, role: Role): Promise<{
        message: string;
    }>;
    toggleHelpful(reviewId: string, dto: HelpfulVoteDto, userId: string): Promise<{
        message: string;
        helpfulCount: number;
        isHelpful?: undefined;
    } | {
        message: string;
        isHelpful: boolean;
        helpfulCount: number;
    }>;
}
