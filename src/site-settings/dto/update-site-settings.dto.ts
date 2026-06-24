import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateSiteSettingsDto {
  @ApiPropertyOptional({ example: 'Mamabear' })
  @IsOptional()
  @IsString()
  siteName?: string;

  @ApiPropertyOptional({ example: 'Produk perawatan ibu & bayi terpercaya' })
  @IsOptional()
  @IsString()
  siteDescription?: string;

  @ApiPropertyOptional({ example: 'hello@mamabear.id' })
  @IsOptional()
  @IsEmail()
  contactEmail?: string;

  @ApiPropertyOptional({ example: '+6281234567890' })
  @IsOptional()
  @IsString()
  contactPhone?: string;

  @ApiPropertyOptional({ example: 'Jl. Kenanga No. 12, Jakarta Selatan' })
  @IsOptional()
  @IsString()
  contactAddress?: string;

  @ApiPropertyOptional({ example: 'https://instagram.com/mamabear.id' })
  @IsOptional()
  @IsString()
  socialInstagram?: string;

  @ApiPropertyOptional({ example: 'https://tiktok.com/@mamabear.id' })
  @IsOptional()
  @IsString()
  socialTiktok?: string;

  @ApiPropertyOptional({ example: 'https://facebook.com/mamabear.id' })
  @IsOptional()
  @IsString()
  socialFacebook?: string;

  @ApiPropertyOptional({ example: 'https://wa.me/6281234567890' })
  @IsOptional()
  @IsString()
  socialWhatsapp?: string;

  @ApiPropertyOptional({ example: '151', description: 'City ID asal pengiriman (RajaOngkir)' })
  @IsOptional()
  @IsString()
  shippingOriginCityId?: string;

  @ApiPropertyOptional({ example: 11, description: 'Pajak dalam persen (0-100)' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  @Type(() => Number)
  taxRate?: number;

  @ApiPropertyOptional({ example: 'IDR' })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  maintenanceMode?: boolean;
}
