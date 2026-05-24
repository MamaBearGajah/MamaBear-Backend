import { IsString, IsOptional, IsEnum } from 'class-validator';
import { PartialType, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BlogStatus } from '../../../generated/prisma/enums.js';

export class CreateBlogDto {
  @ApiProperty({ description: 'Blog post title', example: 'Tips Merawat Kulit Bayi Sensitif' })
  @IsString()
  title!: string;

  @ApiPropertyOptional({ description: 'URL-friendly slug (auto-generated from title if omitted)', example: 'tips-merawat-kulit-bayi-sensitif' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({ description: 'Blog post content (supports HTML/Markdown)', example: '<p>Kulit bayi sangat sensitif...</p>' })
  @IsString()
  content!: string;

  @ApiPropertyOptional({ description: 'Publication status', enum: BlogStatus, example: BlogStatus.draft })
  @IsOptional()
  @IsEnum(BlogStatus)
  status?: BlogStatus;
}

export class UpdateBlogDto extends PartialType(CreateBlogDto) {}
