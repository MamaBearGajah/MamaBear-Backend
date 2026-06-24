import { Controller, Post, Get, Put, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { ConsultationsService } from './consultations.service';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { ConsultationQueryDto } from './dto/consultation-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators';
import { Role } from 'generated/prisma/enums';
import { Public } from '../auth/decorators';

@ApiTags('Consultations')
@Controller()
export class ConsultationsController {
  constructor(private readonly consultationsService: ConsultationsService) {}

  @ApiOperation({ summary: 'Kirim form konsultasi (public)' })
  @ApiResponse({ status: 201, description: 'Konsultasi berhasil dikirim' })
  @ApiResponse({ status: 400, description: 'Validasi gagal' })
  @Public()
  @Post('consultations')
  create(@Body() dto: CreateConsultationDto) {
    return this.consultationsService.create(dto);
  }

  @ApiOperation({ summary: 'Get semua konsultasi (admin)' })
  @ApiResponse({ status: 200, description: 'List konsultasi berhasil diambil' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @Get('admin/consultations')
  findAll(@Query() query: ConsultationQueryDto) {
    return this.consultationsService.findAll(query);
  }

  @ApiOperation({ summary: 'Update status konsultasi (admin)' })
  @ApiParam({ name: 'id', description: 'Consultation ID' })
  @ApiResponse({ status: 200, description: 'Status berhasil diupdate' })
  @ApiResponse({ status: 404, description: 'Konsultasi tidak ditemukan' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @Put('admin/consultations/:id')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateConsultationDto) {
    return this.consultationsService.updateStatus(id, dto);
  }
}