import {
  Controller, Get, Post, Patch, Delete,
  Body, Param, UseGuards, Query,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { BundleService, UpdateBundleDto } from './bundle.service';
import { CreateBundleDto } from './dto/create-bundle.dto';
import { Public, Roles } from '../auth/decorators';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../../generated/prisma/enums';

@ApiTags('Bundle / Hampers')
@Controller('bundles')
export class BundleController {
  constructor(private readonly bundleService: BundleService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'List bundle aktif (public)' })
  getActive() {
    return this.bundleService.findAll(true);
  }

  @Public()
  @Get(':slug')
  @ApiOperation({ summary: 'Detail bundle by slug (public)' })
  @ApiParam({ name: 'slug' })
  getBySlug(@Param('slug') slug: string) {
    return this.bundleService.findBySlug(slug);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @Get('admin/all')
  @ApiOperation({ summary: '[Admin] List semua bundle' })
  findAll() {
    return this.bundleService.findAll(false);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @Post()
  @ApiOperation({ summary: '[Admin] Buat bundle/hampers baru' })
  create(@Body() dto: CreateBundleDto) {
    return this.bundleService.create(dto);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @Patch(':id')
  @ApiOperation({ summary: '[Admin] Update bundle' })
  @ApiParam({ name: 'id' })
  update(@Param('id') id: string, @Body() dto: UpdateBundleDto) {
    return this.bundleService.update(id, dto);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @Delete(':id')
  @ApiOperation({ summary: '[Admin] Hapus bundle' })
  @ApiParam({ name: 'id' })
  remove(@Param('id') id: string) {
    return this.bundleService.remove(id);
  }
}

// ─── Module ──────────────────────────────────────────────────────────────────
// Simpan sebagai src/bundle/bundle.module.ts
