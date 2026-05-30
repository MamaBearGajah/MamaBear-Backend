import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { XenditService } from './providers/xendit.service';
import { MidtransService } from './providers/midtrans.service';
import { PrismaService } from '../prisma/prisma.service';
import * as crypto from 'crypto';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly xenditService: XenditService,
    private readonly midtransService: MidtransService,
  ) {}

  async testXendit() {
    return this.xenditService.createInvoice();
  }

  async testMidtrans() {
    return this.midtransService.createToken();
  }

  async create(createPaymentDto: CreatePaymentDto) {
    const { provider, amount, orderId } = createPaymentDto;

    if (provider === 'xendit') {
      const invoice = await this.xenditService.createInvoice();

      await this.prisma.payment.create({
        data: {
          orderId,
          provider,
          amount,
          externalId: invoice.externalId,
          paymentUrl: invoice.invoiceUrl,
        },
      });

      return invoice;
    }

    if (provider === 'midtrans') {
      const transaction = await this.midtransService.createToken();

      await this.prisma.payment.create({
        data: {
          orderId,
          provider,
          amount,
          paymentUrl: transaction.redirect_url,
        },
      });

      return transaction;
    }

    return {
      message: 'Invalid payment provider',
    };
  }

  async handleXenditWebhook(
    callbackToken: string,
    body: any,
  ) {
    if (
      callbackToken !==
      process.env.XENDIT_CALLBACK_TOKEN
    ) {
      return {
        message: 'Invalid callback token',
      };
    }

    const { external_id, status } = body;

    const payment = await this.prisma.payment.findFirst({
      where: {
        externalId: external_id,
      },
    });

    if (!payment) {
      return {
        message: 'Payment not found',
      };
    }

    await this.prisma.payment.update({
      where: {
        id: payment.id,
      },
      data: {
        status: status.toLowerCase(),
      },
    });

    return {
      message: 'Webhook processed',
    };
  }

  async handleMidtransWebhook(body: any) {
    const {
      order_id,
      status_code,
      gross_amount,
      signature_key,
      transaction_status,
    } = body;

    const serverKey = process.env.MIDTRANS_SERVER_KEY!;

    const hash = crypto
      .createHash('sha512')
      .update(
        order_id +
          status_code +
          gross_amount +
          serverKey,
      )
      .digest('hex');

    if (hash !== signature_key) {
      return {
        message: 'Invalid signature key',
      };
    }

    const payment = await this.prisma.payment.findFirst({
      where: {
        orderId: order_id,
      },
    });

    if (!payment) {
      return {
        message: 'Payment not found',
      };
    }

    let paymentStatus: 'pending' | 'paid' | 'expired' = 'pending';

    if (transaction_status === 'settlement') {
      paymentStatus = 'paid';
    }

    if (
      transaction_status === 'expire' ||
      transaction_status === 'cancel'
    ) {
      paymentStatus = 'expired';
    }

    await this.prisma.payment.update({
      where: {
        id: payment.id,
      },
      data: {
        status: paymentStatus,
      },
    });

    return {
      message: 'Midtrans webhook processed',
    };
  }

  findAll() {
    return `This action returns all payments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
