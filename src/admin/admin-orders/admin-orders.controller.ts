import {
  Controller,
  Get,
  Patch,
  Body,
  Param,
  Query,
  Res,
  UseGuards,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import type { Response } from 'express';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators';
import { Role, OrderStatus } from '../../../generated/prisma/enums';
import { OrdersService } from '../../orders/orders.service';
import { UpdateOrderDto } from '../../orders/dto/update-order.dto';
import { UpdateTrackingDto } from '../dto/update-tracking.dto';

@ApiTags('Admin Orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.admin, Role.super_admin)
@Controller('admin/orders')
export class AdminOrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // ─── List semua order ───────────────────────────────────────────────────────
  @Get()
  @ApiOperation({ summary: '[Admin] List semua order dengan filter & pagination' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'status', required: false, enum: OrderStatus })
  @ApiQuery({ name: 'q', required: false, description: 'Cari by orderNumber / nama / email' })
  @ApiResponse({ status: 200, description: 'List order berhasil diambil' })
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('status') status?: OrderStatus,
    @Query('q') q?: string,
  ) {
    return this.ordersService.findAllAdmin(status as OrderStatus, q ?? '', page, limit);
  }

  // ─── Export CSV ─────────────────────────────────────────────────────────────
  @Get('export')
  @ApiOperation({ summary: '[Admin] Export semua order ke CSV' })
  @ApiResponse({ status: 200, description: 'File CSV order' })
  async exportCsv(@Res() res: Response) {
    const csv = await this.ordersService.exportOrdersToCsv();
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=orders_export.csv');
    return res.status(200).send(csv);
  }

  // ─── Update status order ────────────────────────────────────────────────────
  @Patch(':id/status')
  @ApiOperation({ summary: '[Admin] Update status order (termasuk tracking number jika shipped)' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'Status order berhasil diupdate' })
  @ApiResponse({ status: 404, description: 'Order tidak ditemukan' })
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateOrderDto,
  ) {
    return this.ordersService.updateStatus(id, dto);
  }

  // ─── Set tracking number ────────────────────────────────────────────────────
  @Patch(':id/tracking')
  @ApiOperation({ summary: '[Admin] Set tracking number + trigger email notifikasi pengiriman' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'Tracking number berhasil diset' })
  @ApiResponse({ status: 404, description: 'Order tidak ditemukan' })
  updateTracking(
    @Param('id') id: string,
    @Body() dto: UpdateTrackingDto,
  ) {
    // Reuse updateStatus dengan status shipped agar email notif ikut terkirim
    return this.ordersService.updateStatus(id, {
      status: OrderStatus.shipped,
      trackingNumber: dto.trackingNumber,
      note: dto.note,
    });
  }
}