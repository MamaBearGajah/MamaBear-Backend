import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class GuestCartProductBriefDto {
  @ApiProperty({ example: 'uuid-here' })
  id!: string;

  @ApiProperty({ example: 'Minyak Telon Plus' })
  name!: string;

  @ApiProperty({ example: 35000 })
  basePrice!: number;

  @ApiPropertyOptional({ example: 'https://res.cloudinary.com/...', nullable: true })
  mainImage!: string | null;
}

export class GuestCartItemDto {
  @ApiProperty({ example: 'uuid-here' })
  id!: string;

  @ApiProperty({ example: 'uuid-here' })
  guestCartId!: string;

  @ApiProperty({ example: 'uuid-here' })
  productId!: string;

  @ApiPropertyOptional({ example: 'uuid-here', nullable: true })
  variantId!: string | null;

  @ApiProperty({ example: 1 })
  quantity!: number;

  @ApiProperty({ example: 35000, description: 'Snapshot price per unit in IDR' })
  price!: number;

  @ApiProperty({ type: GuestCartProductBriefDto })
  product!: GuestCartProductBriefDto;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  createdAt!: Date;
}

export class GuestCartDto {
  @ApiProperty({ example: 'uuid-here' })
  id!: string;

  @ApiProperty({ example: 'sess_abc123' })
  sessionId!: string;

  @ApiProperty({ type: [GuestCartItemDto] })
  items!: GuestCartItemDto[];

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  updatedAt!: Date;
}