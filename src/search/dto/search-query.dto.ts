import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsIn, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class SearchQueryDto {
  @ApiPropertyOptional({ description: 'Kata kunci pencarian' })
  @IsOptional()
  @IsString()
  q?: string;

  @ApiPropertyOptional({ description: 'Harga minimum' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @ApiPropertyOptional({ description: 'Harga maksimum' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxPrice?: number;

  @ApiPropertyOptional({ description: 'Filter berdasarkan kategori (termasuk sub-kategori)' })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiPropertyOptional({ description: 'Hanya tampilkan produk yang ada stok' })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  inStock?: boolean;

  // ─── Variant Filters ──────────────────────────────────────────────────────

  @ApiPropertyOptional({
    description: 'Nama atribut varian, misal: Rasa, Ukuran, Warna',
    example: 'Rasa',
  })
  @IsOptional()
  @IsString()
  variantName?: string;

  @ApiPropertyOptional({
    description: 'Nilai varian, misal: Coklat, Vanilla, L, Merah',
    example: 'Coklat',
  })
  @IsOptional()
  @IsString()
  variantValue?: string;

  // ─── Sorting ──────────────────────────────────────────────────────────────

  @ApiPropertyOptional({
    enum: ['createdAt', 'basePrice', 'price', 'soldCount', 'avgRating', 'name'],
    description: 'Field untuk sorting. Gunakan "price" untuk sort by effective price (discountPrice ?? basePrice)',
    default: 'createdAt',
  })
  @IsOptional()
  @IsIn(['createdAt', 'basePrice', 'price', 'soldCount', 'avgRating', 'name'])
  sortBy?: string;

  @ApiPropertyOptional({ enum: ['asc', 'desc'], default: 'desc' })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';

  // ─── Pagination ───────────────────────────────────────────────────────────

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number;
}