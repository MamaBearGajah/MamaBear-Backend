import { ConfigService } from '@nestjs/config';
export declare class MailService {
    private config;
    private readonly logger;
    private transporter;
    constructor(config: ConfigService);
    private get fromAddress();
    private baseTemplate;
    private button;
    private send;
    sendVerificationEmail(email: string, token: string): Promise<void>;
    sendResetPasswordEmail(email: string, name: string, token: string): Promise<void>;
    sendOrderConfirmation(opts: {
        email: string;
        name: string;
        orderNumber: string;
        items: Array<{
            productName: string;
            variantName?: string | null;
            quantity: number;
            price: number;
        }>;
        subtotal: number;
        shippingCost: number;
        total: number;
        courier: string;
        service: string;
        paymentUrl?: string | null;
    }): Promise<void>;
    sendShippingNotification(opts: {
        email: string;
        name: string;
        orderNumber: string;
        trackingNumber: string;
        courier: string;
        service: string;
    }): Promise<void>;
    sendRefundNotification(opts: {
        email: string;
        name: string;
        orderNumber: string;
        amount: number;
    }): Promise<void>;
}
