import { Injectable } from '@nestjs/common';

@Injectable()
export class XenditService {
    async createInvoice() {
        return {
        message: 'xendit invoice created',
        };
    }
}