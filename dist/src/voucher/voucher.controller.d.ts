import { VoucherService } from './voucher.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto, ValidateVoucherDto } from './dto/validate-voucher.dto';
export declare class VoucherController {
    private readonly voucherService;
    constructor(voucherService: VoucherService);
    getMyVouchers(userId: string): Promise<{
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
    }[]>;
    validateVoucher(userId: string, dto: ValidateVoucherDto): Promise<{
        valid: boolean;
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
        discountAmount: number;
        finalShippingCost: number;
    }>;
    findAll(page: number, limit: number): Promise<{
        data: ({
            owner: {
                id: string;
                name: string;
                email: string;
            } | null;
        } & {
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
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    create(dto: CreateVoucherDto): Promise<{
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
    }>;
    update(id: string, dto: UpdateVoucherDto): Promise<{
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
    }>;
    deactivate(id: string): Promise<{
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
    }>;
}
