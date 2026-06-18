import { VoucherType, VoucherSource } from '../../../generated/prisma/enums';
export declare class CreateVoucherDto {
    code: string;
    type: VoucherType;
    source?: VoucherSource;
    value: number;
    minPurchase?: number;
    maxDiscount?: number;
    usageLimit?: number;
    isActive?: boolean;
    startDate?: string;
    endDate?: string;
    ownerId?: string;
}
