import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateImageDto {
  @ApiProperty({ example: 'https://example.com/image.jpg' })
  @IsString()
  imageUrl!: string;

  @ApiPropertyOptional({ example: 'Foto produk tampak depan' })
  @IsString()
  @IsOptional()
  altText?: string;

  @ApiPropertyOptional({ example: 1, description: 'Urutan tampil gambar' })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  sortOrder?: number;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;
}