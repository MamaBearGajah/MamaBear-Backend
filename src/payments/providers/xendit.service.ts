import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Xendit } from 'xendit-node';

@Injectable()
export class XenditService {
    private xenditClient: Xendit;

    constructor(private configService: ConfigService) {
        this.xenditClient = new Xendit({
        secretKey: this.configService.get<string>('XENDIT_SECRET_KEY')!,
        });
    }

    async createInvoice(): Promise<any> {
        const invoiceApi = this.xenditClient.Invoice;

        const response = await invoiceApi.createInvoice({
        data: {
            externalId: `INV-${Date.now()}`,
            amount: 50000,
            payerEmail: 'customer@example.com',
            description: 'MamaBear Order Payment',
        },
        });

        return response;
    }
}