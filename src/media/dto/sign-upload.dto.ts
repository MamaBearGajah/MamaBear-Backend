import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SignUploadDto {
  @ApiProperty({ example: 'products', description: 'Cloudinary folder tujuan upload' })
  @IsString()
  @IsNotEmpty()
  folder!: string;

  // ✅ fileName dan fileType optional — tidak dipakai di service tapi bisa untuk validasi client-side
  @ApiPropertyOptional({ example: 'image.jpg' })
  @IsString()
  @IsOptional()
  fileName?: string;

  @ApiPropertyOptional({ example: 'image/jpeg', enum: ['image/jpeg', 'image/png', 'image/webp'] })
  @IsString()
  @IsIn(['image/jpeg', 'image/png', 'image/webp'])
  @IsOptional()
  fileType?: string;
}