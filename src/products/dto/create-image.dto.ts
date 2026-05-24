import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateImageDto {
  @ApiProperty({ description: 'Image URL (Cloudinary secure_url)', example: 'https://res.cloudinary.com/...' })
  @IsString()
  imageUrl!: string;

  @ApiPropertyOptional({ description: 'Alt text for accessibility', example: 'Minyak Telon Plus tampak depan' })
  @IsString()
  @IsOptional()
  altText?: string;

  @ApiPropertyOptional({ description: 'Display order (lower = first)', example: 1 })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  sortOrder?: number;

  @ApiPropertyOptional({ description: 'Whether this is the featured/main image', example: false })
  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;
}
