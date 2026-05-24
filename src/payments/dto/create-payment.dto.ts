import { IsString, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaymentProvider } from '../../../generated/prisma/enums.js';

export class InitiatePaymentDto {
  @ApiProperty({ description: 'Order UUID to pay for', example: 'uuid-here' })
  @IsString()
  orderId!: string;

  @ApiProperty({ description: 'Payment gateway to use', enum: PaymentProvider, example: PaymentProvider.midtrans })
  @IsEnum(PaymentProvider)
  provider!: PaymentProvider;
}

export class MidtransWebhookDto {
  @ApiProperty({ description: 'Order ID from Midtrans notification', example: 'ORDER-123' })
  order_id!: string;

  @ApiProperty({ description: 'Transaction status from Midtrans', example: 'settlement' })
  transaction_status!: string;

  @ApiPropertyOptional({ description: 'Fraud detection status', example: 'accept' })
  fraud_status?: string;
}

export class XenditWebhookDto {
  @ApiProperty({ description: 'External ID matching the order', example: 'ORDER-123' })
  external_id!: string;

  @ApiProperty({ description: 'Invoice status from Xendit', example: 'PAID' })
  status!: string;
}
