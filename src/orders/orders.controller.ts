import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { OrdersService } from './orders.service.js';
import { BadRequestResponseDto, NotFoundResponseDto, UnauthorizedResponseDto } from '../common/dto/response.dto.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { GetUser } from '../auth/decorators/index.js';
import { OrderDto } from './dto/order-response.dto.js';

@ApiTags('Orders')
@ApiBearerAuth('access-token')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Order placed successfully.', type: OrderDto })
  @ApiBadRequestResponse({ description: 'Invalid order data, insufficient stock, or address mismatch.', type: BadRequestResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiNotFoundResponse({ description: 'Product, variant, or address not found.', type: NotFoundResponseDto })
  create(@GetUser('sub') userId: string, @Body() dto: CreateOrderDto) {
    return this.ordersService.create(userId, dto);
  }

  @Get()
  @ApiOkResponse({ description: 'Returns all orders for the authenticated user.', type: [OrderDto] })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  findAll(@GetUser('sub') userId: string) {
    return this.ordersService.findAll(userId);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Returns a specific order by ID with full details.', type: OrderDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiNotFoundResponse({ description: 'Order not found.', type: NotFoundResponseDto })
  findOne(@GetUser('sub') userId: string, @Param('id') orderId: string) {
    return this.ordersService.findOne(userId, orderId);
  }

  @Patch(':id/cancel')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Order cancelled successfully. Stock restored.', type: OrderDto })
  @ApiBadRequestResponse({ description: 'Order cannot be cancelled in its current status.', type: BadRequestResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiNotFoundResponse({ description: 'Order not found.', type: NotFoundResponseDto })
  cancel(@GetUser('sub') userId: string, @Param('id') orderId: string) {
    return this.ordersService.cancel(userId, orderId);
  }
}
