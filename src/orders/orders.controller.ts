import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, UseGuards, DefaultValuePipe, ParseIntPipe, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { GetUser } from './../auth/decorators';
import { Roles } from '../auth/decorators';
import { Role } from '../../generated/prisma/enums';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Buat order dari cart aktif' })
  @ApiResponse({ status: 201, description: 'Order berhasil dibuat' })
  @ApiResponse({ status: 400, description: 'Cart kosong atau stok tidak cukup' })
  @ApiResponse({ status: 404, description: 'Alamat tidak ditemukan' })
  create(@GetUser('id') userId: string, @Body() dto: CreateOrderDto) {
    return this.ordersService.create(userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List order milik User' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiResponse({ status: 200, description: 'List order berhasil diambil' })
  findAll(
    @GetUser('id') userId: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.ordersService.findAll(userId, page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detail order beserta items, address, dan payment' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'Detail order berhasil diambil' })
  @ApiResponse({ status: 403, description: 'Akses ditolak' })
  @ApiResponse({ status: 404, description: 'Order tidak ditemukan' })
  findOne(@GetUser('id') userId: string, @Param('id') orderId: string) {
    return this.ordersService.findOne(userId, orderId);
  }

  @Patch(':id/status')
  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @ApiOperation({ summary: 'Update status order (admin)' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'Status berhasil diupdate' })
  @ApiResponse({ status: 404, description: 'Order tidak ditemukan' })
  updateStatus(@Param('id') orderId: string, @Body() dto: UpdateOrderDto) {
    return this.ordersService.updateStatus(orderId, dto);
  }

  @Post(':id/cancel')
  @ApiOperation({ summary: 'Cancel order (hanya jika status pending)' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'Order berhasil dicancel' })
  @ApiResponse({ status: 400, description: 'Order tidak bisa dicancel' })
  @ApiResponse({ status: 403, description: 'Akses ditolak' })
  @ApiResponse({ status: 404, description: 'Order tidak ditemukan' })
  cancel(@GetUser('id') userId: string, @Param('id') orderId: string) {
    return this.ordersService.cancel(userId, orderId);
  }
}