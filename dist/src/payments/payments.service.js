"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PaymentsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const xendit_service_1 = require("./providers/xendit.service");
const prisma_service_1 = require("../prisma/prisma.service");
const mail_service_1 = require("../mail/mail.service");
let PaymentsService = PaymentsService_1 = class PaymentsService {
    prisma;
    xenditService;
    mailService;
    logger = new common_1.Logger(PaymentsService_1.name);
    constructor(prisma, xenditService, mailService) {
        this.prisma = prisma;
        this.xenditService = xenditService;
        this.mailService = mailService;
    }
    async create(dto) {
        const { amount, orderId } = dto;
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            include: { user: { select: { email: true, name: true } } },
        });
        if (!order)
            throw new common_1.NotFoundException('Order tidak ditemukan');
        const expiryDate = order.paymentDeadline ?? new Date(Date.now() + 2 * 60 * 60 * 1000);
        const invoice = await this.xenditService.createInvoice({
            externalId: `ORB-${orderId}`,
            amount,
            payerEmail: order.user.email,
            description: `Pembayaran Order ${order.orderNumber}`,
            expiryDate,
        });
        await this.prisma.payment.create({
            data: {
                orderId,
                provider: 'xendit',
                amount,
                externalId: invoice.externalId,
                paymentUrl: invoice.invoiceUrl,
                expiredAt: invoice.expiredAt ? new Date(invoice.expiredAt) : expiryDate,
                metadata: { xenditInvoiceId: invoice.id },
            },
        });
        return {
            paymentUrl: invoice.invoiceUrl,
            externalId: invoice.externalId,
            expiredAt: expiryDate,
        };
    }
    async handleXenditWebhook(callbackToken, body) {
        if (callbackToken !== process.env.XENDIT_WEBHOOK_TOKEN) {
            return { message: 'Invalid callback token' };
        }
        const { external_id, status } = body;
        const payment = await this.prisma.payment.findFirst({
            where: { externalId: external_id },
        });
        if (!payment)
            return { message: 'Payment not found' };
        if (payment.status === 'paid')
            return { message: 'Payment already processed' };
        const statusMap = {
            PAID: 'paid',
            SETTLED: 'paid',
            EXPIRED: 'expired',
            FAILED: 'failed',
            REFUNDED: 'refunded',
        };
        const paymentStatus = (statusMap[String(status).toUpperCase()] ?? 'pending');
        await this.prisma.$transaction([
            this.prisma.payment.update({
                where: { id: payment.id },
                data: {
                    status: paymentStatus,
                    ...(paymentStatus === 'paid' && { paidAt: new Date() }),
                    ...(paymentStatus === 'refunded' && { refundedAt: new Date() }),
                },
            }),
            this.prisma.order.update({
                where: { id: payment.orderId },
                data: {
                    paymentStatus,
                    ...(paymentStatus === 'paid' && { status: 'paid' }),
                    ...(paymentStatus === 'expired' && {
                        status: 'cancelled',
                        cancelledAt: new Date(),
                        cancelReason: 'Payment expired',
                    }),
                },
            }),
        ]);
        if (paymentStatus === 'paid') {
            this.sendOrderConfirmationEmail(payment.orderId).catch((e) => this.logger.error('Order confirmation email failed', e));
        }
        if (paymentStatus === 'refunded') {
            this.sendRefundEmail(payment.orderId).catch((e) => this.logger.error('Refund email failed', e));
        }
        return { message: 'Xendit webhook processed' };
    }
    async requestRefund(orderId, reason) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            include: {
                payment: true,
                user: { select: { email: true, name: true } },
            },
        });
        if (!order)
            throw new common_1.NotFoundException('Order tidak ditemukan');
        if (!order.payment)
            throw new common_1.NotFoundException('Order belum memiliki data pembayaran');
        if (order.payment.status !== 'paid')
            throw new common_1.BadRequestException('Hanya pembayaran dengan status "paid" yang bisa di-refund');
        const invoiceId = order.payment.metadata?.xenditInvoiceId;
        if (!invoiceId)
            throw new common_1.BadRequestException('Xendit invoice ID tidak ditemukan di metadata payment');
        await this.xenditService.createRefund({
            invoiceId,
            amount: Number(order.payment.amount),
            reason: 'REQUESTED_BY_CUSTOMER',
        });
        await this.prisma.$transaction([
            this.prisma.payment.update({
                where: { id: order.payment.id },
                data: {
                    status: 'refunded',
                    refundedAt: new Date(),
                    refundReason: reason ?? null,
                },
            }),
            this.prisma.order.update({
                where: { id: orderId },
                data: { paymentStatus: 'refunded' },
            }),
        ]);
        this.sendRefundEmail(orderId).catch((e) => this.logger.error('Refund email failed', e));
        return {
            message: 'Refund berhasil diajukan',
            orderId,
            amount: Number(order.payment.amount),
        };
    }
    async sendOrderConfirmationEmail(orderId) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            include: {
                user: { select: { email: true, name: true } },
                items: true,
            },
        });
        if (!order)
            return;
        await this.mailService.sendOrderConfirmation({
            email: order.user.email,
            name: order.user.name,
            orderNumber: order.orderNumber,
            items: order.items.map((i) => ({
                productName: i.productName,
                variantName: i.variantName,
                quantity: i.quantity,
                price: Number(i.price),
            })),
            subtotal: Number(order.subtotal),
            shippingCost: Number(order.shippingCost),
            total: Number(order.total),
            courier: order.courier,
            service: order.service,
            paymentUrl: null,
        });
    }
    async sendRefundEmail(orderId) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            include: {
                user: { select: { email: true, name: true } },
                payment: true,
            },
        });
        if (!order)
            return;
        await this.mailService.sendRefundNotification({
            email: order.user.email,
            name: order.user.name,
            orderNumber: order.orderNumber,
            amount: Number(order.payment?.amount ?? order.total),
        });
    }
    findAll() { return `This action returns all payments`; }
    findOne(id) { return `This action returns a #${id} payment`; }
    update(id, dto) { return `This action updates a #${id} payment`; }
    remove(id) { return `This action removes a #${id} payment`; }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = PaymentsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        xendit_service_1.XenditService,
        mail_service_1.MailService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map