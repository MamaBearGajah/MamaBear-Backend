import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ValidateVoucherDto {
  @ApiProperty({ example: 'HEMAT50', description: 'Kode voucher yang ingin divalidasi' })
  @IsString()
  @MinLength(3)
  code!: string;

  @ApiProperty({ example: 150000, description: 'Total belanja (untuk cek minPurchase)' })
  totalAmount!: number;
}

// src/voucher/dto/update-voucher.dto.ts
// (simpan di file terpisah update-voucher.dto.ts)
import { PartialType } from '@nestjs/swagger';
import { CreateVoucherDto } from './create-voucher.dto';

export class UpdateVoucherDto extends PartialType(CreateVoucherDto) {}
