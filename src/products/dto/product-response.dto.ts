import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProductImageDto {
  @ApiProperty({ example: 'uuid-here' })
  id!: string;

  @ApiProperty({ example: 'uuid-here' })
  productId!: string;

  @ApiProperty({ example: 'https://res.cloudinary.com/example/image/upload/v1/mamabear/product.jpg' })
  imageUrl!: string;

  @ApiPropertyOptional({ example: 'Minyak Telon Plus tampak depan', nullable: true })
  altText!: string | null;

  @ApiProperty({ example: 0 })
  sortOrder!: number;

  @ApiProperty({ example: false })
  isFeatured!: boolean;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  createdAt!: Date;
}

export class ProductVariantDto {
  @ApiProperty({ example: 'uuid-here' })
  id!: string;

  @ApiProperty({ example: 'uuid-here' })
  productId!: string;

  @ApiProperty({ example: 'Ukuran' })
  name!: string;

  @ApiProperty({ example: '100ml' })
  value!: string;

  @ApiPropertyOptional({ example: 'https://res.cloudinary.com/...', nullable: true })
  imageUrl!: string | null;

  @ApiProperty({ example: 5000, description: 'Price adjustment in IDR relative to base price (can be negative)' })
  priceAdjustment!: number;

  @ApiProperty({ example: 50 })
  stock!: number;

  @ApiPropertyOptional({ example: 'MTL-001-100ML', nullable: true })
  sku!: string | null;

  @ApiProperty({ example: true })
  isActive!: boolean;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  updatedAt!: Date;
}

export class CategoryBriefDto {
  @ApiProperty({ example: 'uuid-here' })
  id!: string;

  @ApiProperty({ example: 'Perawatan Bayi' })
  name!: string;

  @ApiProperty({ example: 'perawatan-bayi' })
  slug!: string;
}

export class ProductDto {
  @ApiProperty({ example: 'uuid-here' })
  id!: string;

  @ApiPropertyOptional({ example: 'uuid-here', nullable: true })
  categoryId!: string | null;

  @ApiProperty({ example: 'Minyak Telon Plus' })
  name!: string;

  @ApiProperty({ example: 'minyak-telon-plus' })
  slug!: string;

  @ApiPropertyOptional({ example: 'Minyak telon dengan kandungan eucalyptus alami.', nullable: true })
  description!: string | null;

  @ApiProperty({ example: 35000, description: 'Base price in IDR' })
  basePrice!: number;

  @ApiPropertyOptional({ example: 29000, nullable: true, description: 'Discounted price in IDR' })
  discountPrice!: number | null;

  @ApiProperty({ example: 150, description: 'Weight in grams' })
  weight!: number;

  @ApiProperty({ example: 'MTL-001' })
  sku!: string;

  @ApiProperty({ example: 100 })
  stock!: number;

  @ApiPropertyOptional({ example: 'https://res.cloudinary.com/...', nullable: true })
  mainImage!: string | null;

  @ApiProperty({ example: 'active', enum: ['active', 'inactive', 'draft'] })
  status!: string;

  @ApiPropertyOptional({ type: CategoryBriefDto, nullable: true })
  category!: CategoryBriefDto | null;

  @ApiProperty({ type: [ProductImageDto] })
  images!: ProductImageDto[];

  @ApiProperty({ type: [ProductVariantDto] })
  variants!: ProductVariantDto[];

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  updatedAt!: Date;
}

export class PaginatedProductsDto {
  @ApiProperty({ type: [ProductDto] })
  data!: ProductDto[];

  @ApiProperty({ example: 100, description: 'Total number of matching products' })
  total!: number;

  @ApiProperty({ example: 1 })
  page!: number;

  @ApiProperty({ example: 20 })
  limit!: number;

  @ApiProperty({ example: 5 })
  totalPages!: number;
}

class ReviewUserDto {
  @ApiProperty({ example: 'uuid-here' })
  id!: string;

  @ApiProperty({ example: 'Budi Santoso' })
  name!: string;
}

export class ProductReviewDto {
  @ApiProperty({ example: 'uuid-here' })
  id!: string;

  @ApiProperty({ example: 'uuid-here' })
  productId!: string;

  @ApiProperty({ example: 'uuid-here' })
  userId!: string;

  @ApiProperty({ example: 5 })
  rating!: number;

  @ApiPropertyOptional({ example: 'Great product!', nullable: true })
  review!: string | null;

  @ApiProperty({ example: true })
  isVerifiedPurchase!: boolean;

  @ApiProperty({ example: 3 })
  helpfulCount!: number;

  @ApiPropertyOptional({ example: true, nullable: true, description: "Current user's helpful vote" })
  userVote!: boolean | null;

  @ApiProperty({ type: ReviewUserDto })
  user!: ReviewUserDto;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  updatedAt!: Date;
}

export class PaginatedReviewsDto {
  @ApiProperty({ type: [ProductReviewDto] })
  data!: ProductReviewDto[];

  @ApiProperty({ example: 50 })
  total!: number;

  @ApiProperty({ example: 1 })
  page!: number;

  @ApiProperty({ example: 10 })
  limit!: number;

  @ApiProperty({ example: 5 })
  totalPages!: number;
}

class RatingBreakdownDto {
  @ApiProperty({ example: 10, description: '5-star count' })
  5!: number;

  @ApiProperty({ example: 8, description: '4-star count' })
  4!: number;

  @ApiProperty({ example: 3, description: '3-star count' })
  3!: number;

  @ApiProperty({ example: 2, description: '2-star count' })
  2!: number;

  @ApiProperty({ example: 1, description: '1-star count' })
  1!: number;
}

export class RatingSummaryDto {
  @ApiProperty({ example: 4.5, description: 'Average rating' })
  avgRating!: number;

  @ApiProperty({ example: 24, description: 'Total number of ratings' })
  ratingCount!: number;

  @ApiProperty({ type: RatingBreakdownDto })
  breakdown!: Record<number, number>;
}
