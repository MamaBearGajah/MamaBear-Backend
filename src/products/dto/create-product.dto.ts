import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min, MinLength, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateVariantDto } from './create-variant.dto.js';
import { CreateImageDto } from './create-image.dto.js';

enum ProductStatus {
  active = 'active',
  inactive = 'inactive',
  draft = 'draft',
}

export class CreateProductDto {
  @ApiProperty({ description: 'Product name (min 2 chars)', example: 'Minyak Telon Plus' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name!: string;

  @ApiProperty({ description: 'URL-friendly slug', example: 'minyak-telon-plus' })
  @IsString()
  @IsNotEmpty()
  slug!: string;

  @ApiPropertyOptional({ description: 'Product description', example: 'Minyak telon dengan kandungan eucalyptus.' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Base price in IDR', example: 35000, minimum: 0 })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  basePrice!: number;

  @ApiPropertyOptional({ description: 'Discounted price in IDR', example: 29000 })
  @IsNumber()
  @IsOptional()
  discountPrice?: number;

  @ApiProperty({ description: 'Weight in grams', example: 150, minimum: 1 })
  @IsNumber()
  @Min(1)
  weight!: number;

  @ApiProperty({ description: 'Stock-keeping unit code', example: 'MTL-001' })
  @IsString()
  sku!: string;

  @ApiProperty({ description: 'Available stock quantity', example: 100 })
  @IsNumber()
  stock!: number;

  @ApiProperty({ description: 'Main product image URL', example: 'https://res.cloudinary.com/...' })
  @IsString()
  mainImage!: string;

  @ApiProperty({ description: 'Product status', enum: ProductStatus, example: ProductStatus.active })
  @IsEnum(ProductStatus)
  status!: ProductStatus;

  @ApiPropertyOptional({ description: 'Category UUID', example: 'uuid-here' })
  @IsString()
  @IsOptional()
  categoryId?: string;

  @ApiPropertyOptional({ description: 'Additional product images', type: [CreateImageDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateImageDto)
  images?: CreateImageDto[];

  @ApiPropertyOptional({ description: 'Product variants (size, color, etc.)', type: [CreateVariantDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateVariantDto)
  variants?: CreateVariantDto[];
}
