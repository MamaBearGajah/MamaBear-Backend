import { ApiProperty } from '@nestjs/swagger';

export class MediaUploadResponseDto {
  @ApiProperty({ example: 'mamabear/products/minyak-telon-abc123', description: 'Cloudinary public_id used for deletion' })
  publicId!: string;

  @ApiProperty({ example: 'https://res.cloudinary.com/demo/image/upload/v1/mamabear/products/minyak-telon-abc123.jpg' })
  secureUrl!: string;

  @ApiProperty({ example: 'jpg' })
  format!: string;

  @ApiProperty({ example: 800 })
  width!: number;

  @ApiProperty({ example: 800 })
  height!: number;

  @ApiProperty({ example: 54321, description: 'File size in bytes' })
  bytes!: number;
}
