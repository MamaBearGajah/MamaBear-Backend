import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators';
import { Role } from '../../../generated/prisma/enums';
import { AdminCustomersService } from './admin-customers.service';
import { AdminBaseQueryDto } from '../dto/admin-query.dto';

@ApiTags('Admin Customers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.admin, Role.super_admin)
@Controller('admin/customers')
export class AdminCustomersController {
  constructor(private readonly adminCustomersService: AdminCustomersService) {}

  @Get()
  @ApiOperation({ summary: '[Admin] List customers dengan pagination & search' })
  @ApiResponse({ status: 200, description: 'List customers berhasil diambil' })
  getAll(@Query() query: AdminBaseQueryDto) {
    return this.adminCustomersService.findAll(query);
  }

  // ← FIX: endpoint detail customer + order history
  @Get(':id')
  @ApiOperation({ summary: '[Admin] Detail customer by ID — includes profile + order history' })
  @ApiParam({ name: 'id', description: 'Customer (User) ID' })
  @ApiResponse({ status: 200, description: 'Detail customer berhasil diambil' })
  @ApiResponse({ status: 404, description: 'Customer tidak ditemukan' })
  getById(@Param('id') id: string) {
    return this.adminCustomersService.findById(id);
  }
}