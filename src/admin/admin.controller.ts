import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { AdminService } from './admin.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators';
import { Role } from 'generated/prisma/enums';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.admin, Role.super_admin)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  
  @Get('customers')
  getCustomers(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
  ) {
    return this.adminService.getCustomers(
      Number(page) || 1,
      Number(limit) || 10,
      search,
    );
  }

  @Get('customers/:id')
  getCustomerById(@Param('id') id: string) {
    return this.adminService.getCustomerById(id);
  }
}
