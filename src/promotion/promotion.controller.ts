// src/promotion/promotion.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { PromotionService } from './promotion.service';
import { CreatePromotionDto, UpdatePromotionDto } from './dto/create-promotion.dto';
import { Public, Roles } from '../auth/decorators';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../../generated/prisma/enums';

@ApiTags('Promotion Landing Page')
@Controller('promotions')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  // ─── Public Endpoints ─────────────────────────────────────────────────────

  @Public()
  @Get('active')
  @ApiOperation({
    summary: 'Ambil promo aktif saat ini (untuk halaman /promotion)',
    description:
      'Mengembalikan satu promosi yang sedang aktif beserta hero bundle & koleksi bundle aktif.',
  })
  @ApiResponse({ status: 200, description: 'Data promo aktif' })
  @ApiResponse({ status: 204, description: 'Tidak ada promo aktif' })
  getActive() {
    return this.promotionService.findActive();
  }

  @Public()
  @Get(':slug')
  @ApiOperation({ summary: 'Detail promosi by slug (public)' })
  @ApiParam({ name: 'slug', example: 'mothers-day-2025' })
  @ApiResponse({ status: 200, description: 'Detail promosi' })
  @ApiResponse({ status: 404, description: 'Promosi tidak ditemukan' })
  getBySlug(@Param('slug') slug: string) {
    return this.promotionService.findBySlug(slug);
  }

  // ─── Admin Endpoints ──────────────────────────────────────────────────────

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @Get()
  @ApiOperation({ summary: '[Admin] List semua promosi' })
  findAll() {
    return this.promotionService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @Get('admin/:id')
  @ApiOperation({ summary: '[Admin] Detail promosi by ID' })
  @ApiParam({ name: 'id' })
  findOne(@Param('id') id: string) {
    return this.promotionService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @Post()
  @ApiOperation({
    summary: '[Admin] Buat halaman promosi baru',
    description: `
      Membuat landing page promosi dengan:
      - Title, slug, badgeText untuk hero section
      - Sections (sub-section konten)
      - Benefits (keunggulan, misal "Premium Quality", "Elegant Packaging")
      - heroBundleId (opsional — jika null, dipilih otomatis bundle discountPrice tertinggi)
      - status: draft | active | ended
    `,
  })
  @ApiResponse({ status: 201, description: 'Promosi berhasil dibuat' })
  @ApiResponse({ status: 400, description: 'Slug sudah digunakan' })
  create(@Body() dto: CreatePromotionDto) {
    return this.promotionService.create(dto);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @Patch(':id')
  @ApiOperation({
    summary: '[Admin] Update promosi',
    description:
      'Partial update. Jika sections atau benefits dikirim, seluruh data lama akan diganti.',
  })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, description: 'Promosi berhasil diupdate' })
  @ApiResponse({ status: 404, description: 'Promosi tidak ditemukan' })
  update(@Param('id') id: string, @Body() dto: UpdatePromotionDto) {
    return this.promotionService.update(id, dto);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @Delete(':id')
  @ApiOperation({ summary: '[Admin] Hapus promosi' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, description: 'Promosi berhasil dihapus' })
  remove(@Param('id') id: string) {
    return this.promotionService.remove(id);
  }
}
