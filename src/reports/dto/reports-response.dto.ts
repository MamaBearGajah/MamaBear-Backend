import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ── Sales Report ──────────────────────────────────────────────────────────────

class SalesPeriodDto {
  @ApiProperty({ example: '2026-05-01', description: 'Label periode: YYYY-MM-DD (day), YYYY-WW (week start), YYYY-MM (month)' })
  period!: string;

  @ApiProperty({ example: 1500000, description: 'Total revenue pada periode ini (IDR)' })
  revenue!: number;

  @ApiProperty({ example: 12, description: 'Jumlah paid order pada periode ini' })
  orders!: number;
}

export class SalesReportResponseDto {
  @ApiProperty({ example: 25000000, description: 'Total revenue dari paid orders (IDR)' })
  totalSales!: number;

  @ApiProperty({ example: 150, description: 'Total jumlah paid orders' })
  orderCount!: number;

  @ApiProperty({ example: 166666, description: 'Rata-rata nilai order (IDR)' })
  avgOrderValue!: number;

  @ApiProperty({ example: 'day', enum: ['day', 'week', 'month'] })
  groupBy!: string;

  @ApiProperty({ type: [SalesPeriodDto], description: 'Breakdown time-series per periode' })
  data!: SalesPeriodDto[];
}

// ── Top Products ──────────────────────────────────────────────────────────────

class TopProductInfoDto {
  @ApiProperty({ example: 'uuid-here' })
  id!: string;

  @ApiProperty({ example: 'MamaBear AlmonMix' })
  name!: string;

  @ApiProperty({ example: 'mamabear-almonmix' })
  slug!: string;

  @ApiPropertyOptional({ example: 'https://res.cloudinary.com/...', nullable: true })
  mainImage!: string | null;

  @ApiProperty({ example: 'ALMN-001' })
  sku!: string;
}

export class TopProductItemDto {
  @ApiPropertyOptional({ type: TopProductInfoDto, nullable: true, description: 'null jika produk sudah dihapus' })
  product!: TopProductInfoDto | null;

  @ApiProperty({ example: 42, description: 'Total unit terjual dari paid orders' })
  totalSold!: number;

  @ApiProperty({ example: 1680000, description: 'Total revenue dari produk ini (IDR)' })
  totalRevenue!: number;
}

// ── Top Categories ────────────────────────────────────────────────────────────

class TopCategoryInfoDto {
  @ApiProperty({ example: 'uuid-here' })
  id!: string;

  @ApiProperty({ example: 'ASI Booster' })
  name!: string;

  @ApiProperty({ example: 'asi-booster' })
  slug!: string;
}

export class TopCategoryItemDto {
  @ApiPropertyOptional({ type: TopCategoryInfoDto, nullable: true, description: 'null jika kategori sudah dihapus' })
  category!: TopCategoryInfoDto | null;

  @ApiProperty({ example: 85, description: 'Total unit terjual di kategori ini' })
  totalSold!: number;

  @ApiProperty({ example: 2975000, description: 'Total revenue dari kategori ini (IDR)' })
  totalRevenue!: number;
}