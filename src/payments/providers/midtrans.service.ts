import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import midtransClient from 'midtrans-client';

@Injectable()
export class MidtransService {
    private snap: midtransClient.Snap;

    constructor(private configService: ConfigService) {
        this.snap = new midtransClient.Snap({
            isProduction:
                this.configService.get<string>('MIDTRANS_IS_PRODUCTION') === 'true',
            serverKey: this.configService.get<string>('MIDTRANS_SERVER_KEY')!,
            clientKey: this.configService.get<string>('MIDTRANS_CLIENT_KEY')!,
        });
    }

    async createToken(): Promise<any> {
        const transaction = await this.snap.createTransaction({
            transaction_details: {
                order_id: `ORDER-${Date.now()}`,
                gross_amount: 50000,
            },
            customer_details: {
                first_name: 'MamaBear Customer',
                email: 'customer@example.com',
            },
        });

        return transaction;
    }
}