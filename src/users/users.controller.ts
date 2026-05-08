import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Patch,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ChangePasswordDto,
  CreateAddressDto,
  UpdateAddressDto,
  UpdateProfileDto,
} from './dto/users.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ─────────────────────────────────────────────
  // PROFILE
  // GET  /users/me
  // PUT  /users/me
  // PUT  /users/me/change-password
  // ─────────────────────────────────────────────
  @Get('me')
  getProfile(@GetUser('sub') userId: string) {
    return this.usersService.getProfile(userId);
  }

  @Put('me')
  updateProfile(
    @GetUser('sub') userId: string,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.usersService.updateProfile(userId, dto);
  }

  @Put('me/change-password')
  changePassword(
    @GetUser('sub') userId: string,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.usersService.changePassword(userId, dto);
  }

  // ─────────────────────────────────────────────
  // ADDRESSES
  // GET    /users/me/addresses
  // GET    /users/me/addresses/:id
  // POST   /users/me/addresses
  // PUT    /users/me/addresses/:id
  // PATCH  /users/me/addresses/:id/default
  // DELETE /users/me/addresses/:id
  // ─────────────────────────────────────────────
  @Get('me/addresses')
  getAddresses(@GetUser('sub') userId: string) {
    return this.usersService.getAddresses(userId);
  }

  @Get('me/addresses/:id')
  getAddressById(
    @GetUser('sub') userId: string,
    @Param('id') addressId: string,
  ) {
    return this.usersService.getAddressById(userId, addressId);
  }

  @Post('me/addresses')
  @HttpCode(HttpStatus.CREATED)
  createAddress(
    @GetUser('sub') userId: string,
    @Body() dto: CreateAddressDto,
  ) {
    return this.usersService.createAddress(userId, dto);
  }

  @Put('me/addresses/:id')
  updateAddress(
    @GetUser('sub') userId: string,
    @Param('id') addressId: string,
    @Body() dto: UpdateAddressDto,
  ) {
    return this.usersService.updateAddress(userId, addressId, dto);
  }

  @Patch('me/addresses/:id/default')
  setDefaultAddress(
    @GetUser('sub') userId: string,
    @Param('id') addressId: string,
  ) {
    return this.usersService.setDefaultAddress(userId, addressId);
  }

  @Delete('me/addresses/:id')
  @HttpCode(HttpStatus.OK)
  deleteAddress(
    @GetUser('sub') userId: string,
    @Param('id') addressId: string,
  ) {
    return this.usersService.deleteAddress(userId, addressId);
  }

  // ─────────────────────────────────────────────
  // ORDERS
  // GET /users/me/orders
  // GET /users/me/orders/:id
  // ─────────────────────────────────────────────
  @Get('me/orders')
  getOrders(@GetUser('sub') userId: string) {
    return this.usersService.getOrders(userId);
  }

  @Get('me/orders/:id')
  getOrderById(
    @GetUser('sub') userId: string,
    @Param('id') orderId: string,
  ) {
    return this.usersService.getOrderById(userId, orderId);
  }
}