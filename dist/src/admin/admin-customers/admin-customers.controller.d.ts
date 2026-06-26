import { AdminCustomersService } from './admin-customers.service';
import { AdminBaseQueryDto } from '../dto/admin-query.dto';
export declare class AdminCustomersController {
    private readonly adminCustomersService;
    constructor(adminCustomersService: AdminCustomersService);
    getAll(query: AdminBaseQueryDto): Promise<{
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
    getById(id: string): Promise<{
        id: string;
        name: string;
        email: string;
        phone: string | null;
        isVerified: boolean;
        createdAt: Date;
        _count: {
            orders: number;
        };
        addresses: {
            id: string;
            phone: string;
            label: string | null;
            receiverName: string;
            address: string;
            cityId: string;
            provinceId: string;
            postalCode: string;
            isDefault: boolean;
        }[];
        orders: {
            id: string;
            createdAt: Date;
            status: import("../../../generated/prisma/enums").OrderStatus;
            orderNumber: string;
            paymentStatus: import("../../../generated/prisma/enums").PaymentStatus;
            total: import("@prisma/client-runtime-utils").Decimal;
            _count: {
                items: number;
            };
        }[];
    }>;
}
