import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsBoolean,
  IsInt,
  IsNumber,
  IsString,
  Min,
  MinLength,
  IsDateString,
  IsUUID,
} from 'class-validator';
import { VoucherType, VoucherSource } from '../../../generated/prisma/enums';

export class CreateVoucherDto {
  @ApiProperty({ example: 'HEMAT50', description: 'Kode unik voucher (uppercase)' })
  @IsString()
  @MinLength(3)
  code!: string;

  @ApiProperty({ enum: VoucherType, description: 'Tipe: percentage | fixed | free_shipping' })
  @IsEnum(VoucherType)
  type!: VoucherType;

  @ApiPropertyOptional({
    enum: VoucherSource,
    default: VoucherSource.manual,
    description: 'Sumber voucher (admin isi manual)',
  })
  @IsOptional()
  @IsEnum(VoucherSource)
  source?: VoucherSource;

  @ApiProperty({
    example: 10000,
    description: 'Nilai diskon. Untuk percentage: 0–100. Untuk fixed/free_shipping: rupiah.',
  })
  @IsNumber()
  @Min(0)
  value!: number;

  @ApiPropertyOptional({ example: 50000, description: 'Minimum pembelian untuk pakai voucher' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minPurchase?: number;

  @ApiPropertyOptional({ example: 100000, description: 'Maksimum diskon (untuk tipe percentage)' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxDiscount?: number;

  @ApiPropertyOptional({ example: 100, description: 'Batas total pemakaian (null = unlimited)' })
  @IsOptional()
  @IsInt()
  @Min(1)
  usageLimit?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ example: '2026-07-01T00:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({ example: '2026-12-31T23:59:59.000Z' })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({ description: 'Isi jika voucher milik user tertentu (UUID)' })
  @IsOptional()
  @IsUUID()
  ownerId?: string;
}
