import { UsersService } from './users.service';
import { ChangePasswordDto, CreateAddressDto, UpdateAddressDto, UpdateProfileDto } from './dto/users.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(userId: string): Promise<{
        id: string;
        name: string;
        email: string;
        phone: string | null;
        role: import("../../generated/prisma/enums").Role;
        isVerified: boolean;
        createdAt: Date;
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
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        label: string | null;
        receiverName: string;
        address: string;
        notes: string | null;
        cityId: string;
        provinceId: string;
        postalCode: string;
        isDefault: boolean;
    }[]>;
    getAddressById(userId: string, addressId: string): Promise<{
        id: string;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        label: string | null;
        receiverName: string;
        address: string;
        notes: string | null;
        cityId: string;
        provinceId: string;
        postalCode: string;
        isDefault: boolean;
    }>;
    createAddress(userId: string, dto: CreateAddressDto): Promise<{
        message: string;
        address: {
            id: string;
            phone: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            label: string | null;
            receiverName: string;
            address: string;
            notes: string | null;
            cityId: string;
            provinceId: string;
            postalCode: string;
            isDefault: boolean;
        };
    }>;
    setDefaultAddress(userId: string, addressId: string): Promise<{
        message: string;
    }>;
    updateAddress(userId: string, addressId: string, dto: UpdateAddressDto): Promise<{
        message: string;
        address: {
            id: string;
            phone: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            label: string | null;
            receiverName: string;
            address: string;
            notes: string | null;
            cityId: string;
            provinceId: string;
            postalCode: string;
            isDefault: boolean;
        };
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
            quantity: number;
            orderId: string;
            variantId: string | null;
            price: import("@prisma/client-runtime-utils").Decimal;
            productName: string;
            variantName: string | null;
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
    })[]>;
    getOrderById(userId: string, orderId: string): Promise<{
        address: {
            id: string;
            phone: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            label: string | null;
            receiverName: string;
            address: string;
            notes: string | null;
            cityId: string;
            provinceId: string;
            postalCode: string;
            isDefault: boolean;
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
            quantity: number;
            orderId: string;
            variantId: string | null;
            price: import("@prisma/client-runtime-utils").Decimal;
            productName: string;
            variantName: string | null;
        })[];
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
    }>;
}
