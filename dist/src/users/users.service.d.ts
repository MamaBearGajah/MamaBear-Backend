import { PrismaService } from "../prisma/prisma.service";
import { ChangePasswordDto, CreateAddressDto, UpdateAddressDto, UpdateProfileDto } from './dto/users.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    getProfile(userId: string): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        email: string;
        phone: string | null;
        role: import("../../generated/prisma/enums").Role;
        isVerified: boolean;
        membership: {
            points: number;
            lastDailyLoginAt: Date | null;
        } | null;
    }>;
    updateProfile(userId: string, dto: UpdateProfileDto): Promise<{
        message: string;
        user: {
            id: string;
            name: string;
            email: string;
            phone: string | null;
            role: import("../../generated/prisma/enums").Role;
        };
    }>;
    changePassword(userId: string, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    getAddresses(userId: string): Promise<{
        id: string;
        label: string | null;
        createdAt: Date;
        updatedAt: Date;
        phone: string;
        receiverName: string;
        address: string;
        notes: string | null;
        cityId: string;
        provinceId: string;
        postalCode: string;
        isDefault: boolean;
        userId: string;
    }[]>;
    getAddressById(userId: string, addressId: string): Promise<{
        id: string;
        label: string | null;
        createdAt: Date;
        updatedAt: Date;
        phone: string;
        receiverName: string;
        address: string;
        notes: string | null;
        cityId: string;
        provinceId: string;
        postalCode: string;
        isDefault: boolean;
        userId: string;
    }>;
    createAddress(userId: string, dto: CreateAddressDto): Promise<{
        message: string;
        address: {
            id: string;
            label: string | null;
            createdAt: Date;
            updatedAt: Date;
            phone: string;
            receiverName: string;
            address: string;
            notes: string | null;
            cityId: string;
            provinceId: string;
            postalCode: string;
            isDefault: boolean;
            userId: string;
        };
    }>;
    updateAddress(userId: string, addressId: string, dto: UpdateAddressDto): Promise<{
        message: string;
        address: {
            id: string;
            label: string | null;
            createdAt: Date;
            updatedAt: Date;
            phone: string;
            receiverName: string;
            address: string;
            notes: string | null;
            cityId: string;
            provinceId: string;
            postalCode: string;
            isDefault: boolean;
            userId: string;
        };
    }>;
    setDefaultAddress(userId: string, addressId: string): Promise<{
        message: string;
    }>;
    deleteAddress(userId: string, addressId: string): Promise<{
        message: string;
    }>;
    getOrders(userId: string): Promise<({
        address: {
            receiverName: string;
            address: string;
            cityId: string;
        };
        items: ({
            product: {
                id: string;
                name: string;
                slug: string;
                images: {
                    imageUrl: string;
                    altText: string | null;
                }[];
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            notes: string | null;
            productId: string;
            bundleId: string | null;
            productName: string;
            variantName: string | null;
            quantity: number;
            price: import("@prisma/client-runtime-utils").Decimal;
            variantId: string | null;
            orderId: string;
        })[];
        payment: {
            status: import("../../generated/prisma/enums").PaymentStatus;
            provider: import("../../generated/prisma/enums").PaymentProvider;
            paymentUrl: string | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../generated/prisma/enums").OrderStatus;
        notes: string | null;
        userId: string;
        orderNumber: string;
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
        addressId: string;
        voucherId: string | null;
        bundleId: string | null;
    })[]>;
    getOrderById(userId: string, orderId: string): Promise<{
        address: {
            id: string;
            label: string | null;
            createdAt: Date;
            updatedAt: Date;
            phone: string;
            receiverName: string;
            address: string;
            notes: string | null;
            cityId: string;
            provinceId: string;
            postalCode: string;
            isDefault: boolean;
            userId: string;
        };
        items: ({
            product: {
                id: string;
                name: string;
                slug: string;
                images: {
                    imageUrl: string;
                    altText: string | null;
                }[];
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            notes: string | null;
            productId: string;
            bundleId: string | null;
            productName: string;
            variantName: string | null;
            quantity: number;
            price: import("@prisma/client-runtime-utils").Decimal;
            variantId: string | null;
            orderId: string;
        })[];
        payment: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("../../generated/prisma/enums").PaymentStatus;
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
            orderId: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../generated/prisma/enums").OrderStatus;
        notes: string | null;
        userId: string;
        orderNumber: string;
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
        addressId: string;
        voucherId: string | null;
        bundleId: string | null;
    }>;
}
