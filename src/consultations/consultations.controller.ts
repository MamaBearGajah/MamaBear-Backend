import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ConsultationsService } from './consultations.service';

import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { ConsultationQueryDto } from './dto/consultation-query.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

import { Roles } from '../auth/decorators';
import { Public } from '../auth/decorators';
import { GetUser } from '../auth/decorators';

import { Role } from 'generated/prisma/enums';

@ApiTags('Consultations')
@Controller()
export class ConsultationsController {
  constructor(
    private readonly consultationsService: ConsultationsService,
  ) {}

  @Public()
  @Post('consultations')
  @ApiOperation({
    summary: 'Kirim form konsultasi',
  })
  @ApiResponse({
    status: 201,
    description: 'Konsultasi berhasil dikirim',
  })
  @ApiResponse({
    status: 400,
    description: 'Validasi gagal',
  })
  create(
    @Body() dto: CreateConsultationDto,
  ) {
    return this.consultationsService.create(dto);
  }

  @Get('admin/consultations')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @ApiOperation({
    summary: 'Ambil daftar konsultasi',
  })
  @ApiResponse({
    status: 200,
    description: 'Daftar konsultasi berhasil diambil',
  })
  findAll(
    @Query() query: ConsultationQueryDto,
  ) {
    return this.consultationsService.findAll(query);
  }

  @Get('admin/consultations/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @ApiOperation({
    summary: 'Detail konsultasi',
  })
  @ApiParam({
    name: 'id',
    description: 'Consultation ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Detail konsultasi berhasil diambil',
  })
  @ApiResponse({
    status: 404,
    description: 'Konsultasi tidak ditemukan',
  })
  findOne(
    @Param('id') id: string,
  ) {
    return this.consultationsService.findOne(id);
  }

  @Put('admin/consultations/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @ApiOperation({
    summary: 'Update status dan respon konsultasi',
  })
  @ApiParam({
    name: 'id',
    description: 'Consultation ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Konsultasi berhasil diupdate',
  })
  @ApiResponse({
    status: 404,
    description: 'Konsultasi tidak ditemukan',
  })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateConsultationDto,
     @GetUser('id') adminId: string, { id: string },
  ) {
    return this.consultationsService.updateStatus(
      id,
      dto,
      adminId,
    );
  }
}