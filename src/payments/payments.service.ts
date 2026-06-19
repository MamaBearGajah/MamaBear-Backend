import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { XenditService } from './providers/xendit.service';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly xenditService: XenditService,
    private readonly mailService: MailService,
  ) {}

  // ─── Checkout ──────────────────────────────────────────────────────────────
  async create(dto: CreatePaymentDto) {
    const { amount, orderId } = dto;

    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { user: { select: { email: true, name: true } } },
    });
    if (!order) throw new NotFoundException('Order tidak ditemukan');

    const expiryDate =
      order.paymentDeadline ?? new Date(Date.now() + 2 * 60 * 60 * 1000);

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

  // ─── Xendit Webhook ────────────────────────────────────────────────────────
  async handleXenditWebhook(callbackToken: string, body: any) {
    if (callbackToken !== process.env.XENDIT_WEBHOOK_TOKEN) {
      return { message: 'Invalid callback token' };
    }

    const { external_id, status } = body;
    const payment = await this.prisma.payment.findFirst({
      where: { externalId: external_id },
    });
    if (!payment) return { message: 'Payment not found' };
    if (payment.status === 'paid') return { message: 'Payment already processed' };

    const statusMap: Record<string, string> = {
      PAID:     'paid',
      SETTLED:  'paid',
      EXPIRED:  'expired',
      FAILED:   'failed',
      REFUNDED: 'refunded',
    };
    const paymentStatus = (statusMap[String(status).toUpperCase()] ?? 'pending') as any;

    await this.prisma.$transaction([
      this.prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: paymentStatus,
          ...(paymentStatus === 'paid'     && { paidAt: new Date() }),
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
      this.sendOrderConfirmationEmail(payment.orderId).catch((e) =>
        this.logger.error('Order confirmation email failed', e),
      );
    }
    if (paymentStatus === 'refunded') {
      this.sendRefundEmail(payment.orderId).catch((e) =>
        this.logger.error('Refund email failed', e),
      );
    }

    return { message: 'Xendit webhook processed' };
  }

  // ─── Admin: Request Refund ─────────────────────────────────────────────────
  async requestRefund(orderId: string, reason?: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        payment: true,
        user: { select: { email: true, name: true } },
      },
    });
    if (!order) throw new NotFoundException('Order tidak ditemukan');
    if (!order.payment) throw new NotFoundException('Order belum memiliki data pembayaran');
    if (order.payment.status !== 'paid')
      throw new BadRequestException('Hanya pembayaran dengan status "paid" yang bisa di-refund');

    const invoiceId = (order.payment.metadata as any)?.xenditInvoiceId;
    if (!invoiceId)
      throw new BadRequestException('Xendit invoice ID tidak ditemukan di metadata payment');

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

    this.sendRefundEmail(orderId).catch((e) =>
      this.logger.error('Refund email failed', e),
    );

    return {
      message: 'Refund berhasil diajukan',
      orderId,
      amount: Number(order.payment.amount),
    };
  }

  // ─── Private: Email Helpers ────────────────────────────────────────────────
  private async sendOrderConfirmationEmail(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: { select: { email: true, name: true } },
        items: true,
      },
    });
    if (!order) return;

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

  private async sendRefundEmail(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: { select: { email: true, name: true } },
        payment: true,
      },
    });
    if (!order) return;

    await this.mailService.sendRefundNotification({
      email: order.user.email,
      name: order.user.name,
      orderNumber: order.orderNumber,
      amount: Number(order.payment?.amount ?? order.total),
    });
  }

  findAll() { return `This action returns all payments`; }
  findOne(id: number) { return `This action returns a #${id} payment`; }
  update(id: number, dto: UpdatePaymentDto) { return `This action updates a #${id} payment`; }
  remove(id: number) { return `This action removes a #${id} payment`; }
}