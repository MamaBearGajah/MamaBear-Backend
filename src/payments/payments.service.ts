import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { XenditService } from './providers/xendit.service';
import { MidtransService } from './providers/midtrans.service';

@Injectable()
export class PaymentsService {
  constructor(
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
    const { provider } = createPaymentDto;

    if (provider === 'xendit') {
      return this.xenditService.createInvoice();
    }

    if (provider === 'midtrans') {
      return this.midtransService.createToken();
    }

    return {
      message: 'Invalid payment provider',
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
