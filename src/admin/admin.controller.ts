import {
  Controller, Get, Post, Patch, Delete, Body, Param, Query, HttpCode, HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiProperty,
} from '@nestjs/swagger';
import { AdminService } from './admin.service.js';
import { CategoriesService } from '../categories/categories.service.js';
import { Roles } from '../auth/decorators/index.js';
import { Role, OrderStatus } from '../../generated/prisma/enums.js';
import { IsString } from 'class-validator';
import { BadRequestResponseDto, ForbiddenResponseDto, MessageResponseDto, NotFoundResponseDto, UnauthorizedResponseDto } from '../common/dto/response.dto.js';
import { DashboardStatsDto, PaginatedOrdersDto, PaginatedUsersDto } from './dto/admin-response.dto.js';
import { UserProfileDto } from '../users/dto/users-response.dto.js';
import { OrderDto } from '../orders/dto/order-response.dto.js';

class UpdateRoleDto {
  @ApiProperty({ description: 'New role to assign to the user', example: 'admin', enum: ['customer', 'admin', 'super_admin'] })
  @IsString()
  role!: string;
}

class UpdateTrackingDto {
  @ApiProperty({ description: 'Tracking number from the courier', example: 'JNE123456789' })
  @IsString()
  trackingNumber!: string;
}

class UpdateOrderStatusDto {
  @ApiProperty({ description: 'New order status', enum: OrderStatus, example: OrderStatus.shipped })
  @IsString()
  status!: OrderStatus;
}

@ApiTags('Admin')
@ApiBearerAuth('access-token')
@Roles(Role.admin, Role.super_admin)
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly categoriesService: CategoriesService,
  ) {}

  @Get('dashboard')
  @ApiOkResponse({ description: 'Returns dashboard statistics: total users, products, orders, revenue, and recent orders.', type: DashboardStatsDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'Requires admin role.', type: ForbiddenResponseDto })
  getDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  @Get('users')
  @ApiOkResponse({ description: 'Returns a paginated list of all users.', type: PaginatedUsersDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'Requires admin role.', type: ForbiddenResponseDto })
  getUsers(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.adminService.getUsers(page ? Number(page) : undefined, limit ? Number(limit) : undefined);
  }

  @Get('users/:id')
  @ApiOkResponse({ description: 'Returns a user by ID.', type: UserProfileDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'Requires admin role.', type: ForbiddenResponseDto })
  @ApiNotFoundResponse({ description: 'User not found.', type: NotFoundResponseDto })
  getUserById(@Param('id') id: string) {
    return this.adminService.getUserById(id);
  }

  @Patch('users/:id/role')
  @ApiOkResponse({ description: 'User role updated successfully.', type: UserProfileDto })
  @ApiBadRequestResponse({ description: 'Invalid role value.', type: BadRequestResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'Requires admin role.', type: ForbiddenResponseDto })
  @ApiNotFoundResponse({ description: 'User not found.', type: NotFoundResponseDto })
  updateUserRole(@Param('id') id: string, @Body() dto: UpdateRoleDto) {
    return this.adminService.updateUserRole(id, dto.role);
  }

  @Delete('users/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'User deleted successfully.', type: MessageResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'Requires admin role.', type: ForbiddenResponseDto })
  @ApiNotFoundResponse({ description: 'User not found.', type: NotFoundResponseDto })
  deleteUser(@Param('id') id: string) {
    return this.adminService.deleteUser(id);
  }

  @Get('orders')
  @ApiOkResponse({ description: 'Returns a paginated list of all orders, optionally filtered by status.', type: PaginatedOrdersDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'Requires admin role.', type: ForbiddenResponseDto })
  getAllOrders(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('status') status?: OrderStatus,
  ) {
    return this.adminService.getAllOrders(
      page ? Number(page) : undefined,
      limit ? Number(limit) : undefined,
      status,
    );
  }

  @Patch('orders/:id/status')
  @ApiOkResponse({ description: 'Order status updated successfully.', type: OrderDto })
  @ApiBadRequestResponse({ description: 'Invalid status value.', type: BadRequestResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'Requires admin role.', type: ForbiddenResponseDto })
  @ApiNotFoundResponse({ description: 'Order not found.', type: NotFoundResponseDto })
  updateOrderStatus(@Param('id') id: string, @Body() dto: UpdateOrderStatusDto) {
    return this.adminService.updateOrderStatus(id, dto.status);
  }

  @Patch('orders/:id/tracking')
  @ApiOkResponse({ description: 'Tracking number updated successfully.', type: OrderDto })
  @ApiBadRequestResponse({ description: 'Invalid tracking number.', type: BadRequestResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'Requires admin role.', type: ForbiddenResponseDto })
  @ApiNotFoundResponse({ description: 'Order not found.', type: NotFoundResponseDto })
  updateTrackingNumber(@Param('id') id: string, @Body() dto: UpdateTrackingDto) {
    return this.adminService.updateTrackingNumber(id, dto.trackingNumber);
  }

  @Get('orders/:id')
  @ApiOkResponse({ description: 'Returns a single order by ID with full details.', type: OrderDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'Requires admin role.', type: ForbiddenResponseDto })
  @ApiNotFoundResponse({ description: 'Order not found.', type: NotFoundResponseDto })
  getOrderById(@Param('id') id: string) {
    return this.adminService.getOrderById(id);
  }

  @Get('customers')
  @ApiOkResponse({ description: 'Returns paginated customer list.', type: PaginatedUsersDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'Requires admin role.', type: ForbiddenResponseDto })
  getCustomers(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('q') q?: string,
  ) {
    return this.adminService.getCustomers(page ? Number(page) : undefined, limit ? Number(limit) : undefined, q);
  }

  @Get('customers/:id')
  @ApiOkResponse({ description: 'Returns customer detail.', type: UserProfileDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'Requires admin role.', type: ForbiddenResponseDto })
  @ApiNotFoundResponse({ description: 'Customer not found.', type: NotFoundResponseDto })
  getCustomerById(@Param('id') id: string) {
    return this.adminService.getCustomerById(id);
  }

  @Post('products/bulk')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Bulk action completed.' })
  @ApiBadRequestResponse({ description: 'Invalid action.', type: BadRequestResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'Requires admin role.', type: ForbiddenResponseDto })
  bulkProducts(@Body() body: { ids: string[]; action: string; data?: { status?: string } }) {
    return this.adminService.bulkProducts(body.ids, body.action, body.data);
  }

  @Post('categories/reorder')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Categories reordered.', type: MessageResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'Requires admin role.', type: ForbiddenResponseDto })
  reorderCategories(@Body() body: { orders: { id: string; sortOrder: number }[] }) {
    return this.categoriesService.reorder(body.orders);
  }
}
