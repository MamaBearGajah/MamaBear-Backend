import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsIn, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class ProductQueryDto {
  @ApiPropertyOptional({ example: 1, default: 1 })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({ example: 20, default: 20 })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  limit?: number = 20;

  @ApiPropertyOptional({ example: 'baju bayi', description: 'Keyword pencarian' })
  @IsString()
  @IsOptional()
  q?: string;

  @ApiPropertyOptional({ example: 'cat-uuid-123' })
  @IsString()
  @IsOptional()
  categoryId?: string;

  @ApiPropertyOptional({ example: 10000 })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  minPrice?: number;

  @ApiPropertyOptional({ example: 100000 })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  maxPrice?: number;

  @ApiPropertyOptional({ example: true, description: 'Filter produk yang stoknya tersedia' })
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  @IsOptional()
  inStock?: boolean;

  // ─── Variant Filters ──────────────────────────────────────────────────────

  @ApiPropertyOptional({
    example: 'Rasa',
    description: 'Nama atribut varian, misal: Rasa, Isi, Ukuran',
  })
  @IsString()
  @IsOptional()
  variantName?: string;

  @ApiPropertyOptional({
    example: 'Cokelat',
    description: 'Nilai varian, misal: Cokelat, Strawberry, 30 kapsul',
  })
  @IsString()
  @IsOptional()
  variantValue?: string;

  // ─── Sorting ──────────────────────────────────────────────────────────────

  @ApiPropertyOptional({ example: 'createdAt', default: 'createdAt' })
  @IsString()
  @IsOptional()
  @IsIn(['createdAt', 'basePrice', 'name', 'avgRating', 'soldCount'])
  sortBy?: string = 'createdAt';

  @ApiPropertyOptional({ enum: ['asc', 'desc'], default: 'desc' })
  @IsString()
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc' = 'desc';
}