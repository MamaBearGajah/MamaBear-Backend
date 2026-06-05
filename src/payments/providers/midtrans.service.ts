import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import midtransClient from 'midtrans-client';

export interface CreateSnapTokenOptions {
  orderId: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  description?: string;
}

@Injectable()
export class MidtransService {
  private readonly logger = new Logger(MidtransService.name);
  private readonly snap: midtransClient.Snap;

  constructor(private readonly config: ConfigService) {
    this.snap = new midtransClient.Snap({
      isProduction: this.config.get<string>('MIDTRANS_IS_PRODUCTION') === 'true',
      serverKey: this.config.getOrThrow<string>('MIDTRANS_SERVER_KEY'),
      clientKey: this.config.getOrThrow<string>('MIDTRANS_CLIENT_KEY'),
    });
  }

  async createSnapToken(opts: CreateSnapTokenOptions) {
    try {
      const transaction = await this.snap.createTransaction({
        transaction_details: {
          order_id: opts.orderId,
          gross_amount: opts.amount,
        },
        customer_details: {
          first_name: opts.customerName,
          email: opts.customerEmail,
        },
        item_details: opts.description
          ? [{ id: opts.orderId, price: opts.amount, quantity: 1, name: opts.description }]
          : undefined,
      });

      return {
        token: transaction.token,
        redirectUrl: transaction.redirect_url,
      };
    } catch (error) {
      this.logger.error('Failed to create Midtrans Snap token', error);
      throw new InternalServerErrorException('Gagal membuat token pembayaran Midtrans');
    }
  }
}