import { VoucherService } from './voucher.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { ValidateVoucherDto } from './dto/validate-voucher.dto';
import { ApplyVoucherDto } from './dto/apply-voucher.dto';
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
    validate(dto: ValidateVoucherDto, userId: string): Promise<{
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
        usedCount: number;
    }>;
    applyVoucher(dto: ApplyVoucherDto, userId: string): Promise<{
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
        usedCount: number;
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
