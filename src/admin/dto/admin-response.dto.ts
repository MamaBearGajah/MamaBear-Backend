import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserProfileDto } from '../../users/dto/users-response.dto.js';
import { OrderDto } from '../../orders/dto/order-response.dto.js';

class RecentOrderDto {
  @ApiProperty({ example: 'uuid-here' })
  id!: string;

  @ApiProperty({ example: 'Budi Santoso' })
  userName!: string;

  @ApiProperty({ example: 79000 })
  total!: number;

  @ApiProperty({ example: 'pending' })
  status!: string;

  @ApiProperty({ example: '2026-05-24T12:00:00.000Z' })
  createdAt!: Date;
}

export class DashboardStatsDto {
  @ApiProperty({ example: 1200, description: 'Total registered users' })
  totalUsers!: number;

  @ApiProperty({ example: 85, description: 'Total active products' })
  totalProducts!: number;

  @ApiProperty({ example: 340, description: 'Total orders placed' })
  totalOrders!: number;

  @ApiProperty({ example: 15750000, description: 'Total revenue from paid orders in IDR' })
  totalRevenue!: number;

  @ApiProperty({ type: [RecentOrderDto], description: 'Last 5 orders' })
  recentOrders!: RecentOrderDto[];
}

export class PaginatedUsersDto {
  @ApiProperty({ type: [UserProfileDto] })
  data!: UserProfileDto[];

  @ApiProperty({ example: 1200 })
  total!: number;

  @ApiProperty({ example: 1 })
  page!: number;

  @ApiProperty({ example: 20 })
  limit!: number;

  @ApiProperty({ example: 60 })
  totalPages!: number;
}

export class PaginatedOrdersDto {
  @ApiProperty({ type: [OrderDto] })
  data!: OrderDto[];

  @ApiProperty({ example: 340 })
  total!: number;

  @ApiProperty({ example: 1 })
  page!: number;

  @ApiProperty({ example: 20 })
  limit!: number;

  @ApiProperty({ example: 17 })
  totalPages!: number;
}
