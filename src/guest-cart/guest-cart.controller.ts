import {
  Controller, Get, Post, Patch, Delete, Body, Param, Query, HttpCode, HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { GuestCartService } from './guest-cart.service.js';
import { CreateGuestCartDto, GuestAddToCartDto, GuestUpdateCartItemDto } from './dto/guest-cart.dto.js';
import { Public } from '../auth/decorators/index.js';
import { BadRequestResponseDto, MessageResponseDto, NotFoundResponseDto } from '../common/dto/response.dto.js';
import { GuestCartDto, GuestCartItemDto } from './dto/guest-cart-response.dto.js';

@ApiTags('Guest Cart')
@Public()
@Controller('guest-cart')
export class GuestCartController {
  constructor(private readonly guestCartService: GuestCartService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Guest cart dibuat atau ditemukan berdasarkan sessionId.', type: GuestCartDto })
  createCart(@Body() dto: CreateGuestCartDto) {
    return this.guestCartService.createCart(dto.sessionId);
  }

  @Get()
  @ApiOkResponse({ description: 'Returns the guest cart for the given session ID.', type: GuestCartDto })
  getCart(@Query('sessionId') sessionId: string) {
    return this.guestCartService.getCart(sessionId);
  }

  @Post('items')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Item added to guest cart. Returns the updated cart.', type: GuestCartDto })
  @ApiBadRequestResponse({ description: 'Invalid item data or insufficient stock.', type: BadRequestResponseDto })
  @ApiNotFoundResponse({ description: 'Product or variant not found.', type: NotFoundResponseDto })
  addItem(@Body() dto: GuestAddToCartDto) {
    return this.guestCartService.addItem(dto);
  }

  @Patch('items/:id')
  @ApiOkResponse({ description: 'Guest cart item quantity updated.', type: GuestCartItemDto })
  @ApiBadRequestResponse({ description: 'Invalid quantity or insufficient stock.', type: BadRequestResponseDto })
  @ApiNotFoundResponse({ description: 'Guest cart item not found.', type: NotFoundResponseDto })
  updateItem(
    @Query('sessionId') sessionId: string,
    @Param('id') itemId: string,
    @Body() dto: GuestUpdateCartItemDto,
  ) {
    return this.guestCartService.updateItem(sessionId, itemId, dto);
  }

  @Delete('items/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Guest cart item removed successfully.', type: MessageResponseDto })
  @ApiNotFoundResponse({ description: 'Guest cart item not found.', type: NotFoundResponseDto })
  removeItem(@Query('sessionId') sessionId: string, @Param('id') itemId: string) {
    return this.guestCartService.removeItem(sessionId, itemId);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Guest cart cleared successfully.', type: MessageResponseDto })
  clearCart(@Query('sessionId') sessionId: string) {
    return this.guestCartService.clearCart(sessionId);
  }
}
