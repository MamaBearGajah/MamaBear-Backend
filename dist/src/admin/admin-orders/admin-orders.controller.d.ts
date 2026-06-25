import type { Response } from 'express';
import { OrderStatus } from '../../../generated/prisma/enums';
import { OrdersService } from '../../orders/orders.service';
import { UpdateOrderDto } from '../../orders/dto/update-order.dto';
import { UpdateTrackingDto } from '../dto/update-tracking.dto';
export declare class AdminOrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    findAll(page: number, limit: number, status?: OrderStatus, q?: string): Promise<{
        data: ({
            user: {
                id: string;
                name: string;
                email: string;
                phone: string | null;
            };
            _count: {
                items: number;
            };
            voucher: {
                value: import("@prisma/client-runtime-utils").Decimal;
                code: string;
                type: import("../../../generated/prisma/enums").VoucherType;
            } | null;
            payment: {
                id: string;
                status: import("../../../generated/prisma/enums").PaymentStatus;
                paymentMethod: string | null;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: OrderStatus;
            notes: string | null;
            userId: string;
            orderNumber: string;
            paymentStatus: import("../../../generated/prisma/enums").PaymentStatus;
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
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    exportCsv(res: Response): Promise<Response<any, Record<string, any>>>;
    getInvoice(id: string): Promise<{
        invoiceNumber: string;
        orderNumber: string;
        orderDate: Date;
        customer: {
            name: string;
            email: string;
            phone: string | null;
        };
        shippingAddress: {
            receiverName: string;
            phone: string;
            address: string;
            cityId: string;
            provinceId: string;
            postalCode: string;
        } | null;
        items: {
            productName: any;
            variantName: any;
            quantity: any;
            price: number;
            subtotal: number;
        }[];
        subtotal: number;
        shippingCost: number;
        discountAmount: number;
        total: number;
        courier: string;
        service: string;
        trackingNumber: string | null;
        paymentStatus: import("../../../generated/prisma/enums").PaymentStatus;
        status: OrderStatus;
        voucher: {
            code: string;
            type: import("../../../generated/prisma/enums").VoucherType;
            value: number;
        } | null;
    }>;
    updateStatus(id: string, dto: UpdateOrderDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: OrderStatus;
        notes: string | null;
        userId: string;
        orderNumber: string;
        paymentStatus: import("../../../generated/prisma/enums").PaymentStatus;
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
    updateTracking(id: string, dto: UpdateTrackingDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: OrderStatus;
        notes: string | null;
        userId: string;
        orderNumber: string;
        paymentStatus: import("../../../generated/prisma/enums").PaymentStatus;
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
