import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Xendit, Invoice as XenditInvoice, Refund as XenditRefund } from 'xendit-node';

export interface CreateInvoiceOptions {
  externalId: string;
  amount: number;
  payerEmail: string;
  description?: string;
  expiryDate?: Date; // opsional, default Xendit 24 jam jika tidak diisi
}

export interface CreateRefundOptions {
  invoiceId: string; // Xendit invoice/payment ID (bukan externalId kita)
  amount: number;
  reason?:
    | 'FRAUDULENT'
    | 'DUPLICATE'
    | 'REQUESTED_BY_CUSTOMER'
    | 'CANCELLATION'
    | 'OTHERS';
}

@Injectable()
export class XenditService {
  private readonly logger = new Logger(XenditService.name);
  private readonly invoiceClient: XenditInvoice;
  private readonly refundClient: XenditRefund;

  constructor(private readonly config: ConfigService) {
    const xendit = new Xendit({
      secretKey: this.config.getOrThrow<string>('XENDIT_SECRET_KEY'),
    });
    this.invoiceClient = xendit.Invoice;
    this.refundClient = xendit.Refund;
  }

  // ─── Create Invoice ────────────────────────────────────────────────────────

  async createInvoice(opts: CreateInvoiceOptions) {
    const frontendUrl = this.config.getOrThrow<string>('FRONTEND_URL');

    // FIX: invoiceDuration harus number (detik), bukan string
    const invoiceDuration: number | undefined = opts.expiryDate
      ? Math.max(60, Math.floor((opts.expiryDate.getTime() - Date.now()) / 1000))
      : undefined; // default Xendit = 24 jam

    try {
      const invoice = await this.invoiceClient.createInvoice({
        data: {
          externalId: opts.externalId,
          amount: opts.amount,
          payerEmail: opts.payerEmail,
          description: opts.description ?? 'MamaBear Order Payment',
          successRedirectUrl: `${frontendUrl}/payment/success`,
          failureRedirectUrl: `${frontendUrl}/payment/failed`,
          // FIX: invoiceDuration sekarang number, sesuai tipe CreateInvoiceRequest
          ...(invoiceDuration !== undefined && { invoiceDuration }),
        },
      });

      return {
        id: invoice.id,
        externalId: invoice.externalId,
        invoiceUrl: invoice.invoiceUrl,
        status: invoice.status,
        // FIX: field yang benar adalah expiryDate (Date), bukan expiredAt
        expiredAt: invoice.expiryDate ?? opts.expiryDate,
      };
    } catch (error) {
      this.logger.error('Failed to create Xendit invoice', error);
      throw new InternalServerErrorException('Gagal membuat invoice pembayaran');
    }
  }

  // ─── Get Invoice (cek status — untuk reconciliation/cron) ─────────────────

  async getInvoice(invoiceId: string) {
    try {
      const invoice = await this.invoiceClient.getInvoiceById({ invoiceId });

      return {
        id: invoice.id,
        externalId: invoice.externalId,
        status: invoice.status,
        // FIX: paidAt tidak ada di tipe Invoice Xendit SDK.
        // Field ini hanya tersedia di webhook payload (raw body), bukan di response SDK.
        // Gunakan null sebagai fallback; paidAt diisi dari webhook handler.
        paidAt: null as Date | null,
        amount: invoice.amount,
        expiredAt: invoice.expiryDate,
      };
    } catch (error: any) {
      if (error?.status === 404)
        throw new NotFoundException('Invoice Xendit tidak ditemukan');
      this.logger.error('Failed to get Xendit invoice', error);
      throw new InternalServerErrorException(
        'Gagal mengambil status invoice Xendit',
      );
    }
  }

  // ─── Create Refund ─────────────────────────────────────────────────────────

  async createRefund(opts: CreateRefundOptions) {
    try {
      const refund = await this.refundClient.createRefund({
        data: {
          invoiceId: opts.invoiceId,
          amount: opts.amount,
          reason: opts.reason ?? 'REQUESTED_BY_CUSTOMER',
        },
      });

      return {
        id: refund.id,
        status: 'PENDING' as const,
        amount: refund.amount,
        referenceId: refund.referenceId,
        created: refund.created,
      };
    } catch (error) {
      this.logger.error('Failed to create Xendit refund', error);
      throw new InternalServerErrorException('Gagal memproses refund Xendit');
    }
  }
}