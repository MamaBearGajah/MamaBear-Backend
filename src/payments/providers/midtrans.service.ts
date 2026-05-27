import { Injectable } from '@nestjs/common';

@Injectable()
export class MidtransService {
    async createToken() {
        return {
        message: 'midtrans token created',
        };
    }
}