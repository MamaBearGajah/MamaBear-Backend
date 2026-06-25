import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, IsPositive } from 'class-validator';

export class ApplyVoucherDto {
  @ApiProperty({
    description: 'Unique identifier of the voucher to apply',
    example: 'clx1abc2def3ghi4jkl5',
  })
  @IsString()
  @IsNotEmpty()
  voucherId: string;

  @ApiProperty({
    description: 'Order subtotal before discount and shipping (in smallest currency unit, e.g. IDR)',
    example: 150000,
    minimum: 1,
  })
  @IsNumber()
  @IsPositive()
  subtotal: number;

  @ApiProperty({
    description: 'Shipping cost before any voucher discount is applied',
    example: 15000,
    minimum: 1,
  })
  @IsNumber()
  @IsPositive()
  shippingCost: number;
}