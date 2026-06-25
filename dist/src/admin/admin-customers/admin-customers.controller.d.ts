import { AdminCustomersService } from './admin-customers.service';
import { AdminBaseQueryDto } from '../dto/admin-query.dto';
export declare class AdminCustomersController {
    private readonly adminCustomersService;
    constructor(adminCustomersService: AdminCustomersService);
    getAll(query: AdminBaseQueryDto): Promise<{
        data: {
            id: string;
            createdAt: Date;
            name: string;
            email: string;
            orders: {
                total: import("@prisma/client-runtime-utils").Decimal;
            }[];
            _count: {
                orders: number;
            };
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
        createdAt: Date;
        name: string;
        email: string;
        phone: string | null;
        isVerified: boolean;
        addresses: {
            id: string;
            label: string | null;
            phone: string;
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
            _count: {
                items: number;
            };
            orderNumber: string;
            paymentStatus: import("../../../generated/prisma/enums").PaymentStatus;
            total: import("@prisma/client-runtime-utils").Decimal;
        }[];
        _count: {
            orders: number;
        };
    }>;
}
