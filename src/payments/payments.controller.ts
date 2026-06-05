import { Controller, Post, Body, Headers, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../auth/decorators';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // ─── Checkout ─────────────────────────────────────────────────────────────

  @Post('checkout')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Buat payment untuk order (Xendit / Midtrans)' })
  @ApiResponse({ status: 201, description: 'Payment berhasil dibuat, dapat paymentUrl' })
  @ApiResponse({ status: 404, description: 'Order tidak ditemukan' })
  create(@Body() dto: CreatePaymentDto) {
    return this.paymentsService.create(dto);
  }

  // ─── Webhooks (Public — tidak perlu auth, verifikasi via token/signature) ──

  @Post('webhook/xendit')
  @Public()
  @ApiOperation({ summary: 'Xendit payment webhook' })
  @ApiResponse({ status: 200, description: 'Webhook diproses' })
  xenditWebhook(
    @Headers('x-callback-token') callbackToken: string,
    @Body() body: any,
  ) {
    return this.paymentsService.handleXenditWebhook(callbackToken, body);
  }

  @Post('webhook/midtrans')
  @Public()
  @ApiOperation({ summary: 'Midtrans payment notification webhook' })
  @ApiResponse({ status: 200, description: 'Webhook diproses' })
  midtransWebhook(@Body() body: any) {
    return this.paymentsService.handleMidtransWebhook(body);
  }
}