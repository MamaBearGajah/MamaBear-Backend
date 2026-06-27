import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateConsultationDto {
  @ApiProperty({
    example: 'Rifky Kurniawan',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @ApiProperty({
    example: 'rifky@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiPropertyOptional({
    example: '081234567890',
  })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  phone?: string;

  @ApiProperty({
    example:
      'Saya ingin konsultasi mengenai produk herbal untuk daya tahan tubuh.',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  message!: string;
}