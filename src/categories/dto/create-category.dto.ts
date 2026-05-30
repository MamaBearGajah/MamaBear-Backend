import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Baju Bayi' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  // ✅ slug optional — auto-generate dari name jika tidak diisi
  @ApiPropertyOptional({ example: 'baju-bayi', description: 'Jika kosong, otomatis di-generate dari name' })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiPropertyOptional({ example: 'Koleksi baju untuk bayi' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 'https://res.cloudinary.com/djyppabfc/image/upload/mamabear/categories/baju-bayi' })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiPropertyOptional({ example: 'parent-uuid-123', description: 'ID kategori parent (opsional, untuk sub-kategori)' })
  @IsString()
  @IsOptional()
  parentId?: string;

  @ApiPropertyOptional({ example: 1, description: 'Urutan tampil kategori' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  sortOrder?: number;

  @ApiPropertyOptional({ example: true, default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}