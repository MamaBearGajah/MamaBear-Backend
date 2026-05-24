import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class OrderAddressBriefDto {
  @ApiProperty({ example: 'uuid-here' })
  id!: string;

  @ApiPropertyOptional({ example: 'Rumah', nullable: true })
  label!: string | null;

  @ApiProperty({ example: 'Budi Santoso' })
  receiverName!: string;

  @ApiProperty({ example: '081234567890' })
  phone!: string;

  @ApiProperty({ example: 'Jl. Sudirman No. 1' })
  address!: string;

  @ApiProperty({ example: 'Jakarta Selatan' })
  cityId!: string;

  @ApiProperty({ example: 'DKI Jakarta' })
  provinceId!: string;

  @ApiProperty({ example: '12190' })
  postalCode!: string;
}

class OrderProductBriefDto {
  @ApiProperty({ example: 'uuid-here' })
  id!: string;

  @ApiProperty({ example: 'Minyak Telon Plus' })
  name!: string;

  @ApiPropertyOptional({ example: 'https://res.cloudinary.com/...', nullable: true })
  mainImage!: string | null;
}

export class OrderItemDto {
  @ApiProperty({ example: 'uuid-here' })
  id!: string;

  @ApiProperty({ example: 'uuid-here' })
  productId!: string;

  @ApiPropertyOptional({ example: 'uuid-here', nullable: true })
  variantId!: string | null;

  @ApiProperty({ example: 2 })
  quantity!: number;

  @ApiProperty({ example: 35000, description: 'Unit price at time of order in IDR' })
  price!: number;

  @ApiProperty({ type: OrderProductBriefDto })
  product!: OrderProductBriefDto;
}

export class OrderDto {
  @ApiProperty({ example: 'uuid-here' })
  id!: string;

  @ApiProperty({ example: 'uuid-here' })
  userId!: string;

  @ApiProperty({ example: 'uuid-here' })
  addressId!: string;

  @ApiProperty({ example: 'pending', enum: ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'] })
  status!: string;

  @ApiProperty({ example: 'pending', enum: ['pending', 'paid', 'failed', 'expired', 'refunded'] })
  paymentStatus!: string;

  @ApiProperty({ example: 70000, description: 'Order total in IDR (items + shipping)' })
  total!: number;

  @ApiProperty({ example: 9000, description: 'Shipping cost in IDR' })
  shippingCost!: number;

  @ApiProperty({ example: 'jne' })
  courier!: string;

  @ApiProperty({ example: 'REG' })
  service!: string;

  @ApiPropertyOptional({ example: 'JNE12345678', nullable: true })
  trackingNumber!: string | null;

  @ApiPropertyOptional({ example: 'Tolong dibungkus rapi.', nullable: true })
  notes!: string | null;

  @ApiProperty({ type: [OrderItemDto] })
  items!: OrderItemDto[];

  @ApiProperty({ type: OrderAddressBriefDto })
  address!: OrderAddressBriefDto;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  updatedAt!: Date;
}
