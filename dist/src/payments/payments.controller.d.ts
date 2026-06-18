import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    create(dto: CreatePaymentDto): Promise<{
        paymentUrl: string;
        externalId: string;
        expiredAt: Date;
        snapToken?: undefined;
    } | {
        paymentUrl: any;
        snapToken: any;
        expiredAt: Date | null;
        externalId?: undefined;
    }>;
    requestRefund(orderId: string, reason?: string): Promise<{
        message: string;
        orderId: string;
        amount: number;
    }>;
    xenditWebhook(callbackToken: string, body: any): Promise<{
        message: string;
    }>;
    midtransWebhook(body: any): Promise<{
        message: string;
    }>;
}
