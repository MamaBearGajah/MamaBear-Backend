import { ApiProperty } from '@nestjs/swagger';

class SearchProductDto {
  @ApiProperty({ example: 'uuid-here' })
  id!: string;

  @ApiProperty({ example: 'Minyak Telon Plus' })
  name!: string;

  @ApiProperty({ example: 'minyak-telon-plus' })
  slug!: string;

  @ApiProperty({ example: 35000 })
  basePrice!: number;

  @ApiProperty({ example: 'https://res.cloudinary.com/...', nullable: true })
  mainImage!: string | null;
}

class SearchCategoryDto {
  @ApiProperty({ example: 'uuid-here' })
  id!: string;

  @ApiProperty({ example: 'Perawatan Bayi' })
  name!: string;

  @ApiProperty({ example: 'perawatan-bayi' })
  slug!: string;
}

class SearchBlogPostDto {
  @ApiProperty({ example: 'uuid-here' })
  id!: string;

  @ApiProperty({ example: 'Tips Merawat Kulit Bayi Sensitif' })
  title!: string;

  @ApiProperty({ example: 'tips-merawat-kulit-bayi-sensitif' })
  slug!: string;
}

export class SearchResponseDto {
  @ApiProperty({ type: [SearchProductDto] })
  products!: SearchProductDto[];

  @ApiProperty({ type: [SearchCategoryDto] })
  categories!: SearchCategoryDto[];

  @ApiProperty({ type: [SearchBlogPostDto] })
  blogPosts!: SearchBlogPostDto[];
}

export class SearchSuggestionsResponseDto {
  @ApiProperty({ type: [String], example: ['minyak telon', 'minyak telon plus', 'minyak kelapa'] })
  suggestions!: string[];
}
