import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, DefaultValuePipe, ParseIntPipe, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@CurrentUser('id') userId: string, @Body() dto: CreateOrderDto) {
    return this.ordersService.create(userId, dto)
  }

  @Get()
  findAll(
    @CurrentUser('id') userId: string, 
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number) {
      return this.ordersService.findAll(userId, page, limit)
    }

  @Get(':id')
  findOne(@CurrentUser('id') userId: string, @Param('id') orderId: string) {
    return this.ordersService.findOne(userId, orderId)
  }

  @Post(':id/cancel')
  cancel(@CurrentUser('id') userId: string, @Param('id') orderId: string) {
    return this.ordersService.cancel(userId, orderId)
  }
}
