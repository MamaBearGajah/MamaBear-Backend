import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString, IsOptional, IsBoolean, IsInt, IsDateString, IsNotEmpty, IsUrl, Min,
} from 'class-validator';

export class CreateBannerDto {
  @ApiProperty({ example: 'https://res.cloudinary.com/.../banner.jpg' })
  @IsString()
  @IsNotEmpty()
  imageUrl!: string;

  @ApiPropertyOptional({ example: 'Banner promo Lebaran MamaBear' })
  @IsOptional()
  @IsString()
  altText?: string;

  @ApiPropertyOptional({ example: 'NEW', description: 'Badge kecil di sudut banner' })
  @IsOptional()
  @IsString()
  label?: string;

  @ApiPropertyOptional({ example: 'Promo Spesial Lebaran 🎉' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'Diskon hingga 50% untuk semua produk ASI Booster' })
  @IsOptional()
  @IsString()
  desc?: string;

  @ApiPropertyOptional({ example: '/products?category=asi-booster', description: 'Path tujuan klik' })
  @IsOptional()
  @IsString()
  path?: string;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ default: 0, description: 'Urutan tampil (terkecil = paling atas/pertama)' })
  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;

  @ApiPropertyOptional({ example: '2026-07-01T00:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({ example: '2026-07-31T23:59:59.000Z' })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
