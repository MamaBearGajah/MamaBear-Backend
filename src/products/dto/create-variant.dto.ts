import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateVariantDto {
  @ApiProperty({ example: 'Ukuran', description: 'Nama atribut varian, misal: Ukuran, Warna' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'L', description: 'Nilai varian, misal: L, Merah, 500ml' })
  @IsString()
  @IsNotEmpty()
  value!: string;

  @ApiPropertyOptional({ example: 'https://example.com/red.jpg' })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiPropertyOptional({ example: 5000, description: 'Selisih harga dari base price' })
  @IsNumber()
  @IsOptional()
  priceAdjustment?: number;

  @ApiProperty({ example: 50, description: 'Jumlah stok varian ini' })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  stock!: number;

  @ApiPropertyOptional({ example: 'SKU-001-RED' })
  @IsString()
  @IsOptional()
  sku?: string;

  @ApiPropertyOptional({ example: true, default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}