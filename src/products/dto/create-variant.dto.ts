import { IsBoolean, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVariantDto {
  @ApiProperty({ description: 'Variant type (e.g. Size, Color)', example: 'Size' })
  @IsString()
  name!: string;

  @ApiProperty({ description: 'Variant value (e.g. S, Merah)', example: 'M' })
  @IsString()
  value!: string;

  @ApiPropertyOptional({ description: 'Variant-specific image URL', example: 'https://res.cloudinary.com/...' })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiPropertyOptional({ description: 'Price adjustment relative to base price in IDR (can be negative)', example: 5000 })
  @IsNumber()
  @IsOptional()
  priceAdjustment?: number;

  @ApiProperty({ description: 'Stock quantity for this variant', example: 50, minimum: 0 })
  @IsNumber()
  @Min(0)
  stock!: number;

  @ApiPropertyOptional({ description: 'Variant-specific SKU', example: 'MTL-001-M' })
  @IsString()
  @IsOptional()
  sku?: string;

  @ApiPropertyOptional({ description: 'Whether this variant is available for purchase', example: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
