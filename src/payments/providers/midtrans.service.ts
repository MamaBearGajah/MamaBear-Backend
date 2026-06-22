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

export interface CreateRefundOptions {
  orderId: string;   // Midtrans order_id (= orderNumber kita)
  amount: number;
  reason?: string;
}

@Injectable()
export class MidtransService {
  private readonly logger = new Logger(MidtransService.name);
  private readonly snap: midtransClient.Snap;
  private readonly core: midtransClient.CoreApi;

  constructor(private readonly config: ConfigService) {
    const isProduction = this.config.get<string>('MIDTRANS_IS_PRODUCTION') === 'true';
    const serverKey = this.config.getOrThrow<string>('MIDTRANS_SERVER_KEY');
    const clientKey = this.config.getOrThrow<string>('MIDTRANS_CLIENT_KEY');

    this.snap = new midtransClient.Snap({ isProduction, serverKey, clientKey });
    this.core = new midtransClient.CoreApi({ isProduction, serverKey, clientKey });
  }

  // ─── Create Snap Token ─────────────────────────────────────────────────────

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

  // ─── Get Transaction Status (cek status — cron/reconciliation) ──────────────

  async getTransactionStatus(orderId: string) {
    try {
      const status = await this.core.transaction.status(orderId);
      return {
        orderId: status.order_id,
        transactionStatus: status.transaction_status,
        fraudStatus: status.fraud_status,
        grossAmount: status.gross_amount,
        paymentType: status.payment_type,
        transactionTime: status.transaction_time,
      };
    } catch (error: any) {
      this.logger.error(`Failed to get Midtrans transaction status for ${orderId}`, error);
      throw new InternalServerErrorException('Gagal mengambil status transaksi Midtrans');
    }
  }

  // ─── Create Refund (Core API) ────────────────────────────────────────────────

  async createRefund(opts: CreateRefundOptions) {
    try {
      const result = await this.core.transaction.refund(opts.orderId, {
        refund_key: `refund-${opts.orderId}-${Date.now()}`,
        amount: opts.amount,
        reason: opts.reason ?? 'Customer requested refund',
      });

      return {
        orderId: result.order_id,
        refundAmount: result.refund_amount,
        status: result.transaction_status,
      };
    } catch (error) {
      this.logger.error(`Failed to create Midtrans refund for ${opts.orderId}`, error);
      throw new InternalServerErrorException('Gagal memproses refund Midtrans');
    }
  }
}