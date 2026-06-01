import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class CartProductBriefDto {
  @ApiProperty({ example: 'uuid-here' })
  id!: string;

  @ApiProperty({ example: 'Minyak Telon Plus' })
  name!: string;

  @ApiProperty({ example: 'minyak-telon-plus' })
  slug!: string;

  @ApiProperty({ example: 35000 })
  basePrice!: number;

  @ApiPropertyOptional({ example: 'https://res.cloudinary.com/...', nullable: true })
  mainImage!: string | null;
}

class CartVariantBriefDto {
  @ApiProperty({ example: 'uuid-here' })
  id!: string;

  @ApiProperty({ example: 'Ukuran' })
  name!: string;

  @ApiProperty({ example: '100ml' })
  value!: string;

  @ApiProperty({ example: 5000 })
  priceAdjustment!: number;
}

export class CartItemDto {
  @ApiProperty({ example: 'uuid-here' })
  id!: string;

  @ApiProperty({ example: 'uuid-here' })
  cartId!: string;

  @ApiProperty({ example: 'uuid-here' })
  productId!: string;

  @ApiPropertyOptional({ example: 'uuid-here', nullable: true })
  variantId!: string | null;

  @ApiProperty({ example: 2 })
  quantity!: number;

  @ApiProperty({ example: 35000, description: 'Snapshot price per unit in IDR at time of adding' })
  price!: number;

  @ApiProperty({ type: CartProductBriefDto })
  product!: CartProductBriefDto;

  @ApiPropertyOptional({ type: CartVariantBriefDto, nullable: true })
  variant!: CartVariantBriefDto | null;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  createdAt!: Date;
}

export class CartDto {
  @ApiProperty({ example: 'uuid-here' })
  id!: string;

  @ApiProperty({ example: 'uuid-here' })
  userId!: string;

  @ApiProperty({ type: [CartItemDto] })
  items!: CartItemDto[];

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  updatedAt!: Date;
}