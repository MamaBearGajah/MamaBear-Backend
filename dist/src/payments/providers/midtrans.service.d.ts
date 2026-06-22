import { ConfigService } from '@nestjs/config';
export interface CreateSnapTokenOptions {
    orderId: string;
    amount: number;
    customerName: string;
    customerEmail: string;
    description?: string;
}
export interface CreateRefundOptions {
    orderId: string;
    amount: number;
    reason?: string;
}
export declare class MidtransService {
    private readonly config;
    private readonly logger;
    private readonly snap;
    private readonly core;
    constructor(config: ConfigService);
    createSnapToken(opts: CreateSnapTokenOptions): Promise<{
        token: any;
        redirectUrl: any;
    }>;
    getTransactionStatus(orderId: string): Promise<{
        orderId: any;
        transactionStatus: any;
        fraudStatus: any;
        grossAmount: any;
        paymentType: any;
        transactionTime: any;
    }>;
    createRefund(opts: CreateRefundOptions): Promise<{
        orderId: any;
        refundAmount: any;
        status: any;
    }>;
}
