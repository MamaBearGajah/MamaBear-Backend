import {
  Controller,
  Get,
  Post,
  Delete,
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
import { UsersService } from './users.service.js';
import {
  ChangePasswordDto,
  CreateAddressDto,
  UpdateAddressDto,
  UpdateProfileDto,
} from './dto/users.dto.js';
import { GetUser } from '../auth/decorators/index.js';
import { BadRequestResponseDto, MessageResponseDto, NotFoundResponseDto, UnauthorizedResponseDto } from '../common/dto/response.dto.js';
import { AddressDto, OrderSummaryDto, UserProfileDto } from './dto/users-response.dto.js';

@ApiTags('Users')
@ApiBearerAuth('access-token')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOkResponse({ description: 'Returns the authenticated user\'s profile.', type: UserProfileDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  getProfile(@GetUser('sub') userId: string) {
    return this.usersService.getProfile(userId);
  }

  @Patch('me')
  @ApiOkResponse({ description: 'Profile updated successfully.', type: UserProfileDto })
  @ApiBadRequestResponse({ description: 'Invalid input data.', type: BadRequestResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  updateProfile(
    @GetUser('sub') userId: string,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.usersService.updateProfile(userId, dto);
  }

  @Patch('me/change-password')
  @ApiOkResponse({ description: 'Password changed successfully.', type: MessageResponseDto })
  @ApiBadRequestResponse({ description: 'Current password is incorrect.', type: BadRequestResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  changePassword(
    @GetUser('sub') userId: string,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.usersService.changePassword(userId, dto);
  }

  @Get('me/addresses')
  @ApiOkResponse({ description: 'Returns all saved addresses for the user.', type: [AddressDto] })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  getAddresses(@GetUser('sub') userId: string) {
    return this.usersService.getAddresses(userId);
  }

  @Get('me/addresses/:id')
  @ApiOkResponse({ description: 'Returns a specific address by ID.', type: AddressDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiNotFoundResponse({ description: 'Address not found.', type: NotFoundResponseDto })
  getAddressById(
    @GetUser('sub') userId: string,
    @Param('id') addressId: string,
  ) {
    return this.usersService.getAddressById(userId, addressId);
  }

  @Post('me/addresses')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Address created successfully.', type: AddressDto })
  @ApiBadRequestResponse({ description: 'Invalid address data.', type: BadRequestResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  createAddress(
    @GetUser('sub') userId: string,
    @Body() dto: CreateAddressDto,
  ) {
    return this.usersService.createAddress(userId, dto);
  }

  @Patch('me/addresses/:id/default')
  @ApiOkResponse({ description: 'Address set as default successfully.', type: AddressDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiNotFoundResponse({ description: 'Address not found.', type: NotFoundResponseDto })
  setDefaultAddress(
    @GetUser('sub') userId: string,
    @Param('id') addressId: string,
  ) {
    return this.usersService.setDefaultAddress(userId, addressId);
  }

  @Patch('me/addresses/:id')
  @ApiOkResponse({ description: 'Address updated successfully.', type: AddressDto })
  @ApiBadRequestResponse({ description: 'Invalid address data.', type: BadRequestResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiNotFoundResponse({ description: 'Address not found.', type: NotFoundResponseDto })
  updateAddress(
    @GetUser('sub') userId: string,
    @Param('id') addressId: string,
    @Body() dto: UpdateAddressDto,
  ) {
    return this.usersService.updateAddress(userId, addressId, dto);
  }

  @Delete('me/addresses/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Address deleted successfully.', type: MessageResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiNotFoundResponse({ description: 'Address not found.', type: NotFoundResponseDto })
  deleteAddress(
    @GetUser('sub') userId: string,
    @Param('id') addressId: string,
  ) {
    return this.usersService.deleteAddress(userId, addressId);
  }

  @Get('me/orders')
  @ApiOkResponse({ description: 'Returns all orders for the authenticated user.', type: [OrderSummaryDto] })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  getOrders(@GetUser('sub') userId: string) {
    return this.usersService.getOrders(userId);
  }

  @Get('me/orders/:id')
  @ApiOkResponse({ description: 'Returns a specific order by ID.', type: OrderSummaryDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiNotFoundResponse({ description: 'Order not found.', type: NotFoundResponseDto })
  getOrderById(
    @GetUser('sub') userId: string,
    @Param('id') orderId: string,
  ) {
    return this.usersService.getOrderById(userId, orderId);
  }
}
