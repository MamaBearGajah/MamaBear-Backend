import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { CartService } from './cart.service.js';
import { AddToCartDto, UpdateCartItemDto, MergeGuestCartDto } from './dto/create-cart.dto.js';
import { GetUser } from '../auth/decorators/index.js';
import { BadRequestResponseDto, MessageResponseDto, NotFoundResponseDto, UnauthorizedResponseDto } from '../common/dto/response.dto.js';
import { CartDto, CartItemDto } from './dto/cart-response.dto.js';

@ApiTags('Cart')
@ApiBearerAuth('access-token')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @ApiOkResponse({ description: 'Returns the authenticated user\'s cart with all items.', type: CartDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  getCart(@GetUser('sub') userId: string) {
    return this.cartService.getCart(userId);
  }

  @Post('items')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Item added to cart. Returns the updated cart.', type: CartDto })
  @ApiBadRequestResponse({ description: 'Invalid item data or insufficient stock.', type: BadRequestResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiNotFoundResponse({ description: 'Product or variant not found.', type: NotFoundResponseDto })
  addItem(@GetUser('sub') userId: string, @Body() dto: AddToCartDto) {
    return this.cartService.addItem(userId, dto);
  }

  @Patch('items/:id')
  @ApiOkResponse({ description: 'Cart item quantity updated. Returns the updated cart item.', type: CartItemDto })
  @ApiBadRequestResponse({ description: 'Invalid quantity or insufficient stock.', type: BadRequestResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiNotFoundResponse({ description: 'Cart item not found.', type: NotFoundResponseDto })
  updateItem(
    @GetUser('sub') userId: string,
    @Param('id') itemId: string,
    @Body() dto: UpdateCartItemDto,
  ) {
    return this.cartService.updateItem(userId, itemId, dto);
  }

  @Delete('items/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Cart item removed successfully.', type: MessageResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiNotFoundResponse({ description: 'Cart item not found.', type: NotFoundResponseDto })
  removeItem(@GetUser('sub') userId: string, @Param('id') itemId: string) {
    return this.cartService.removeItem(userId, itemId);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Cart cleared successfully.', type: MessageResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  clearCart(@GetUser('sub') userId: string) {
    return this.cartService.clearCart(userId);
  }

  @Post('merge-guest')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Guest cart merged into user cart. Returns the updated cart.', type: CartDto })
  @ApiBadRequestResponse({ description: 'Invalid session ID.', type: BadRequestResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  mergeGuest(@GetUser('sub') userId: string, @Body() dto: MergeGuestCartDto) {
    return this.cartService.mergeGuest(userId, dto);
  }
}
