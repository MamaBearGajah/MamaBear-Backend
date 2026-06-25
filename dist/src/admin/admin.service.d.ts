import { PrismaService } from '../prisma/prisma.service';
export declare class AdminService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getCustomers(page?: number, limit?: number, search?: string): Promise<{
        data: {
            id: string;
            name: string;
            email: string;
            phone: string | null;
            role: import("../../generated/prisma/enums").Role;
            isVerified: boolean;
            createdAt: Date;
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getCustomerById(id: string): Promise<{
        orders: ({
            items: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                notes: string | null;
                productId: string;
                bundleId: string | null;
                quantity: number;
                orderId: string;
                variantId: string | null;
                price: import("@prisma/client-runtime-utils").Decimal;
                productName: string;
                variantName: string | null;
            }[];
            payment: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                status: import("../../generated/prisma/enums").PaymentStatus;
                orderId: string;
                provider: import("../../generated/prisma/enums").PaymentProvider;
                amount: import("@prisma/client-runtime-utils").Decimal;
                externalId: string | null;
                paymentMethod: string | null;
                paymentUrl: string | null;
                expiredAt: Date | null;
                paidAt: Date | null;
                refundedAt: Date | null;
                refundReason: string | null;
                metadata: import("@prisma/client/runtime/client").JsonValue | null;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            notes: string | null;
            status: import("../../generated/prisma/enums").OrderStatus;
            bundleId: string | null;
            orderNumber: string;
            addressId: string;
            voucherId: string | null;
            paymentStatus: import("../../generated/prisma/enums").PaymentStatus;
            subtotal: import("@prisma/client-runtime-utils").Decimal;
            discountAmount: import("@prisma/client-runtime-utils").Decimal;
            shippingCost: import("@prisma/client-runtime-utils").Decimal;
            total: import("@prisma/client-runtime-utils").Decimal;
            courier: string;
            service: string;
            shippingProvider: string | null;
            trackingNumber: string | null;
            estimatedDelivery: Date | null;
            deliveredAt: Date | null;
            cancelledAt: Date | null;
            cancelReason: string | null;
            paymentDeadline: Date | null;
            cancelDeadline: Date | null;
        })[];
        membership: {
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            tier: import("../../generated/prisma/enums").MembershipTier;
            points: number;
            totalSpent: import("@prisma/client-runtime-utils").Decimal;
            pointsExpiredAt: Date | null;
            lastDailyLoginAt: Date | null;
            lastTierUpAt: Date | null;
        } | null;
    } & {
        id: string;
        name: string;
        email: string;
        phone: string | null;
        password: string;
        role: import("../../generated/prisma/enums").Role;
        isVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        bannedAt: Date | null;
        banReason: string | null;
        refreshToken: string | null;
        verifyToken: string | null;
        verifyTokenExp: Date | null;
        resetToken: string | null;
        resetTokenExp: Date | null;
    }>;
}
