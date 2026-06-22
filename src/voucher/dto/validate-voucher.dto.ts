import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, MinLength, IsNumber, Min, IsOptional } from 'class-validator';

export class ValidateVoucherDto {
  @ApiProperty({ example: 'HEMAT25K', description: 'Kode voucher yang ingin divalidasi' })
  @IsString()
  @MinLength(3)
  code!: string;

  @ApiProperty({ example: 150000, description: 'Subtotal belanja sebelum ongkir (untuk cek minPurchase & hitung diskon)' })
  @IsNumber()
  @Min(0)
  totalAmount!: number;

  @ApiPropertyOptional({ example: 15000, description: 'Ongkos kirim (untuk hitung diskon free_shipping)' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  shippingCost?: number;
}