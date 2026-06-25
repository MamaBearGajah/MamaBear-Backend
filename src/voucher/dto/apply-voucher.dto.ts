import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min, MinLength } from 'class-validator';

export class ApplyVoucherDto {
  @ApiProperty({
    description: 'Kode voucher yang ingin diterapkan',
    example: 'HEMAT25K',
  })
  @IsString()
  @MinLength(3)
  code!: string;

  @ApiProperty({
    description: 'Subtotal produk sebelum diskon. Ongkir tidak dipengaruhi voucher.',
    example: 150000,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  totalAmount!: number;
}