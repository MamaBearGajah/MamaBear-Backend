import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export enum ImageType {
  main = 'main',
  nutrition = 'nutrition',
  ingredients = 'ingredients',
  usage = 'usage',
  other = 'other',
}

export class CreateImageDto {
  @ApiProperty({ example: 'https://example.com/image.jpg' })
  @IsString()
  imageUrl!: string;

  @ApiProperty({ enum: ImageType, example: ImageType.main, description: 'Tipe gambar produk' })
  @IsEnum(ImageType)
  imageType!: ImageType;

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