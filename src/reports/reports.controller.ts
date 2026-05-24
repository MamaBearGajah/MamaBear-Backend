import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { ReportsService } from './reports.service.js';
import { Roles } from '../auth/decorators/index.js';
import { Role } from '../../generated/prisma/enums.js';
import { UnauthorizedResponseDto, ForbiddenResponseDto } from '../common/dto/response.dto.js';
import { SalesReportDto } from './dto/reports-response.dto.js';

@ApiTags('Reports')
@ApiBearerAuth('access-token')
@Roles(Role.admin, Role.super_admin)
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('sales')
  @ApiOkResponse({ description: 'Returns sales report grouped by day/week/month.', type: SalesReportDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'Requires admin role.', type: ForbiddenResponseDto })
  @ApiQuery({ name: 'startDate', required: false, example: '2026-01-01' })
  @ApiQuery({ name: 'endDate', required: false, example: '2026-12-31' })
  @ApiQuery({ name: 'groupBy', required: false, enum: ['day', 'week', 'month'] })
  getSalesReport(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('groupBy') groupBy?: 'day' | 'week' | 'month',
  ) {
    return this.reportsService.getSalesReport(startDate, endDate, groupBy);
  }

  @Get('top-products')
  @ApiOkResponse({ description: 'Returns top selling products by quantity sold.' })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'Requires admin role.', type: ForbiddenResponseDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'startDate', required: false, example: '2026-01-01' })
  @ApiQuery({ name: 'endDate', required: false, example: '2026-12-31' })
  getTopProducts(
    @Query('limit') limit?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.reportsService.getTopProducts(limit ? Number(limit) : undefined, startDate, endDate);
  }

  @Get('top-categories')
  @ApiOkResponse({ description: 'Returns top categories by quantity sold.' })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'Requires admin role.', type: ForbiddenResponseDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'startDate', required: false, example: '2026-01-01' })
  @ApiQuery({ name: 'endDate', required: false, example: '2026-12-31' })
  getTopCategories(
    @Query('limit') limit?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.reportsService.getTopCategories(limit ? Number(limit) : undefined, startDate, endDate);
  }
}
