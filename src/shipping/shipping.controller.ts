import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ShippingService } from './shipping.service';
import { ShippingCostDto } from './dto/shipping-cost.dto';
import { Public } from 'src/auth/decorators';

@ApiTags('Shipping')
@Public()
@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @ApiOperation({ summary: 'Daftar provinsi' })
  @ApiResponse({ status: 200, description: 'List provinsi berhasil diambil' })
  @ApiResponse({ status: 502, description: 'Gagal dari RajaOngkir' })
  @Get('provinces')
  getProvinces() {
    return this.shippingService.getProvinces();
  }

  @ApiOperation({ summary: 'Daftar kota per provinsi' })
  @ApiQuery({ name: 'provinceId', required: false, description: 'ID provinsi dari RajaOngkir' })
  @ApiResponse({ status: 200, description: 'List kota berhasil diambil' })
  @ApiResponse({ status: 502, description: 'Gagal dari RajaOngkir' })
  @Get('cities')
  getCities(@Query('provinceId') provinceId?: string) {
    return this.shippingService.getCities(provinceId);
  }

  @ApiOperation({ summary: 'Hitung ongkos kirim' })
  @ApiResponse({ status: 200, description: 'Kalkulasi ongkir berhasil' })
  @ApiResponse({ status: 400, description: 'Validasi gagal' })
  @ApiResponse({ status: 502, description: 'Gagal dari RajaOngkir' })
  @Post('cost')
  calculateCost(@Body() dto: ShippingCostDto) {
    return this.shippingService.calculateCost(dto);
  }
}