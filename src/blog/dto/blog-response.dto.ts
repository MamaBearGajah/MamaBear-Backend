import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BlogPostDto {
  @ApiProperty({ example: 'uuid-here' })
  id!: string;

  @ApiProperty({ example: 'Tips Merawat Kulit Bayi Sensitif' })
  title!: string;

  @ApiProperty({ example: 'tips-merawat-kulit-bayi-sensitif' })
  slug!: string;

  @ApiProperty({ example: '<p>Kulit bayi sangat sensitif dan memerlukan perawatan khusus...</p>' })
  content!: string;

  @ApiProperty({ example: 'published', enum: ['draft', 'published'] })
  status!: string;

  @ApiPropertyOptional({ example: '2026-01-01T00:00:00.000Z', nullable: true })
  publishedAt!: Date | null;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  updatedAt!: Date;
}
