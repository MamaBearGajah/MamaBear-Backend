import {
  Controller, Get, Post, Patch, Delete,
  Body, Param, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { Public, Roles } from '../auth/decorators';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../../generated/prisma/enums';

@ApiTags('Banner')
@Controller('banners')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  // ─── Public ──────────────────────────────────────────────────────────────

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get banner aktif untuk homepage (public)' })
  @ApiResponse({ status: 200, description: 'List banner aktif' })
  getActiveBanners() {
    return this.bannerService.getActiveBanners();
  }

  // ─── Admin ───────────────────────────────────────────────────────────────

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @Get('admin')
  @ApiOperation({ summary: '[Admin] List semua banner termasuk nonaktif' })
  findAll() {
    return this.bannerService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @Post()
  @ApiOperation({ summary: '[Admin] Buat banner baru' })
  @ApiResponse({ status: 201, description: 'Banner berhasil dibuat' })
  create(@Body() dto: CreateBannerDto) {
    return this.bannerService.create(dto);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @Patch(':id')
  @ApiOperation({ summary: '[Admin] Update banner' })
  @ApiParam({ name: 'id' })
  update(@Param('id') id: string, @Body() dto: UpdateBannerDto) {
    return this.bannerService.update(id, dto);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @Delete(':id')
  @ApiOperation({ summary: '[Admin] Hapus banner' })
  @ApiParam({ name: 'id' })
  remove(@Param('id') id: string) {
    return this.bannerService.remove(id);
  }
}