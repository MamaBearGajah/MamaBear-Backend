import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserProfileDto {
  @ApiProperty({ example: 'uuid-here' })
  id!: string;

  @ApiProperty({ example: 'Budi Santoso' })
  name!: string;

  @ApiProperty({ example: 'budi@example.com' })
  email!: string;

  @ApiPropertyOptional({ example: '081234567890', nullable: true })
  phone!: string | null;

  @ApiProperty({ example: 'customer', enum: ['customer', 'admin', 'super_admin'] })
  role!: string;

  @ApiProperty({ example: true })
  isVerified!: boolean;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  updatedAt!: Date;
}

export class AddressDto {
  @ApiProperty({ example: 'uuid-here' })
  id!: string;

  @ApiProperty({ example: 'uuid-here' })
  userId!: string;

  @ApiPropertyOptional({ example: 'Rumah', nullable: true })
  label!: string | null;

  @ApiProperty({ example: 'Budi Santoso' })
  receiverName!: string;

  @ApiProperty({ example: '081234567890' })
  phone!: string;

  @ApiProperty({ example: 'Jl. Sudirman No. 1' })
  address!: string;

  @ApiProperty({ example: '501' })
  cityId!: string;

  @ApiProperty({ example: '9' })
  provinceId!: string;

  @ApiProperty({ example: '12190' })
  postalCode!: string;

  @ApiProperty({ example: false })
  isDefault!: boolean;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  updatedAt!: Date;
}

export class OrderItemSummaryDto {
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
}

export class OrderSummaryDto {
  @ApiProperty({ example: 'uuid-here' })
  id!: string;

  @ApiProperty({ example: 'pending', enum: ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'] })
  status!: string;

  @ApiProperty({ example: 'pending', enum: ['pending', 'paid', 'failed', 'expired', 'refunded'] })
  paymentStatus!: string;

  @ApiProperty({ example: 70000, description: 'Order total in IDR' })
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

  @ApiProperty({ type: [OrderItemSummaryDto] })
  items!: OrderItemSummaryDto[];

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  updatedAt!: Date;
}
