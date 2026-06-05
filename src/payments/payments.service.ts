import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { XenditService } from './providers/xendit.service';
import { MidtransService } from './providers/midtrans.service';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import * as crypto from 'crypto';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly xenditService: XenditService,
    private readonly midtransService: MidtransService,
    private readonly mailService: MailService,
  ) {}

  // ─── Checkout ─────────────────────────────────────────────────────────────

  async create(dto: CreatePaymentDto) {
    const { provider, amount, orderId } = dto;

    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { user: { select: { email: true, name: true } } },
    });
    if (!order) throw new NotFoundException('Order tidak ditemukan');

    // ─── Xendit ───────────────────────────────────────────────────────────
    if (provider === 'xendit') {
      const invoice = await this.xenditService.createInvoice({
        externalId: `ORB-${orderId}`,
        amount,
        payerEmail: order.user.email,
        description: `Pembayaran Order ${order.orderNumber}`,
      });

      await this.prisma.payment.create({
        data: {
          orderId,
          provider,
          amount,
          externalId: invoice.externalId,
          paymentUrl: invoice.invoiceUrl,
          expiredAt: invoice.expiredAt ? new Date(invoice.expiredAt) : null,
        },
      });

      return { paymentUrl: invoice.invoiceUrl, externalId: invoice.externalId };
    }

    // ─── Midtrans ─────────────────────────────────────────────────────────
    if (provider === 'midtrans') {
      const snap = await this.midtransService.createSnapToken({
        orderId: order.orderNumber, // Midtrans pakai orderNumber supaya readable di dashboard
        amount,
        customerName: order.user.name,
        customerEmail: order.user.email,
        description: `Pembayaran Order ${order.orderNumber}`,
      });

      await this.prisma.payment.create({
        data: {
          orderId,
          provider,
          amount,
          externalId: order.orderNumber, // Midtrans webhook kirim balik order_id ini
          paymentUrl: snap.redirectUrl,
          metadata: { snapToken: snap.token },
        },
      });

      return {
        paymentUrl: snap.redirectUrl,
        snapToken: snap.token, // untuk Midtrans Snap.js embed (opsional)
      };
    }

    throw new NotFoundException('Payment provider tidak valid');
  }

  // ─── Xendit Webhook ───────────────────────────────────────────────────────

  async handleXenditWebhook(callbackToken: string, body: any) {
    if (callbackToken !== process.env.XENDIT_CALLBACK_TOKEN) {
      return { message: 'Invalid callback token' };
    }

    const { external_id, status } = body;

    const payment = await this.prisma.payment.findFirst({
      where: { externalId: external_id },
    });

    if (!payment) return { message: 'Payment not found' };
    if (payment.status === 'paid') return { message: 'Payment already processed' };

    const paymentStatus = status.toLowerCase() as 'paid' | 'expired' | 'failed';

    await this.prisma.$transaction([
      this.prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: paymentStatus,
          ...(paymentStatus === 'paid' && { paidAt: new Date() }),
        },
      }),
      this.prisma.order.update({
        where: { id: payment.orderId },
        data: {
          paymentStatus,
          ...(paymentStatus === 'paid' && { status: 'paid' }),
        },
      }),
    ]);

    if (paymentStatus === 'paid') {
      this.sendOrderConfirmationEmail(payment.orderId).catch((err) =>
        this.logger.error('Failed to send order confirmation email', err),
      );
    }

    return { message: 'Xendit webhook processed' };
  }

  // ─── Midtrans Webhook ─────────────────────────────────────────────────────

  async handleMidtransWebhook(body: any) {
    const { order_id, status_code, gross_amount, signature_key, transaction_status } = body;

    // Verifikasi signature SHA512
    const serverKey = process.env.MIDTRANS_SERVER_KEY!;
    const hash = crypto
      .createHash('sha512')
      .update(order_id + status_code + gross_amount + serverKey)
      .digest('hex');

    if (hash !== signature_key) return { message: 'Invalid signature key' };

    // Midtrans kirim order_id = orderNumber kita
    const payment = await this.prisma.payment.findFirst({
      where: { externalId: order_id },
    });

    if (!payment) return { message: 'Payment not found' };
    if (payment.status === 'paid') return { message: 'Payment already processed' };

    let paymentStatus: 'pending' | 'paid' | 'expired' = 'pending';
    if (transaction_status === 'settlement' || transaction_status === 'capture') {
      paymentStatus = 'paid';
    }
    if (transaction_status === 'expire' || transaction_status === 'cancel' || transaction_status === 'deny') {
      paymentStatus = 'expired';
    }

    await this.prisma.$transaction([
      this.prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: paymentStatus,
          ...(paymentStatus === 'paid' && { paidAt: new Date() }),
        },
      }),
      this.prisma.order.update({
        where: { id: payment.orderId },
        data: {
          paymentStatus,
          ...(paymentStatus === 'paid' && { status: 'paid' }),
        },
      }),
    ]);

    if (paymentStatus === 'paid') {
      this.sendOrderConfirmationEmail(payment.orderId).catch((err) =>
        this.logger.error('Failed to send order confirmation email', err),
      );
    }

    return { message: 'Midtrans webhook processed' };
  }

  // ─── Private ──────────────────────────────────────────────────────────────

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
      items: order.items.map((item) => ({
        productName: item.productName,
        variantName: item.variantName,
        quantity: item.quantity,
        price: Number(item.price),
      })),
      subtotal: Number(order.subtotal),
      shippingCost: Number(order.shippingCost),
      total: Number(order.total),
      courier: order.courier,
      service: order.service,
      paymentUrl: null,
    });
  }

  findAll() { return `This action returns all payments`; }
  findOne(id: number) { return `This action returns a #${id} payment`; }
  update(id: number, updatePaymentDto: UpdatePaymentDto) { return `This action updates a #${id} payment`; }
  remove(id: number) { return `This action removes a #${id} payment`; }
}