import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateConsultationDto {
  @ApiProperty({ example: 'Jane Doe', minLength: 2, maxLength: 100 })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  name!: string;

  @ApiProperty({ example: 'jane@mail.com' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiPropertyOptional({ example: '08123456789', minLength: 8, maxLength: 20 })
  @IsString()
  @IsOptional()
  @MinLength(8)
  @MaxLength(20)
  phone?: string;

  @ApiProperty({ example: 'Saya ingin bertanya tentang produk...', minLength: 10, maxLength: 2000 })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(2000)
  message!: string;
}