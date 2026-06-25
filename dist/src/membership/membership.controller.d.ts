import { MembershipService } from './membership.service';
import { RedeemPointsDto } from './dto/redeem-points.dto';
import { AdminAdjustPointsDto } from './dto/admin-adjust-points.dto';
import { MembershipTier } from '../../generated/prisma/enums';
export declare class MembershipController {
    private readonly membershipService;
    constructor(membershipService: MembershipService);
    getMyMembership(userId: string): Promise<{
        membership: {
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            tier: MembershipTier;
            points: number;
            totalSpent: import("@prisma/client-runtime-utils").Decimal;
            pointsExpiredAt: Date | null;
            lastDailyLoginAt: Date | null;
            lastTierUpAt: Date | null;
        };
        recentTransactions: {
            id: string;
            createdAt: Date;
            description: string | null;
            userId: string;
            expiredAt: Date | null;
            type: import("../../generated/prisma/enums").PointTransactionType;
            points: number;
            referenceId: string | null;
        }[];
        activeVouchers: {
            id: string;
            isActive: boolean;
            startDate: Date | null;
            endDate: Date | null;
            createdAt: Date;
            updatedAt: Date;
            value: import("@prisma/client-runtime-utils").Decimal;
            code: string;
            type: import("../../generated/prisma/enums").VoucherType;
            source: import("../../generated/prisma/enums").VoucherSource;
            minPurchase: import("@prisma/client-runtime-utils").Decimal;
            maxDiscount: import("@prisma/client-runtime-utils").Decimal | null;
            usageLimit: number | null;
            usedCount: number;
            ownerId: string | null;
        }[];
        nextTierInfo: {
            nextTier: null;
            remainingSpend: number;
            message: string;
        } | {
            nextTier: MembershipTier;
            remainingSpend: number;
            message: string;
        };
    }>;
    getPointHistory(userId: string, page: number, limit: number): Promise<{
        data: {
            id: string;
            createdAt: Date;
            description: string | null;
            userId: string;
            expiredAt: Date | null;
            type: import("../../generated/prisma/enums").PointTransactionType;
            points: number;
            referenceId: string | null;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    redeemPoints(userId: string, dto: RedeemPointsDto): Promise<{
        voucher: {
            id: string;
            isActive: boolean;
            startDate: Date | null;
            endDate: Date | null;
            createdAt: Date;
            updatedAt: Date;
            value: import("@prisma/client-runtime-utils").Decimal;
            code: string;
            type: import("../../generated/prisma/enums").VoucherType;
            source: import("../../generated/prisma/enums").VoucherSource;
            minPurchase: import("@prisma/client-runtime-utils").Decimal;
            maxDiscount: import("@prisma/client-runtime-utils").Decimal | null;
            usageLimit: number | null;
            usedCount: number;
            ownerId: string | null;
        };
        pointsUsed: number;
        discountValue: number;
        message: string;
    }>;
    dailyLoginCheckIn(userId: string): Promise<{
        alreadyClaimed: boolean;
        message: string;
        nextCheckIn: Date;
        currentPoints: number;
        pointsEarned?: undefined;
        basePoints?: undefined;
        bonusPoints?: undefined;
        streakCount?: undefined;
        isStreakBonus?: undefined;
    } | {
        alreadyClaimed: boolean;
        message: string;
        pointsEarned: number;
        basePoints: number;
        bonusPoints: number;
        streakCount: number;
        isStreakBonus: boolean;
        currentPoints: number;
        nextCheckIn?: undefined;
    }>;
    findAll(page: number, limit: number, tier?: MembershipTier, search?: string): Promise<{
        data: ({
            user: {
                id: string;
                createdAt: Date;
                name: string;
                email: string;
            };
        } & {
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            tier: MembershipTier;
            points: number;
            totalSpent: import("@prisma/client-runtime-utils").Decimal;
            pointsExpiredAt: Date | null;
            lastDailyLoginAt: Date | null;
            lastTierUpAt: Date | null;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getMembershipStats(): Promise<{
        totalMembers: number;
        totalPointsCirculating: number;
        totalPointsRedeemed: number;
        tierStats: {
            [k: string]: {
                count: number;
                totalPoints: number;
            };
        };
    }>;
    getMembershipByUser(userId: string): Promise<{
        membership: {
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            tier: MembershipTier;
            points: number;
            totalSpent: import("@prisma/client-runtime-utils").Decimal;
            pointsExpiredAt: Date | null;
            lastDailyLoginAt: Date | null;
            lastTierUpAt: Date | null;
        };
        recentTransactions: {
            id: string;
            createdAt: Date;
            description: string | null;
            userId: string;
            expiredAt: Date | null;
            type: import("../../generated/prisma/enums").PointTransactionType;
            points: number;
            referenceId: string | null;
        }[];
        activeVouchers: {
            id: string;
            isActive: boolean;
            startDate: Date | null;
            endDate: Date | null;
            createdAt: Date;
            updatedAt: Date;
            value: import("@prisma/client-runtime-utils").Decimal;
            code: string;
            type: import("../../generated/prisma/enums").VoucherType;
            source: import("../../generated/prisma/enums").VoucherSource;
            minPurchase: import("@prisma/client-runtime-utils").Decimal;
            maxDiscount: import("@prisma/client-runtime-utils").Decimal | null;
            usageLimit: number | null;
            usedCount: number;
            ownerId: string | null;
        }[];
        nextTierInfo: {
            nextTier: null;
            remainingSpend: number;
            message: string;
        } | {
            nextTier: MembershipTier;
            remainingSpend: number;
            message: string;
        };
    }>;
    getPointHistoryByUser(userId: string, page: number, limit: number): Promise<{
        data: {
            id: string;
            createdAt: Date;
            description: string | null;
            userId: string;
            expiredAt: Date | null;
            type: import("../../generated/prisma/enums").PointTransactionType;
            points: number;
            referenceId: string | null;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    adminAdjustPoints(dto: AdminAdjustPointsDto): Promise<{
        userId: string;
        previousPoints: number;
        adjustment: number;
        newPoints: number;
        message: string;
    }>;
}
