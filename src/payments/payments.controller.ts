import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // =========================
  // XENDIT TEST ENDPOINT
  // =========================
  @Get('xendit-test')
  async testXendit() {
    return this.paymentsService.testXendit();
  }

  // =========================
  // MIDTRANS TEST ENDPOINT
  // =========================
  @Get('midtrans-test')

  async testMidtrans() {
    return this.paymentsService.testMidtrans();
  }

  // =========================
  // XENDIT WEBHOOK ENDPOINT
  // =========================
  @Post('webhook/xendit')
  async xenditWebhook(
    @Headers('x-callback-token') callbackToken: string,
    @Body() body: any,
  ) {
    return this.paymentsService.handleXenditWebhook(
      callbackToken,
      body,
    );
  }

  // =========================
  // MIDTRANS WEBHOOK ENDPOINT
  // =========================
  @Post('webhook/midtrans')
  async midtransWebhook(
    @Body() body: any,
  ) {
    return this.paymentsService.handleMidtransWebhook(body);
  }

  // =========================
  // PAYMENT CHECKOUT ENDPOINT
  // =========================
  @Post('checkout')
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  // =========================
  // DEFAULT CRUD ENDPOINTS
  // =========================
  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(+id);
  }
}
