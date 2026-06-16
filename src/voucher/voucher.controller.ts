// src/voucher/voucher.controller.ts

import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { VoucherService } from './voucher.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto, ValidateVoucherDto } from './dto/validate-voucher.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { GetUser, Roles } from '../auth/decorators';
import { Role } from '../../generated/prisma/enums';

@ApiTags('Voucher')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('vouchers')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  // ─── User Endpoints ──────────────────────────────────────────────────────────

  @Get('me')
  @ApiOperation({ summary: 'Voucher saya (personal & masih aktif)' })
  @ApiResponse({ status: 200, description: 'List voucher milik user' })
  getMyVouchers(@GetUser('id') userId: string) {
    return this.voucherService.getMyVouchers(userId);
  }

  @Post('validate')
  @ApiOperation({
    summary: 'Validasi voucher sebelum checkout',
    description: 'Cek apakah kode voucher valid dan hitung nilai diskonnya. Tidak mengubah data.',
  })
  @ApiResponse({ status: 200, description: 'Voucher valid, kembalikan nilai diskon' })
  @ApiResponse({ status: 400, description: 'Voucher tidak valid / expired / habis' })
  @ApiResponse({ status: 404, description: 'Voucher tidak ditemukan' })
  validateVoucher(
    @GetUser('id') userId: string,
    @Body() dto: ValidateVoucherDto,
  ) {
    return this.voucherService.validate(
      dto.code,
      dto.totalAmount,
      0, // shippingCost tidak diketahui di sini, bisa 0 untuk validate awal
      userId,
    );
  }

  // ─── Admin Endpoints ─────────────────────────────────────────────────────────

  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @ApiOperation({ summary: '[Admin] List semua voucher' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 20 })
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ) {
    return this.voucherService.findAll(page, limit);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @ApiOperation({ summary: '[Admin] Buat voucher baru' })
  @ApiResponse({ status: 201, description: 'Voucher berhasil dibuat' })
  @ApiResponse({ status: 400, description: 'Kode voucher sudah ada' })
  create(@Body() dto: CreateVoucherDto) {
    return this.voucherService.create(dto);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @ApiOperation({ summary: '[Admin] Update voucher' })
  @ApiParam({ name: 'id', description: 'Voucher ID' })
  update(@Param('id') id: string, @Body() dto: UpdateVoucherDto) {
    return this.voucherService.update(id, dto);
  }

  @Patch(':id/deactivate')
  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @ApiOperation({ summary: '[Admin] Non-aktifkan voucher' })
  @ApiParam({ name: 'id', description: 'Voucher ID' })
  deactivate(@Param('id') id: string) {
    return this.voucherService.deactivate(id);
  }
}
