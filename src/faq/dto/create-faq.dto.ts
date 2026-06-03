import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateFaqDto {
  @ApiProperty({ example: 'Berapa lama pengiriman?', minLength: 5, maxLength: 300 })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(300)
  question!: string;

  @ApiProperty({ example: 'Pengiriman memakan waktu 2-5 hari kerja.', minLength: 5, maxLength: 5000 })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(5000)
  answer!: string;

  @ApiPropertyOptional({ example: true, default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}