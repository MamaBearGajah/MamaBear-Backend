import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators';
import {
  ChangePasswordDto,
  CreateAddressDto,
  UpdateAddressDto,
  UpdateProfileDto,
} from './dto/users.dto';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ─────────────────────────────────────────────
  // PROFILE
  // ─────────────────────────────────────────────
  @Get('me')
  getProfile(@GetUser('sub') userId: string) {
    return this.usersService.getProfile(userId);
  }

  @Patch('me')
  @ApiOperation({ summary: 'Update profil user' })
  @ApiResponse({ status: 200, description: 'Profil berhasil diperbarui' })
  updateProfile(@GetUser('sub') userId: string, @Body() dto: UpdateProfileDto) {
    return this.usersService.updateProfile(userId, dto);
  }

  @Patch('me/change-password')
  @ApiOperation({ summary: 'Ganti password user' })
  @ApiResponse({ status: 200, description: 'Password berhasil diganti' })
  changePassword(@GetUser('sub') userId: string, @Body() dto: ChangePasswordDto) {
    return this.usersService.changePassword(userId, dto);
  }

  // ─────────────────────────────────────────────
  // ADDRESSES
  // ─────────────────────────────────────────────
  @Get('me/addresses')
  getAddresses(@GetUser('sub') userId: string) {
    return this.usersService.getAddresses(userId);
  }

  @Get('me/addresses/:id')
  @ApiParam({ name: 'id', description: 'Address ID' })
  @ApiOperation({ summary: 'Ambil detail alamat berdasarkan ID' })
  @ApiResponse({ status: 200, description: 'Alamat berhasil diambil' })
  getAddressById(@GetUser('sub') userId: string, @Param('id') addressId: string) {
    return this.usersService.getAddressById(userId, addressId);
  }

  @Post('me/addresses')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Tambah alamat baru' })
  @ApiResponse({ status: 201, description: 'Alamat berhasil ditambahkan' })
  createAddress(@GetUser('sub') userId: string, @Body() dto: CreateAddressDto) {
    return this.usersService.createAddress(userId, dto);
  }

  @Patch('me/addresses/:id/default')
  @ApiParam({ name: 'id', description: 'Address ID' })
  @ApiOperation({ summary: 'Set alamat default' })
  @ApiResponse({ status: 200, description: 'Alamat default berhasil diubah' })
  setDefaultAddress(@GetUser('sub') userId: string, @Param('id') addressId: string) {
    return this.usersService.setDefaultAddress(userId, addressId);
  }

  @Patch('me/addresses/:id')
  @ApiParam({ name: 'id', description: 'Address ID' })
  @ApiOperation({ summary: 'Update alamat user' })
  @ApiResponse({ status: 200, description: 'Alamat berhasil diperbarui' })
  updateAddress(
    @GetUser('sub') userId: string,
    @Param('id') addressId: string,
    @Body() dto: UpdateAddressDto,
  ) {
    return this.usersService.updateAddress(userId, addressId, dto);
  }

  @Delete('me/addresses/:id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', description: 'Address ID' })
  @ApiOperation({ summary: 'Hapus alamat user' })
  @ApiResponse({ status: 200, description: 'Alamat berhasil dihapus' })
  deleteAddress(@GetUser('sub') userId: string, @Param('id') addressId: string) {
    return this.usersService.deleteAddress(userId, addressId);
  }

  // ─────────────────────────────────────────────
  // ORDERS
  // ─────────────────────────────────────────────
  @Get('me/orders')
  getOrders(@GetUser('sub') userId: string) {
    return this.usersService.getOrders(userId);
  }

  @Get('me/orders/:id')
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiOperation({ summary: 'Ambil detail order berdasarkan ID' })
  @ApiResponse({ status: 200, description: 'Detail order berhasil diambil' })
  getOrderById(@GetUser('sub') userId: string, @Param('id') orderId: string) {
    return this.usersService.getOrderById(userId, orderId);
  }
}