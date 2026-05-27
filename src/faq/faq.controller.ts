import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { FaqService } from './faq.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators';
import { Role } from 'generated/prisma/enums';

@ApiTags('FAQ')
@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @ApiOperation({ summary: 'Get semua FAQ aktif (public)' })
  @ApiResponse({ status: 200, description: 'List FAQ berhasil diambil' })
  @Get()
  findAll() {
    return this.faqService.findAll();
  }

  @ApiOperation({ summary: 'Get FAQ by ID (public)' })
  @ApiParam({ name: 'id', description: 'FAQ ID' })
  @ApiResponse({ status: 200, description: 'FAQ ditemukan' })
  @ApiResponse({ status: 404, description: 'FAQ tidak ditemukan' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.faqService.findOne(id);
  }

  @ApiOperation({ summary: 'Buat FAQ baru (admin)' })
  @ApiResponse({ status: 201, description: 'FAQ berhasil dibuat' })
  @ApiResponse({ status: 400, description: 'Validasi gagal' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @Post()
  create(@Body() dto: CreateFaqDto) {
    return this.faqService.create(dto);
  }

  @ApiOperation({ summary: 'Update FAQ (admin)' })
  @ApiParam({ name: 'id', description: 'FAQ ID' })
  @ApiResponse({ status: 200, description: 'FAQ berhasil diupdate' })
  @ApiResponse({ status: 404, description: 'FAQ tidak ditemukan' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateFaqDto) {
    return this.faqService.update(id, dto);
  }

  @ApiOperation({ summary: 'Hapus FAQ (admin)' })
  @ApiParam({ name: 'id', description: 'FAQ ID' })
  @ApiResponse({ status: 204, description: 'FAQ berhasil dihapus' })
  @ApiResponse({ status: 404, description: 'FAQ tidak ditemukan' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.faqService.remove(id);
  }
}