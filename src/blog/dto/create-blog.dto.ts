import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString, IsNotEmpty, IsOptional, IsEnum, IsUrl,
} from 'class-validator';
import { BlogStatus } from '../../../generated/prisma/enums';

export class CreateBlogDto {
  @ApiProperty({ example: 'Cara Meningkatkan Produksi ASI dengan Alami' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: 'cara-meningkatkan-produksi-asi-dengan-alami' })
  @IsString()
  @IsNotEmpty()
  slug!: string;

  @ApiPropertyOptional({ example: 'Pelajari cara alami meningkatkan produksi ASI untuk ibu menyusui.' })
  @IsOptional()
  @IsString()
  excerpt?: string;

  @ApiPropertyOptional({ example: 'https://res.cloudinary.com/.../blog-cover.jpg' })
  @IsOptional()
  @IsString()
  @IsUrl()
  coverImage?: string;

  @ApiPropertyOptional({ description: 'Cloudinary public_id untuk delete gambar cover' })
  @IsOptional()
  @IsString()
  coverPublicId?: string;

  @ApiProperty({ example: '<p>Isi artikel dalam HTML atau Markdown...</p>' })
  @IsString()
  @IsNotEmpty()
  content!: string;

  @ApiPropertyOptional({ enum: BlogStatus, default: BlogStatus.draft })
  @IsOptional()
  @IsEnum(BlogStatus)
  status?: BlogStatus;
}