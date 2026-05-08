import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateVariantDto {
  @ApiProperty({ example: 'Warna' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 'Merah' })
  @IsString()
  value!: string;

  @ApiPropertyOptional({ example: 'https://example.com/red.jpg' })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiPropertyOptional({ example: 5000, description: 'Selisih harga dari base price' })
  @IsNumber()
  @IsOptional()
  priceAdjustment?: number;

  @ApiProperty({ example: 10, minimum: 0 })
  @IsNumber()
  @Min(0)
  stock!: number;

  @ApiPropertyOptional({ example: 'SKU-001-RED' })
  @IsString()
  @IsOptional()
  sku?: string;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}