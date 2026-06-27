import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: 'uuid-alamat', description: 'ID alamat pengiriman' })
  @IsString()
  @IsNotEmpty()
  addressId!: string;

  @ApiProperty({ example: 'jne', description: 'Kode kurir (jne, jnt, pos, dll)' })
  @IsString()
  @IsNotEmpty()
  courier!: string;

  @ApiProperty({ example: 'REG', description: 'Kode layanan pengiriman' })
  @IsString()
  @IsNotEmpty()
  service!: string;

  @ApiPropertyOptional({ example: 'uuid-voucher', description: 'ID voucher potongan harga produk' })
  @IsOptional()
  @IsString()
  voucherId?: string;

  @ApiPropertyOptional({ example: 'uuid-voucher-ongkir', description: 'ID voucher gratis ongkir' })
  @IsOptional()
  @IsString()
  voucherShippingId?: string;

  @ApiPropertyOptional({ example: 'Tolong dibungkus kado ya', description: 'Catatan order' })
  @IsOptional()
  @IsString()
  notes?: string;
}