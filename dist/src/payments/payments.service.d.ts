import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { XenditService } from './providers/xendit.service';
import { MidtransService } from './providers/midtrans.service';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
export declare class PaymentsService {
    private readonly prisma;
    private readonly xenditService;
    private readonly midtransService;
    private readonly mailService;
    private readonly logger;
    constructor(prisma: PrismaService, xenditService: XenditService, midtransService: MidtransService, mailService: MailService);
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
    handleXenditWebhook(callbackToken: string, body: any): Promise<{
        message: string;
    }>;
    handleMidtransWebhook(body: any): Promise<{
        message: string;
    }>;
    requestRefund(orderId: string, reason?: string): Promise<{
        message: string;
        orderId: string;
        amount: number;
    }>;
    private sendOrderConfirmationEmail;
    private sendRefundEmail;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, dto: UpdatePaymentDto): string;
    remove(id: number): string;
}
