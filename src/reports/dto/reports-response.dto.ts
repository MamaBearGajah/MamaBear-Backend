import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class SalesPeriodDto {
  @ApiProperty({ example: '2026-01-01' })
  period!: string;

  @ApiProperty({ example: 1500000 })
  revenue!: number;

  @ApiProperty({ example: 12 })
  orders!: number;
}

export class SalesReportDto {
  @ApiProperty({ example: 25000000 })
  totalRevenue!: number;

  @ApiProperty({ example: 150 })
  totalOrders!: number;

  @ApiProperty({ example: 'day', enum: ['day', 'week', 'month'] })
  groupBy!: string;

  @ApiProperty({ type: [SalesPeriodDto] })
  data!: SalesPeriodDto[];
}

class TopProductItemDto {
  @ApiPropertyOptional()
  product?: { id: string; name: string; slug: string; mainImage: string | null; sku: string };

  @ApiProperty({ example: 42 })
  totalSold!: number;

  @ApiProperty({ example: 1470000 })
  totalRevenue!: number;
}

export class TopProductsDto {
  @ApiProperty({ type: [TopProductItemDto] })
  data!: TopProductItemDto[];
}

class TopCategoryItemDto {
  @ApiPropertyOptional()
  category?: { id: string; name: string; slug: string };

  @ApiProperty({ example: 85 })
  totalSold!: number;

  @ApiProperty({ example: 2975000 })
  totalRevenue!: number;
}

export class TopCategoriesDto {
  @ApiProperty({ type: [TopCategoryItemDto] })
  data!: TopCategoryItemDto[];
}
