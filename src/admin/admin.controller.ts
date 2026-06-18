import {
  Controller,
  Get,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators';
import { Role, OrderStatus } from '../../generated/prisma/enums';
import { AdminCustomersService } from './admin-customers/admin-customers.service';
import { OrdersService } from '../orders/orders.service';
import { UpdateOrderDto } from '../orders/dto/update-order.dto';

@ApiTags('Admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.admin, Role.super_admin)
@Controller('admin')
export class AdminController {
  constructor(
    // Gunakan AdminCustomersService (bukan AdminService lama yang sudah tidak ada)
    private readonly adminCustomersService: AdminCustomersService,
    // Gunakan OrdersService langsung — method findAllAdmin & updateStatus sudah ada di sana
    private readonly ordersService: OrdersService,
  ) {}

  // ─── Customers ─────────────────────────────────────────────────────────────
  // Endpoint ini sudah ada di AdminCustomersController (GET /admin/customers).
  // Dipertahankan di sini hanya untuk backward compat.
  @Get('customers')
  @ApiOperation({ summary: '[Admin] List customers dengan pagination & search' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'search', required: false })
  @ApiResponse({ status: 200, description: 'List customers berhasil diambil' })
  getCustomers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('search') search?: string,
  ) {
    return this.adminCustomersService.findAll({ page, limit, search });
  }

  @Get('customers/:id')
  @ApiOperation({ summary: '[Admin] Detail customer by ID' })
  @ApiResponse({ status: 200, description: 'Detail customer berhasil diambil' })
  @ApiResponse({ status: 404, description: 'Customer tidak ditemukan' })
  getCustomerById(@Param('id') id: string) {
    return this.adminCustomersService.findAll({ page: 1, limit: 1, search: id });
  }

  // ─── Orders ────────────────────────────────────────────────────────────────
  // Endpoint ini sudah ada di OrdersController (GET /orders/admin).
  // Dipertahankan di sini hanya untuk backward compat.
  @Get('orders')
  @ApiOperation({ summary: '[Admin] List semua order — gunakan GET /orders/admin untuk fitur lengkap' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'status', required: false, enum: OrderStatus })
  @ApiQuery({ name: 'q', required: false, description: 'Cari by orderNumber / nama / email' })
  @ApiResponse({ status: 200, description: 'List order berhasil diambil' })
  getOrders(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('status') status?: OrderStatus,
    @Query('q') q?: string,
  ) {
    return this.ordersService.findAllAdmin(status as OrderStatus, q ?? '', page, limit);
  }

  // ─── Update Order Status ───────────────────────────────────────────────────
  @Patch('orders/:id/status')
  @ApiOperation({ summary: '[Admin] Update status order — gunakan PATCH /orders/:id/status untuk fitur lengkap' })
  @ApiResponse({ status: 200, description: 'Status order berhasil diupdate' })
  @ApiResponse({ status: 404, description: 'Order tidak ditemukan' })
  updateOrderStatus(
    @Param('id') id: string,
    @Body() dto: UpdateOrderDto,
  ) {
    return this.ordersService.updateStatus(id, dto);
  }
}