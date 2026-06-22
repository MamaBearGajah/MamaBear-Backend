import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { XenditService } from './providers/xendit.service';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
export declare class PaymentsService {
    private readonly prisma;
    private readonly xenditService;
    private readonly mailService;
    private readonly logger;
    constructor(prisma: PrismaService, xenditService: XenditService, mailService: MailService);
    create(dto: CreatePaymentDto): Promise<{
        paymentUrl: string;
        externalId: string;
        expiredAt: Date;
    }>;
    handleXenditWebhook(callbackToken: string, body: any): Promise<{
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
