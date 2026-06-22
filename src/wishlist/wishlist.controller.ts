import {
  Controller,
  Get,
  Post,
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
  ApiConflictResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { WishlistService } from './wishlist.service';
import { AddWishlistDto } from './dto/wishlist.dto';
import { GetUser } from 'src/auth/decorators';

@ApiTags('Wishlist')
@ApiBearerAuth()
@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  @ApiOkResponse({ description: 'Daftar wishlist user' })
  getWishlist(@GetUser('id') userId: string) {
    return this.wishlistService.getWishlist(userId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Produk ditambahkan ke wishlist' })
  @ApiConflictResponse({ description: 'Produk sudah ada di wishlist' })
  @ApiNotFoundResponse({ description: 'Produk tidak ditemukan' })
  addToWishlist(
    @GetUser('id') userId: string,
    @Body() dto: AddWishlistDto,
  ) {
    return this.wishlistService.addToWishlist(userId, dto.productId);
  }

  @Delete(':productId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Produk dihapus dari wishlist' })
  @ApiNotFoundResponse({ description: 'Item tidak ada di wishlist' })
  removeFromWishlist(
    @GetUser('id') userId: string,
    @Param('productId') productId: string,
  ) {
    return this.wishlistService.removeFromWishlist(userId, productId);
  }

  @Get('check/:productId')
  @ApiOkResponse({ description: 'Status wishlist untuk produk ini' })
  checkWishlist(
    @GetUser('id') userId: string,
    @Param('productId') productId: string,
  ) {
    return this.wishlistService.checkWishlist(userId, productId);
  }
}