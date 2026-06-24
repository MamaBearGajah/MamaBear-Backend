import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators';
import { Role } from '../../generated/prisma/enums';
import { SiteSettingsService } from './site-settings.service';
import { UpdateSiteSettingsDto } from './dto/update-site-settings.dto';

@ApiTags('Site Settings')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('admin/settings')
export class SiteSettingsController {
  constructor(private readonly siteSettingsService: SiteSettingsService) {}

  // ── GET /admin/settings — baca settings ──────────────────────────────────
  @Get()
  @Roles(Role.admin, Role.super_admin)
  @ApiOperation({ summary: '[Admin] Ambil konfigurasi site settings' })
  @ApiResponse({ status: 200, description: 'Settings berhasil diambil' })
  get() {
    return this.siteSettingsService.get();
  }

  // ── PATCH /admin/settings — update settings ───────────────────────────────
  @Patch()
  @Roles(Role.super_admin)
  @ApiOperation({ summary: '[Super Admin] Update konfigurasi site settings' })
  @ApiResponse({ status: 200, description: 'Settings berhasil disimpan' })
  update(@Body() dto: UpdateSiteSettingsDto) {
    return this.siteSettingsService.update(dto);
  }
}
