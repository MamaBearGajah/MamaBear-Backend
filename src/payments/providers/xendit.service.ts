import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Xendit, Invoice as XenditInvoice } from 'xendit-node';

export interface CreateInvoiceOptions {
  externalId: string;
  amount: number;
  payerEmail: string;
  description?: string;
}

@Injectable()
export class XenditService {
  private readonly logger = new Logger(XenditService.name);
  private readonly invoiceClient: XenditInvoice;

  constructor(private readonly config: ConfigService) {
    const xendit = new Xendit({
      secretKey: this.config.getOrThrow<string>('XENDIT_SECRET_KEY'),
    });
    this.invoiceClient = xendit.Invoice;
  }

  async createInvoice(opts: CreateInvoiceOptions) {
    const frontendUrl = this.config.getOrThrow<string>('FRONTEND_URL');

    try {
      const invoice = await this.invoiceClient.createInvoice({
        data: {
          externalId: opts.externalId,
          amount: opts.amount,
          payerEmail: opts.payerEmail,
          description: opts.description ?? 'MamaBear Order Payment',
          successRedirectUrl: `${frontendUrl}/payment/success`,
          failureRedirectUrl: `${frontendUrl}/payment/failed`,
        },
      });

      return {
        externalId: invoice.externalId,
        invoiceUrl: invoice.invoiceUrl,
        status: invoice.status,
        expiredAt: invoice.expiryDate,
      };
    } catch (error) {
      this.logger.error('Failed to create Xendit invoice', error);
      throw new InternalServerErrorException('Gagal membuat invoice pembayaran');
    }
  }
}