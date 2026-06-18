import { MembershipService } from './membership.service';
import { RedeemPointsDto } from './dto/redeem-points.dto';
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
            userId: string;
            description: string | null;
            type: import("../../generated/prisma/enums").PointTransactionType;
            expiredAt: Date | null;
            points: number;
            referenceId: string | null;
        }[];
        activeVouchers: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            startDate: Date | null;
            endDate: Date | null;
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
            userId: string;
            description: string | null;
            type: import("../../generated/prisma/enums").PointTransactionType;
            expiredAt: Date | null;
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
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            startDate: Date | null;
            endDate: Date | null;
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
    findAll(page: number, limit: number, tier?: MembershipTier): Promise<{
        data: ({
            user: {
                id: string;
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
}
