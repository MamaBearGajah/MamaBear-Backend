import { OrderStatus } from '../../generated/prisma/enums';
import { AdminCustomersService } from './admin-customers/admin-customers.service';
import { OrdersService } from '../orders/orders.service';
import { UpdateOrderDto } from '../orders/dto/update-order.dto';
export declare class AdminController {
    private readonly adminCustomersService;
    private readonly ordersService;
    constructor(adminCustomersService: AdminCustomersService, ordersService: OrdersService);
    getCustomers(page: number, limit: number, search?: string): Promise<{
        data: {
            id: string;
            name: string;
            email: string;
            createdAt: Date;
            _count: {
                orders: number;
            };
            orders: {
                total: import("@prisma/client-runtime-utils").Decimal;
            }[];
        }[];
        meta: {
            totalItems: number;
            itemsPerPage: number;
            totalPages: number;
            currentPage: number;
        };
    }>;
    getOrders(page: number, limit: number, status?: OrderStatus, q?: string): Promise<{
        data: ({
            _count: {
                items: number;
            };
            user: {
                id: string;
                name: string;
                email: string;
                phone: string | null;
            };
            voucher: {
                value: import("@prisma/client-runtime-utils").Decimal;
                code: string;
                type: import("../../generated/prisma/enums").VoucherType;
            } | null;
            payment: {
                id: string;
                status: import("../../generated/prisma/enums").PaymentStatus;
                paymentMethod: string | null;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            notes: string | null;
            status: OrderStatus;
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
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    updateOrderStatus(id: string, dto: UpdateOrderDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        notes: string | null;
        status: OrderStatus;
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
