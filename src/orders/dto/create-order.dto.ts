import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: 'uuid-alamat', description: 'ID alamat pengiriman' })
  @IsString()
  @IsNotEmpty()
  addressId!: string;

  @ApiProperty({ example: 'jne', description: 'Kode kurir (jne, jnt, sicepat, dll)' })
  @IsString()
  @IsNotEmpty()
  courier!: string;

  @ApiProperty({ example: 'REG', description: 'Kode layanan pengiriman' })
  @IsString()
  @IsNotEmpty()
  service!: string;

  @ApiPropertyOptional({ example: 'uuid-voucher', description: 'ID voucher (opsional)' })
  @IsOptional()
  @IsString()
  voucherId?: string;

  @ApiPropertyOptional({ example: 'Tolong dibungkus kado ya', description: 'Catatan order' })
  @IsOptional()
  @IsString()
  notes?: string;
}