import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength, ValidateNested } from 'class-validator';
import { CreateVariantDto } from './create-variant.dto';
import { CreateImageDto } from './create-image.dto';

enum ProductStatus {
  active = 'active',
  inactive = 'inactive',
  draft = 'draft',
}

export class CreateProductDto {
  @ApiProperty({ example: 'Baju Bayi Lucu', minLength: 2 })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name!: string;

  @ApiProperty({ example: 'baju-bayi-lucu' })
  @IsString()
  @IsNotEmpty()
  slug!: string;

  @ApiPropertyOptional({ example: 'Baju bayi bahan katun lembut' })
  @IsString()
  @IsOptional()
  @MaxLength(5000)
  description?: string;

  @ApiProperty({ example: 50000, minimum: 0 })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  basePrice!: number;

  @ApiPropertyOptional({ example: 45000 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  discountPrice?: number;

  @ApiProperty({ example: 200, description: 'Berat dalam gram' })
  @IsNumber()
  @Min(1)
  weight!: number;

  @ApiProperty({ example: 'SKU-001' })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  sku!: string;

  @ApiProperty({ example: 100 })
  @IsNumber()
  @Min(0)
  stock!: number;

  @ApiProperty({ example: 'https://example.com/image.jpg' })
  @IsString()
  mainImage!: string;

  @ApiProperty({ enum: ProductStatus, example: ProductStatus.active })
  @IsEnum(ProductStatus)
  status!: ProductStatus;

  @ApiPropertyOptional({ example: 'cat-uuid-123' })
  @IsString()
  @IsOptional()
  categoryId?: string;

  @ApiPropertyOptional({ type: [CreateImageDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateImageDto)
  images?: CreateImageDto[];

  @ApiPropertyOptional({ type: [CreateVariantDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateVariantDto)
  variants?: CreateVariantDto[];
}