import {
  Controller, Get, Post, Patch, Delete,
  Body, Param, Query, HttpCode, HttpStatus,
} from '@nestjs/common';
import {
  ApiTags, ApiOkResponse, ApiCreatedResponse,
  ApiBadRequestResponse, ApiNotFoundResponse,
} from '@nestjs/swagger';
import { GuestCartService } from './guest-cart.service';
import { CreateGuestCartDto, GuestAddToCartDto, GuestUpdateCartItemDto } from './dto/guest-cart.dto';
import { Public } from '../auth/decorators';

@ApiTags('Guest Cart')
@Public()
@Controller('guest-cart')
export class GuestCartController {
  constructor(private readonly guestCartService: GuestCartService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Guest cart dibuat atau ditemukan berdasarkan sessionId' })
  createCart(@Body() dto: CreateGuestCartDto) {
    return this.guestCartService.createCart(dto.sessionId);
  }

  @Get()
  @ApiOkResponse({ description: 'Returns guest cart + items + subtotal' })
  getCart(@Query('sessionId') sessionId: string) {
    return this.guestCartService.getCart(sessionId);
  }

  @Post('items')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Item ditambahkan ke guest cart. Returns updated cart.' })
  @ApiBadRequestResponse({ description: 'Stok tidak mencukupi atau data tidak valid' })
  @ApiNotFoundResponse({ description: 'Produk atau variant tidak ditemukan' })
  addItem(@Body() dto: GuestAddToCartDto) {
    return this.guestCartService.addItem(dto);
  }

  @Patch('items/:id')
  @ApiOkResponse({ description: 'Quantity item diupdate. Returns updated cart.' })
  @ApiBadRequestResponse({ description: 'Stok tidak mencukupi' })
  @ApiNotFoundResponse({ description: 'Item tidak ditemukan' })
  updateItem(
    @Query('sessionId') sessionId: string,
    @Param('id') itemId: string,
    @Body() dto: GuestUpdateCartItemDto,
  ) {
    return this.guestCartService.updateItem(sessionId, itemId, dto);
  }

  @Delete('items/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Item berhasil dihapus dari guest cart' })
  @ApiNotFoundResponse({ description: 'Item tidak ditemukan' })
  removeItem(@Query('sessionId') sessionId: string, @Param('id') itemId: string) {
    return this.guestCartService.removeItem(sessionId, itemId);
  }

  @Delete('clear')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Semua item di guest cart berhasil dikosongkan' })
  clearCart(@Query('sessionId') sessionId: string) {
    return this.guestCartService.clearCart(sessionId);
  }

  // FIX: Endpoint untuk hapus seluruh guest cart (bukan hanya items)
  @Delete()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Guest cart berhasil dihapus seluruhnya' })
  @ApiNotFoundResponse({ description: 'Guest cart tidak ditemukan' })
  deleteCart(@Query('sessionId') sessionId: string) {
    return this.guestCartService.deleteCart(sessionId);
  }
}