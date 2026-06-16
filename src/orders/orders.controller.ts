import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { GetUser, Public, Roles } from './../auth/decorators';
import { Role, OrderStatus } from '../../generated/prisma/enums';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // ─── Create Order ─────────────────────────────────────────────────────────
  @Post()
  @ApiOperation({ summary: 'Buat order dari cart aktif' })
  @ApiResponse({ status: 201, description: 'Order berhasil dibuat' })
  create(@GetUser('id') userId: string, @Body() dto: CreateOrderDto) {
    return this.ordersService.create(userId, dto);
  }

  // ─── List Order (user) ────────────────────────────────────────────────────
  @Get()
  @ApiOperation({ summary: 'List order milik user yang sedang login' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  findAll(
    @GetUser('id') userId: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.ordersService.findAll(userId, page, limit);
  }

  // ─── List Order Admin ─────────────────────────────────────────────────────
  @Get('admin')
  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @ApiOperation({ summary: '[Admin] List semua order dengan filter & search' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'status', required: false, enum: OrderStatus, description: 'Filter by status' })
  @ApiQuery({ name: 'q', required: false, description: 'Cari by orderNumber, nama, atau email user' })
  @ApiResponse({ status: 200, description: 'List order berhasil diambil' })
  findAllAdmin(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('status') status?: OrderStatus,
    @Query('q') q?: string,
  ) {
    return this.ordersService.findAllAdmin(status as OrderStatus, q ?? '', page, limit);
  }

  // ─── Detail Order Admin ───────────────────────────────────────────────────
  @Get('admin/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @ApiOperation({ summary: '[Admin] Detail order apapun by ID (tanpa cek ownership)' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'Detail order berhasil diambil' })
  @ApiResponse({ status: 404, description: 'Order tidak ditemukan' })
  findOneAdmin(@Param('id') orderId: string) {
    return this.ordersService.findOneAdmin(orderId);
  }

  // ─── Tracking (public) ────────────────────────────────────────────────────
  @Public()
  @Get('track/:orderNumber')
  @ApiOperation({
    summary: 'Lacak status order by order number (public)',
    description: 'Tidak perlu login. Gunakan nomor order, misal: ORB-20260614-0001',
  })
  @ApiParam({ name: 'orderNumber', example: 'ORB-20260614-0001' })
  @ApiResponse({ status: 200, description: 'Status dan riwayat order' })
  @ApiResponse({ status: 404, description: 'Order tidak ditemukan' })
  trackOrder(@Param('orderNumber') orderNumber: string) {
    return this.ordersService.trackOrder(orderNumber);
  }

  // ─── Detail Order (user) ──────────────────────────────────────────────────
  @Get(':id')
  @ApiOperation({ summary: 'Detail order milik user + riwayat status' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'Detail order berhasil diambil' })
  @ApiResponse({ status: 403, description: 'Bukan order milik user ini' })
  @ApiResponse({ status: 404, description: 'Order tidak ditemukan' })
  findOne(@GetUser('id') userId: string, @Param('id') orderId: string) {
    return this.ordersService.findOne(userId, orderId);
  }

  // ─── Update Status (admin) ────────────────────────────────────────────────
  @Patch(':id/status')
  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @ApiOperation({ summary: '[Admin] Update status order' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'Status order berhasil diupdate' })
  updateStatus(@Param('id') orderId: string, @Body() dto: UpdateOrderDto) {
    return this.ordersService.updateStatus(orderId, dto);
  }

  // ─── Cancel Order (user) ──────────────────────────────────────────────────
  @Post(':id/cancel')
  @ApiOperation({
    summary: 'Cancel order',
    description: 'Hanya bisa dalam 30 menit setelah order dibuat. Lewat batas waktu → hubungi CS.',
  })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'Order berhasil dicancel' })
  @ApiResponse({ status: 400, description: 'Order tidak bisa dicancel / batas waktu terlewat' })
  cancel(@GetUser('id') userId: string, @Param('id') orderId: string) {
    return this.ordersService.cancel(userId, orderId);
  }
}