import { Controller, Post, Body, Param, Headers, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Public, Roles } from '../auth/decorators';
import { Role } from '../../generated/prisma/enums';

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

  // ─── Refund (Admin) ───────────────────────────────────────────────────────
  // BARU

  @Post(':orderId/refund')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @ApiOperation({
    summary: '[Admin] Proses refund order',
    description: 'Memicu refund aktif ke Xendit/Midtrans sesuai provider yang dipakai order ini.',
  })
  @ApiParam({ name: 'orderId' })
  @ApiResponse({ status: 200, description: 'Refund berhasil diajukan' })
  @ApiResponse({ status: 400, description: 'Payment belum paid / tidak bisa di-refund' })
  @ApiResponse({ status: 404, description: 'Order/payment tidak ditemukan' })
  requestRefund(@Param('orderId') orderId: string, @Body('reason') reason?: string) {
    return this.paymentsService.requestRefund(orderId, reason);
  }

  // ─── Webhooks (Public — verifikasi via token/signature) ────────────────────

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