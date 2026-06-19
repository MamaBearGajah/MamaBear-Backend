import { ConfigService } from '@nestjs/config';
export interface CreateInvoiceOptions {
    externalId: string;
    amount: number;
    payerEmail: string;
    description?: string;
    expiryDate?: Date;
    orderId: string;
}
export interface CreateRefundOptions {
    invoiceId: string;
    amount: number;
    reason?: 'FRAUDULENT' | 'DUPLICATE' | 'REQUESTED_BY_CUSTOMER' | 'CANCELLATION' | 'OTHERS';
}
export declare class XenditService {
    private readonly config;
    private readonly logger;
    private readonly invoiceClient;
    private readonly refundClient;
    constructor(config: ConfigService);
    createInvoice(opts: CreateInvoiceOptions): Promise<{
        id: string | undefined;
        externalId: string;
        invoiceUrl: string;
        status: import("xendit-node/invoice/models").InvoiceStatus;
        expiredAt: Date;
    }>;
    getInvoice(invoiceId: string): Promise<{
        id: string | undefined;
        externalId: string;
        status: import("xendit-node/invoice/models").InvoiceStatus;
        paidAt: Date | null;
        amount: number;
        expiredAt: Date;
    }>;
    createRefund(opts: CreateRefundOptions): Promise<{
        id: string | undefined;
        status: "PENDING";
        amount: number | undefined;
        referenceId: string | null | undefined;
        created: string | undefined;
    }>;
}
