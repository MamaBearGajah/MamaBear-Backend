import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ example: 'uuid-order-id', description: 'ID order yang akan dibayar' })
  @IsUUID()
  @IsNotEmpty()
  orderId!: string;

  @ApiProperty({ enum: ['xendit'], description: 'Payment gateway — hanya Xendit' })
  @IsEnum(['xendit'])
  provider!: 'xendit';

  @ApiProperty({ example: 55000, description: 'Total amount dalam Rupiah (min. Rp 1.000)' })
  @IsNumber()
  @Min(1000)
  amount!: number;
}