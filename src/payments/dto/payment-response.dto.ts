import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PaymentDto {
  @ApiProperty({ example: 'uuid-here' })
  id!: string;

  @ApiProperty({ example: 'uuid-here' })
  orderId!: string;

  @ApiProperty({ example: 'midtrans', enum: ['midtrans', 'xendit'] })
  provider!: string;

  @ApiProperty({ example: 'pending', enum: ['pending', 'paid', 'failed', 'expired', 'refunded'] })
  status!: string;

  @ApiProperty({ example: 79000, description: 'Payment amount in IDR' })
  amount!: number;

  @ApiPropertyOptional({ example: 'https://app.sandbox.midtrans.com/snap/v2/vtweb/token-here', nullable: true, description: 'Redirect URL to the payment gateway page' })
  paymentUrl!: string | null;

  @ApiPropertyOptional({ example: null, nullable: true })
  paidAt!: Date | null;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  updatedAt!: Date;
}

export class InitiatePaymentResponseDto {
  @ApiProperty({ example: 'uuid-here' })
  id!: string;

  @ApiProperty({ example: 'midtrans', enum: ['midtrans', 'xendit'] })
  provider!: string;

  @ApiProperty({ example: 'pending' })
  status!: string;

  @ApiProperty({ example: 79000 })
  amount!: number;

  @ApiPropertyOptional({ example: 'https://app.sandbox.midtrans.com/snap/v2/vtweb/token-here', description: 'Redirect the user to this URL to complete payment', nullable: true })
  paymentUrl!: string | null;
}
