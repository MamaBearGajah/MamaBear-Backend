import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ConsultationStatus } from 'generated/prisma/enums';

export class ConsultationQueryDto {
  @ApiPropertyOptional({
    example: 1,
    default: 1,
    description: 'Nomor halaman',
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    example: 20,
    default: 20,
    description: 'Jumlah data per halaman',
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 20;

  @ApiPropertyOptional({
    enum: ConsultationStatus,
    description: 'Filter berdasarkan status konsultasi',
    example: ConsultationStatus.new,
  })
  @IsOptional()
  @IsEnum(ConsultationStatus)
  status?: ConsultationStatus;

  @ApiPropertyOptional({
    example: 'rifky',
    description: 'Cari berdasarkan nama, email, nomor telepon, atau isi pesan',
  })
  @IsOptional()
  @IsString()
  search?: string;
}