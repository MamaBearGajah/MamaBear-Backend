import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ example: 'uuid-order-id', description: 'ID order yang akan dibayar' })
  @IsUUID()
  @IsNotEmpty()
  orderId!: string;

  @ApiProperty({ example: 55000, description: 'Total amount dalam Rupiah' })
  @IsNumber()
  @Min(1000)
  amount!: number;
}