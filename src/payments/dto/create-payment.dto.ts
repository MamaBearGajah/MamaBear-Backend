import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ example: 'uuid-order-id', description: 'ID order yang akan dibayar' })
  @IsUUID()
  @IsNotEmpty()
  orderId!: string;

  @ApiProperty({ enum: ['xendit', 'midtrans'], description: 'Payment gateway yang digunakan' })
  @IsEnum(['xendit', 'midtrans'])
  provider!: 'xendit' | 'midtrans';

  @ApiProperty({ example: 55000, description: 'Total amount dalam Rupiah' })
  @IsNumber()
  @Min(1000)
  amount!: number;
}