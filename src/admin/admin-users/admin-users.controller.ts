import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators';
import { GetUser } from '../../auth/decorators';
import { Role } from '../../../generated/prisma/enums';
import { AdminUsersService } from './admin-users.service';
import { CreateAdminUserDto, UpdateAdminUserRoleDto } from './admin-users.dto';

@ApiTags('Admin Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.super_admin)
@Controller('admin/users')
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @Get()
  @ApiOperation({ summary: '[Super Admin] List semua akun admin' })
  @ApiResponse({ status: 200, description: 'List admin berhasil diambil' })
  findAll() {
    return this.adminUsersService.findAll();
  }

  @Post()
  @ApiOperation({ summary: '[Super Admin] Buat akun admin baru' })
  @ApiResponse({ status: 201, description: 'Admin berhasil dibuat' })
  @ApiResponse({ status: 409, description: 'Email sudah digunakan' })
  create(@Body() dto: CreateAdminUserDto) {
    return this.adminUsersService.create(dto);
  }

  @Patch(':id/role')
  @ApiOperation({ summary: '[Super Admin] Ubah role admin' })
  @ApiParam({ name: 'id', description: 'User ID admin yang akan diubah rolenya' })
  @ApiResponse({ status: 200, description: 'Role berhasil diubah' })
  updateRole(
    @Param('id') targetId: string,
    @Body() dto: UpdateAdminUserRoleDto,
    @GetUser('id') requesterId: string,
  ) {
    return this.adminUsersService.updateRole(targetId, dto, requesterId);
  }

  @Patch(':id/deactivate')
  @ApiOperation({ summary: '[Super Admin] Nonaktifkan akun admin' })
  @ApiParam({ name: 'id', description: 'User ID admin yang akan dinonaktifkan' })
  @ApiResponse({ status: 200, description: 'Admin berhasil dinonaktifkan' })
  deactivate(
    @Param('id') targetId: string,
    @GetUser('id') requesterId: string,
  ) {
    return this.adminUsersService.deactivate(targetId, requesterId);
  }

  @Patch(':id/reactivate')
  @ApiOperation({ summary: '[Super Admin] Aktifkan kembali akun admin' })
  @ApiParam({ name: 'id', description: 'User ID admin yang akan diaktifkan' })
  @ApiResponse({ status: 200, description: 'Admin berhasil diaktifkan' })
  reactivate(@Param('id') targetId: string) {
    return this.adminUsersService.reactivate(targetId);
  }
}