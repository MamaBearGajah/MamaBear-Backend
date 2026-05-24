import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service.js';
import { InitiatePaymentDto, MidtransWebhookDto, XenditWebhookDto } from './dto/create-payment.dto.js';

@Injectable()
export class PaymentsService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  async initiate(userId: string, dto: InitiatePaymentDto) {
    const order = await this.prisma.order.findUnique({
      where: { id: dto.orderId },
      include: { payment: true },
    });
    if (!order) throw new NotFoundException('Order tidak ditemukan');
    if (order.userId !== userId) throw new ForbiddenException('Akses ditolak');
    if (order.payment) throw new BadRequestException('Pembayaran sudah dibuat untuk order ini');

    // Create payment record
    const payment = await this.prisma.payment.create({
      data: {
        orderId: dto.orderId,
        provider: dto.provider,
        amount: order.total,
      },
    });

    // Build payment URL based on provider
    let paymentUrl: string | null = null;
    if (dto.provider === 'midtrans') {
      paymentUrl = await this.createMidtransPayment(order, payment.id);
    } else if (dto.provider === 'xendit') {
      paymentUrl = await this.createXenditPayment(order, payment.id);
    }

    if (paymentUrl) {
      await this.prisma.payment.update({ where: { id: payment.id }, data: { paymentUrl } });
    }

    return { ...payment, paymentUrl };
  }

  private async createMidtransPayment(order: { id: string; total: unknown }, paymentId: string): Promise<string> {
    const serverKey = this.config.get<string>('MIDTRANS_SERVER_KEY');
    if (!serverKey) return '';

    const payload = {
      transaction_details: { order_id: paymentId, gross_amount: Number(order.total) },
      callbacks: {
        finish: this.config.get<string>('PAYMENT_CALLBACK_URL') ?? '',
      },
    };

    const res = await fetch('https://app.sandbox.midtrans.com/snap/v1/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`${serverKey}:`).toString('base64')}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) return '';
    const data = (await res.json()) as { redirect_url: string };
    return data.redirect_url ?? '';
  }

  private async createXenditPayment(order: { id: string; total: unknown }, paymentId: string): Promise<string> {
    const apiKey = this.config.get<string>('XENDIT_API_KEY');
    if (!apiKey) return '';

    const payload = {
      external_id: paymentId,
      amount: Number(order.total),
      success_redirect_url: this.config.get<string>('PAYMENT_CALLBACK_URL') ?? '',
    };

    const res = await fetch('https://api.xendit.co/v2/invoices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString('base64')}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) return '';
    const data = (await res.json()) as { invoice_url: string };
    return data.invoice_url ?? '';
  }

  async handleMidtransWebhook(dto: MidtransWebhookDto) {
    const payment = await this.prisma.payment.findUnique({ where: { id: dto.order_id } });
    if (!payment) return { received: true };

    const { transaction_status, fraud_status } = dto;
    let status: 'paid' | 'failed' | 'expired' | undefined;

    if (transaction_status === 'capture') {
      status = fraud_status === 'accept' ? 'paid' : 'failed';
    } else if (transaction_status === 'settlement') {
      status = 'paid';
    } else if (['cancel', 'deny', 'failure'].includes(transaction_status)) {
      status = 'failed';
    } else if (transaction_status === 'expire') {
      status = 'expired';
    }

    if (status) await this.updatePaymentStatus(payment.id, payment.orderId, status);
    return { received: true };
  }

  async handleXenditWebhook(dto: XenditWebhookDto) {
    const payment = await this.prisma.payment.findUnique({ where: { id: dto.external_id } });
    if (!payment) return { received: true };

    const statusMap: Record<string, 'paid' | 'failed' | 'expired'> = {
      PAID: 'paid',
      SETTLED: 'paid',
      EXPIRED: 'expired',
    };
    const status = statusMap[dto.status];
    if (status) await this.updatePaymentStatus(payment.id, payment.orderId, status);
    return { received: true };
  }

  private async updatePaymentStatus(
    paymentId: string,
    orderId: string,
    status: 'paid' | 'failed' | 'expired',
  ) {
    await this.prisma.$transaction([
      this.prisma.payment.update({
        where: { id: paymentId },
        data: { status, ...(status === 'paid' && { paidAt: new Date() }) },
      }),
      this.prisma.order.update({
        where: { id: orderId },
        data: {
          paymentStatus: status,
          ...(status === 'paid' && { status: 'processing' }),
        },
      }),
    ]);
  }

  async getStatus(userId: string, orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { payment: true },
    });
    if (!order) throw new NotFoundException('Order tidak ditemukan');
    if (order.userId !== userId) throw new ForbiddenException('Akses ditolak');
    return order.payment;
  }
}
