import { PrismaService } from '../prisma/prisma.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { Voucher, VoucherType } from '../../generated/prisma/client';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
export interface ApplyVoucherResult {
    voucher: Voucher;
    discountAmount: number;
    finalShippingCost: number;
    usedCount: number;
}
export declare class VoucherService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateVoucherDto): Promise<{
        id: string;
        isActive: boolean;
        startDate: Date | null;
        endDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        value: import("@prisma/client-runtime-utils").Decimal;
        code: string;
        type: VoucherType;
        source: import("../../generated/prisma/enums").VoucherSource;
        minPurchase: import("@prisma/client-runtime-utils").Decimal;
        maxDiscount: import("@prisma/client-runtime-utils").Decimal | null;
        usageLimit: number | null;
        usedCount: number;
        ownerId: string | null;
    }>;
    update(id: string, dto: UpdateVoucherDto): Promise<{
        id: string;
        isActive: boolean;
        startDate: Date | null;
        endDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        value: import("@prisma/client-runtime-utils").Decimal;
        code: string;
        type: VoucherType;
        source: import("../../generated/prisma/enums").VoucherSource;
        minPurchase: import("@prisma/client-runtime-utils").Decimal;
        maxDiscount: import("@prisma/client-runtime-utils").Decimal | null;
        usageLimit: number | null;
        usedCount: number;
        ownerId: string | null;
    }>;
    findAll(page?: number, limit?: number): Promise<{
        data: ({
            owner: {
                id: string;
                name: string;
                email: string;
            } | null;
        } & {
            id: string;
            isActive: boolean;
            startDate: Date | null;
            endDate: Date | null;
            createdAt: Date;
            updatedAt: Date;
            value: import("@prisma/client-runtime-utils").Decimal;
            code: string;
            type: VoucherType;
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
    deactivate(id: string): Promise<{
        id: string;
        isActive: boolean;
        startDate: Date | null;
        endDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        value: import("@prisma/client-runtime-utils").Decimal;
        code: string;
        type: VoucherType;
        source: import("../../generated/prisma/enums").VoucherSource;
        minPurchase: import("@prisma/client-runtime-utils").Decimal;
        maxDiscount: import("@prisma/client-runtime-utils").Decimal | null;
        usageLimit: number | null;
        usedCount: number;
        ownerId: string | null;
    }>;
    getMyVouchers(userId: string): Promise<{
        id: string;
        isActive: boolean;
        startDate: Date | null;
        endDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        value: import("@prisma/client-runtime-utils").Decimal;
        code: string;
        type: VoucherType;
        source: import("../../generated/prisma/enums").VoucherSource;
        minPurchase: import("@prisma/client-runtime-utils").Decimal;
        maxDiscount: import("@prisma/client-runtime-utils").Decimal | null;
        usageLimit: number | null;
        usedCount: number;
        ownerId: string | null;
    }[]>;
    validate(code: string, subtotal: number, shippingCost: number, userId?: string): Promise<{
        valid: boolean;
        voucher: {
            id: string;
            isActive: boolean;
            startDate: Date | null;
            endDate: Date | null;
            createdAt: Date;
            updatedAt: Date;
            value: import("@prisma/client-runtime-utils").Decimal;
            code: string;
            type: VoucherType;
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
    apply(code: string, subtotal: number, userId?: string): Promise<{
        valid: boolean;
        voucher: {
            id: string;
            isActive: boolean;
            startDate: Date | null;
            endDate: Date | null;
            createdAt: Date;
            updatedAt: Date;
            value: import("@prisma/client-runtime-utils").Decimal;
            code: string;
            type: VoucherType;
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
    validateById(voucherId: string, subtotal: number, shippingCost: number, userId?: string): Promise<{
        valid: boolean;
        voucher: {
            id: string;
            isActive: boolean;
            startDate: Date | null;
            endDate: Date | null;
            createdAt: Date;
            updatedAt: Date;
            value: import("@prisma/client-runtime-utils").Decimal;
            code: string;
            type: VoucherType;
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
    applyVoucher(tx: any, voucherId: string, subtotal: number, userId?: string): Promise<{
        discountAmount: number;
        finalShippingCost: number;
        usedCount: number;
    }>;
    private calculateDiscount;
    private buildApplyVoucherResult;
    private findValidVoucherByCode;
    private findValidVoucherById;
    private assertVoucherCanBeApplied;
    private findById;
}
