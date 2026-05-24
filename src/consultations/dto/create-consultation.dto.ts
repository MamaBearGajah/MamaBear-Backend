import { IsString, IsOptional, IsEmail, IsEnum } from 'class-validator';
import { PartialType, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ConsultationStatus } from '../../../generated/prisma/enums.js';

export class CreateConsultationDto {
  @ApiProperty({ description: 'Customer full name', example: 'Siti Rahayu' })
  @IsString()
  name!: string;

  @ApiProperty({ description: 'Customer email address', example: 'siti@example.com' })
  @IsEmail()
  email!: string;

  @ApiPropertyOptional({ description: 'Customer phone number', example: '081234567890' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ description: 'Consultation message or question', example: 'Produk apa yang cocok untuk bayi usia 3 bulan?' })
  @IsString()
  message!: string;
}

export class UpdateConsultationDto extends PartialType(CreateConsultationDto) {
  @ApiPropertyOptional({ description: 'Update consultation status', enum: ConsultationStatus, example: ConsultationStatus.closed })
  @IsOptional()
  @IsEnum(ConsultationStatus)
  status?: ConsultationStatus;
}
