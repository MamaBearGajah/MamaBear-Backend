import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty({ example: 'uuid-here' })
  id!: string;

  @ApiPropertyOptional({ example: 'uuid-here', nullable: true, description: 'Parent category ID (null for top-level)' })
  parentId!: string | null;

  @ApiProperty({ example: 'Perawatan Bayi' })
  name!: string;

  @ApiProperty({ example: 'perawatan-bayi' })
  slug!: string;

  @ApiPropertyOptional({ example: 'Produk perawatan untuk bayi baru lahir.', nullable: true })
  description!: string | null;

  @ApiPropertyOptional({ example: 'https://res.cloudinary.com/...', nullable: true })
  imageUrl!: string | null;

  @ApiProperty({ example: 0 })
  sortOrder!: number;

  @ApiProperty({ example: true })
  isActive!: boolean;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  updatedAt!: Date;
}
