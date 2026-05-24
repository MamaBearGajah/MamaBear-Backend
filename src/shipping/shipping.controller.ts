import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ShippingService } from './shipping.service.js';
import { BadRequestResponseDto, UnauthorizedResponseDto } from '../common/dto/response.dto.js';
import { GetCityDto, GetShippingCostDto } from './dto/create-shipping.dto.js';
import { Public } from '../auth/decorators/index.js';
import { CityDto, ProvinceDto, ShippingCostResponseDto } from './dto/shipping-response.dto.js';

@ApiTags('Shipping')
@ApiBearerAuth('access-token')
@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Public()
  @Get('provinces')
  @ApiOkResponse({ description: 'Returns a list of all provinces from Raja Ongkir.', type: [ProvinceDto] })
  getProvinces() {
    return this.shippingService.getProvinces();
  }

  @Public()
  @Get('cities')
  @ApiOkResponse({ description: 'Returns a list of cities, optionally filtered by province ID.', type: [CityDto] })
  @ApiBadRequestResponse({ description: 'Invalid province ID.', type: BadRequestResponseDto })
  getCities(@Query() dto: GetCityDto) {
    return this.shippingService.getCities(dto);
  }

  @Post('cost')
  @ApiOkResponse({ description: 'Returns shipping cost options for the given route and weight.', type: [ShippingCostResponseDto] })
  @ApiBadRequestResponse({ description: 'Invalid shipping parameters.', type: BadRequestResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  calculateCost(@Body() dto: GetShippingCostDto) {
    return this.shippingService.calculateCost(dto);
  }
}
