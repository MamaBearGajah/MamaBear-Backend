import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString, IsNotEmpty, IsOptional, IsBoolean, IsInt,
  IsNumber, IsArray, ValidateNested, IsUUID, Min, IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class BundleItemDto {
  @ApiProperty({ example: 'uuid-product-id' })
  @IsUUID()
  productId!: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  quantity!: number;
}

export class CreateBundleDto {
  @ApiProperty({ example: 'Hampers Spesial Lebaran MamaBear' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'hampers-spesial-lebaran-mamabear' })
  @IsString()
  @IsNotEmpty()
  slug!: string;

  @ApiPropertyOptional({ example: 'Paket lengkap untuk ibu menyusui' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'https://res.cloudinary.com/.../hampers.jpg' })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  publicId?: string;

  @ApiProperty({ example: 250000, description: 'Harga bundle (lebih murah dari total satuan)' })
  @IsNumber()
  @Min(0)
  bundlePrice!: number;

  @ApiPropertyOptional({ example: 199000 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  discountPrice?: number;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  stock?: number;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiProperty({ type: [BundleItemDto], description: 'Produk yang masuk ke bundle' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BundleItemDto)
  items!: BundleItemDto[];
}