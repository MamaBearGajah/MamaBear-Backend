import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { Roles } from '../auth/decorators';
import { Role } from '../../generated/prisma/enums';
import { ReportsService } from './reports.service';
import {
  SalesReportResponseDto,
  TopProductItemDto,
  TopCategoryItemDto,
} from './dto/reports-response.dto';
import { SalesQueryDto } from './dto/reports-query.dto';

@ApiTags('Reports')
@ApiBearerAuth()
@Roles(Role.admin, Role.super_admin)
@Throttle({ default: { limit: 120, ttl: 60000 } })
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('sales')
  @ApiOperation({
    summary: 'Laporan penjualan (paid orders only)',
    description:
      'Hanya menghitung order dengan paymentStatus === "paid". ' +
      'Mengembalikan totalSales, orderCount, avgOrderValue, dan breakdown time-series.',
  })
  @ApiQuery({ name: 'startDate', required: false, example: '2026-01-01', description: 'Awal range tanggal (ISO date string)' })
  @ApiQuery({ name: 'endDate', required: false, example: '2026-12-31', description: 'Akhir range tanggal (ISO date string)' })
  @ApiQuery({ name: 'groupBy', required: false, enum: ['day', 'week', 'month'], description: 'Granularitas time-series (default: day)' })
  @ApiResponse({ status: 200, description: 'Laporan penjualan berhasil diambil', type: SalesReportResponseDto })
  @ApiResponse({ status: 401, description: 'Tidak terautentikasi' })
  @ApiResponse({ status: 403, description: 'Akses ditolak — butuh role admin/super_admin' })
  getSalesReport(@Query() query: SalesQueryDto) {
    return this.reportsService.getSalesReport(query);
  }

  @Get('top-products')
  @ApiOperation({
    summary: 'Top produk terlaris (paid orders only)',
    description:
      'Group by productId, sum quantity + revenue dari order dengan paymentStatus === "paid". ' +
      'Default top 10.',
  })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10, description: 'Jumlah produk yang ditampilkan (default: 10)' })
  @ApiQuery({ name: 'startDate', required: false, example: '2026-01-01' })
  @ApiQuery({ name: 'endDate', required: false, example: '2026-12-31' })
  @ApiResponse({ status: 200, description: 'Top produk berhasil diambil', type: [TopProductItemDto] })
  @ApiResponse({ status: 401, description: 'Tidak terautentikasi' })
  @ApiResponse({ status: 403, description: 'Akses ditolak' })
  getTopProducts(
    @Query('limit') limit?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.reportsService.getTopProducts({
      limit: limit ? Number(limit) : undefined,
      startDate,
      endDate,
    });
  }

  @Get('top-categories')
  @ApiOperation({
    summary: 'Top kategori berdasarkan revenue (paid orders only)',
    description:
      'Join: orderItems → products → categories. ' +
      'Sum revenue per kategori dari order dengan paymentStatus === "paid".',
  })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10, description: 'Jumlah kategori yang ditampilkan (default: 10)' })
  @ApiQuery({ name: 'startDate', required: false, example: '2026-01-01' })
  @ApiQuery({ name: 'endDate', required: false, example: '2026-12-31' })
  @ApiResponse({ status: 200, description: 'Top kategori berhasil diambil', type: [TopCategoryItemDto] })
  @ApiResponse({ status: 401, description: 'Tidak terautentikasi' })
  @ApiResponse({ status: 403, description: 'Akses ditolak' })
  getTopCategories(
    @Query('limit') limit?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.reportsService.getTopCategories({
      limit: limit ? Number(limit) : undefined,
      startDate,
      endDate,
    });
  }
}