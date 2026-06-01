import {
  Controller,
  Get,
  Post,
  Put,
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
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddToCartDto, UpdateCartItemDto, MergeGuestCartDto } from './dto/create-cart.dto';
import { GetUser } from '../auth/decorators';

@ApiTags('Cart')
@ApiBearerAuth()
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // ─── GET CART ─────────────────────────────────────────────────────────────

  @Get()
  @ApiOkResponse({ description: 'Returns user cart with all items and subtotal' })
  @ApiUnauthorizedResponse({ description: 'Access token missing or invalid' })
  getCart(@GetUser('id') userId: string) {
    return this.cartService.getCart(userId);
  }

  // ─── ADD ITEM ─────────────────────────────────────────────────────────────

  @Post('items')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Item added to cart. Returns updated cart with subtotal' })
  @ApiBadRequestResponse({ description: 'Stok tidak mencukupi atau data tidak valid' })
  @ApiUnauthorizedResponse({ description: 'Access token missing or invalid' })
  @ApiNotFoundResponse({ description: 'Produk atau variant tidak ditemukan' })
  addItem(
    @GetUser('id') userId: string,
    @Body() dto: AddToCartDto,
  ) {
    return this.cartService.addItem(userId, dto);
  }

  // ─── UPDATE ITEM ──────────────────────────────────────────────────────────

  @Put('items/:id')
  @ApiOkResponse({ description: 'Quantity diupdate. Returns updated cart with subtotal' })
  @ApiBadRequestResponse({ description: 'Stok tidak mencukupi' })
  @ApiUnauthorizedResponse({ description: 'Access token missing or invalid' })
  @ApiNotFoundResponse({ description: 'Cart item tidak ditemukan' })
  updateItem(
    @GetUser('id') userId: string,
    @Param('id') itemId: string,
    @Body() dto: UpdateCartItemDto,
  ) {
    return this.cartService.updateItem(userId, itemId, dto);
  }

  // ─── REMOVE ITEM ──────────────────────────────────────────────────────────

  @Delete('items/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Item berhasil dihapus dari cart' })
  @ApiUnauthorizedResponse({ description: 'Access token missing or invalid' })
  @ApiNotFoundResponse({ description: 'Cart item tidak ditemukan' })
  removeItem(
    @GetUser('id') userId: string,
    @Param('id') itemId: string,
  ) {
    return this.cartService.removeItem(userId, itemId);
  }

  // ─── CLEAR CART ───────────────────────────────────────────────────────────

  @Delete()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Cart berhasil dikosongkan' })
  @ApiUnauthorizedResponse({ description: 'Access token missing or invalid' })
  clearCart(@GetUser('id') userId: string) {
    return this.cartService.clearCart(userId);
  }

  // ─── MERGE GUEST CART ─────────────────────────────────────────────────────

  @Post('merge-guest')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Guest cart berhasil di-merge. Returns updated cart dengan subtotal' })
  @ApiBadRequestResponse({ description: 'Session ID tidak valid' })
  @ApiUnauthorizedResponse({ description: 'Access token missing or invalid' })
  @ApiConflictResponse({ description: 'Stok tidak mencukupi untuk beberapa item saat merge' })
  mergeGuest(
    @GetUser('id') userId: string,
    @Body() dto: MergeGuestCartDto,
  ) {
    return this.cartService.mergeGuest(userId, dto);
  }
}