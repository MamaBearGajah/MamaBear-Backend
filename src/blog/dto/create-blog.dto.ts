import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

enum BlogStatus {
  draft = 'draft',
  published = 'published',
}

export class CreateBlogDto {
  @ApiProperty({ example: 'Tips Menyusui untuk Ibu Baru', minLength: 5, maxLength: 200 })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(200)
  title!: string;

  @ApiProperty({ example: 'tips-menyusui-untuk-ibu-baru' })
  @IsString()
  @IsNotEmpty()
  slug!: string;

  @ApiProperty({ example: 'Menyusui adalah...', minLength: 20 })
  @IsString()
  @IsNotEmpty()
  @MinLength(20)
  content!: string;

  @ApiPropertyOptional({ enum: BlogStatus, example: BlogStatus.draft })
  @IsEnum(BlogStatus)
  @IsOptional()
  status?: BlogStatus;
}