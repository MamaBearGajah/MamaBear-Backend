import { ApiPropertyOptional } from '@nestjs/swagger';
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

/**
 * Every field is explicitly @IsOptional() so PATCH /vouchers/:id
 * accepts partial payloads (e.g. { isActive: false } alone).
 *
 * We do NOT use PartialType here because its interaction with
 * the global ValidationPipe (forbidNonWhitelisted + transform)
 * can still enforce required fields in some NestJS/class-validator
 * version combinations.
 */
export class UpdateVoucherDto {
  @ApiPropertyOptional({ example: 'HEMAT50', description: 'Kode unik voucher (uppercase)' })
  @IsOptional()
  @IsString()
  @MinLength(3)
  code?: string;

  @ApiPropertyOptional({ enum: VoucherType, description: 'Tipe: percentage | fixed | free_shipping' })
  @IsOptional()
  @IsEnum(VoucherType)
  type?: VoucherType;

  @ApiPropertyOptional({ enum: VoucherSource, description: 'Sumber voucher' })
  @IsOptional()
  @IsEnum(VoucherSource)
  source?: VoucherSource;

  @ApiPropertyOptional({ example: 10000, description: 'Nilai diskon' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  value?: number;

  @ApiPropertyOptional({ example: 50000, description: 'Minimum pembelian' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minPurchase?: number;

  @ApiPropertyOptional({ example: 100000, description: 'Maksimum diskon' })
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

  @ApiPropertyOptional({ description: 'UUID user pemilik voucher (opsional)' })
  @IsOptional()
  @IsUUID()
  ownerId?: string;
}