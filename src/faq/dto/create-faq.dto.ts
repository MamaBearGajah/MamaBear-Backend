import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFaqDto {
  @ApiProperty({ example: 'Berapa lama pengiriman?' })
  @IsString()
  @IsNotEmpty()
  question!: string;

  @ApiProperty({ example: 'Pengiriman memakan waktu 2-5 hari kerja tergantung lokasi.' })
  @IsString()
  @IsNotEmpty()
  answer!: string;

  @ApiPropertyOptional({ example: true, default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}