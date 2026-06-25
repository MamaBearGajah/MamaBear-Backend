import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { VoucherService } from './voucher.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { ValidateVoucherDto } from './dto/validate-voucher.dto';
import { ApplyVoucherDto } from './dto/apply-voucher.dto';
import { GetUser, Roles } from '../auth/decorators';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../../generated/prisma/enums';

@ApiTags('Voucher')
@ApiBearerAuth()
@Controller('vouchers')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  // ─── User: Lihat voucher saya ─────────────────────────────────────────────

  @Get('my')
  @ApiOperation({
    summary: 'Daftar voucher milik saya (aktif)',
    description:
      'Menampilkan voucher personal (dari redeem point atau tier benefit) yang masih aktif dan belum kadaluarsa.',
  })
  @ApiResponse({ status: 200, description: 'List voucher berhasil diambil' })
  getMyVouchers(@GetUser('id') userId: string) {
    return this.voucherService.getMyVouchers(userId);
  }

  // ─── User: Validasi voucher sebelum checkout ──────────────────────────────

  @Post('validate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Validasi kode voucher sebelum checkout',
    description: `
      Cek apakah voucher valid dan hitung nilai diskonnya.
      Tidak mengubah state DB (tidak mengurangi usedCount).
      
      Kirim \`subtotal\` dan \`shippingCost\` untuk mendapat kalkulasi diskon yang akurat.
    `,
  })
  @ApiResponse({
    status: 200,
    description: 'Voucher valid',
    schema: {
      example: {
        valid: true,
        voucher: { code: 'HEMAT25K', type: 'fixed', value: 25000 },
        discountAmount: 25000,
        finalShippingCost: 15000,
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Voucher tidak valid / kadaluarsa / tidak cukup belanja' })
  @ApiResponse({ status: 404, description: 'Voucher tidak ditemukan' })
  validate(@Body() dto: ValidateVoucherDto, @GetUser('id') userId: string) {
    return this.voucherService.validate(
      dto.code,
      dto.totalAmount,
      dto.shippingCost ?? 0,
      userId,
    );
  }

  // ─── User: Apply voucher saat checkout ───────────────────────────────────

  @Post('apply')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Apply voucher saat checkout',
    description: `
      Menerapkan voucher ke order dan menambah usedCount.
      Berbeda dengan \`/validate\`, endpoint ini mengubah state DB.
      Dipanggil hanya saat checkout dikonfirmasi.
    `,
  })
  @ApiResponse({
    status: 200,
    description: 'Voucher berhasil diapply',
    schema: {
      example: {
        discountAmount: 25000,
        finalShippingCost: 15000,
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Voucher tidak aktif atau sudah habis' })
  @ApiResponse({ status: 404, description: 'Voucher tidak ditemukan' })
  async applyVoucher(
    @Body() dto: ApplyVoucherDto,
  ): Promise<{ discountAmount: number; finalShippingCost: number }> {
    return this.voucherService.applyVoucher(
      null, // tx — injected by the order service when called inside a transaction
      dto.voucherId,
      dto.subtotal,
      dto.shippingCost,
    );
  }

  // ─── Admin: List semua voucher ────────────────────────────────────────────

  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @ApiOperation({ summary: '[Admin] List semua voucher dengan pagination' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 20 })
  @ApiResponse({ status: 200, description: 'List voucher berhasil diambil' })
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ) {
    return this.voucherService.findAll(page, limit);
  }

  // ─── Admin: Buat voucher ──────────────────────────────────────────────────

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @ApiOperation({
    summary: '[Admin] Buat voucher baru',
    description: `
      Tipe voucher:
      - **percentage** — diskon % dari subtotal (gunakan \`maxDiscount\` untuk batasi nominal)
      - **fixed** — potongan nominal tetap dari subtotal
      - **free_shipping** — potongan ongkir sebesar \`value\`
      
      Jika \`ownerId\` diisi, voucher hanya bisa dipakai user tersebut.
    `,
  })
  @ApiResponse({ status: 201, description: 'Voucher berhasil dibuat' })
  @ApiResponse({ status: 400, description: 'Kode voucher sudah digunakan' })
  create(@Body() dto: CreateVoucherDto) {
    return this.voucherService.create(dto);
  }

  // ─── Admin: Update voucher ────────────────────────────────────────────────

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @ApiOperation({ summary: '[Admin] Update voucher' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, description: 'Voucher berhasil diupdate' })
  @ApiResponse({ status: 404, description: 'Voucher tidak ditemukan' })
  update(@Param('id') id: string, @Body() dto: CreateVoucherDto) {
    return this.voucherService.update(id, dto);
  }

  // ─── Admin: Nonaktifkan voucher ───────────────────────────────────────────

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @ApiOperation({
    summary: '[Admin] Nonaktifkan voucher (soft deactivate)',
    description: 'Tidak menghapus voucher dari DB, hanya set isActive = false.',
  })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, description: 'Voucher dinonaktifkan' })
  @ApiResponse({ status: 404, description: 'Voucher tidak ditemukan' })
  deactivate(@Param('id') id: string) {
    return this.voucherService.deactivate(id);
  }
}