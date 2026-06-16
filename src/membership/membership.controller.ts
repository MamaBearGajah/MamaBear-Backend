import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { MembershipService } from './membership.service';
import { RedeemPointsDto } from './dto/redeem-points.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { GetUser, Roles } from '../auth/decorators';
import { Role, MembershipTier } from '../../generated/prisma/enums';

@ApiTags('Membership')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('membership')
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  // ─── User Endpoints ──────────────────────────────────────────────────────────

  @Get('me')
  @ApiOperation({
    summary: 'Info membership saya',
    description: 'Menampilkan tier, point, total spent, voucher aktif, dan info tier berikutnya.',
  })
  @ApiResponse({ status: 200, description: 'Data membership berhasil diambil' })
  getMyMembership(@GetUser('id') userId: string) {
    return this.membershipService.getMyMembership(userId);
  }

  @Get('points/history')
  @ApiOperation({ summary: 'Riwayat transaksi point saya' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 20 })
  getPointHistory(
    @GetUser('id') userId: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ) {
    return this.membershipService.getPointHistory(userId, page, limit);
  }

  @Post('points/redeem')
  @ApiOperation({
    summary: 'Redeem point jadi voucher potongan harga',
    description: `
      Konversi point menjadi voucher diskon.
      - 1 point = Rp 1.000 potongan harga
      - Minimal redeem 10 point (= Rp 10.000)
      - Voucher berlaku 30 hari
    `,
  })
  @ApiResponse({ status: 201, description: 'Point berhasil di-redeem, voucher diterbitkan' })
  @ApiResponse({ status: 400, description: 'Point tidak cukup atau di bawah minimum' })
  redeemPoints(
    @GetUser('id') userId: string,
    @Body() dto: RedeemPointsDto,
  ) {
    return this.membershipService.redeemPoints(userId, dto);
  }

  // ─── Admin Endpoints ─────────────────────────────────────────────────────────

  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @ApiOperation({ summary: '[Admin] List semua member' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 20 })
  @ApiQuery({ name: 'tier', required: false, enum: MembershipTier })
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
    @Query('tier') tier?: MembershipTier,
  ) {
    return this.membershipService.findAll(page, limit, tier);
  }
}
