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
@Roles(Role.super_admin) // hanya super_admin yang bisa manage admin accounts
@Controller('admin/users')
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  // ── GET /admin/users — list semua admin & super_admin ─────────────────────
  @Get()
  @ApiOperation({ summary: '[Super Admin] List semua akun admin' })
  @ApiResponse({ status: 200, description: 'List admin berhasil diambil' })
  findAll() {
    return this.adminUsersService.findAll();
  }

  // ── POST /admin/users — buat akun admin baru ──────────────────────────────
  @Post()
  @ApiOperation({ summary: '[Super Admin] Buat akun admin baru' })
  @ApiResponse({ status: 201, description: 'Admin berhasil dibuat' })
  @ApiResponse({ status: 409, description: 'Email sudah digunakan' })
  create(@Body() dto: CreateAdminUserDto) {
    return this.adminUsersService.create(dto);
  }

  // ── PATCH /admin/users/:id/role — ubah role admin ─────────────────────────
  @Patch(':id/role')
  @ApiOperation({ summary: '[Super Admin] Ubah role admin (admin ↔ super_admin)' })
  @ApiParam({ name: 'id', description: 'User ID admin yang akan diubah rolenya' })
  @ApiResponse({ status: 200, description: 'Role berhasil diubah' })
  @ApiResponse({ status: 400, description: 'Tidak dapat mengubah role sendiri' })
  @ApiResponse({ status: 403, description: 'Tidak boleh mengurangi super_admin terakhir' })
  updateRole(
    @Param('id') targetId: string,
    @Body() dto: UpdateAdminUserRoleDto,
    @GetUser('id') requesterId: string,
  ) {
    return this.adminUsersService.updateRole(targetId, dto, requesterId);
  }

  // ── PATCH /admin/users/:id/deactivate — nonaktifkan admin ────────────────
  @Patch(':id/deactivate')
  @ApiOperation({ summary: '[Super Admin] Nonaktifkan akun admin' })
  @ApiParam({ name: 'id', description: 'User ID admin yang akan dinonaktifkan' })
  @ApiResponse({ status: 200, description: 'Admin berhasil dinonaktifkan' })
  @ApiResponse({ status: 400, description: 'Tidak dapat menonaktifkan akun sendiri' })
  @ApiResponse({ status: 403, description: 'Tidak boleh menonaktifkan super_admin terakhir' })
  deactivate(
    @Param('id') targetId: string,
    @GetUser('id') requesterId: string,
  ) {
    return this.adminUsersService.deactivate(targetId, requesterId);
  }

  // ── PATCH /admin/users/:id/reactivate — aktifkan kembali admin ───────────
  @Patch(':id/reactivate')
  @ApiOperation({ summary: '[Super Admin] Aktifkan kembali akun admin yang dinonaktifkan' })
  @ApiParam({ name: 'id', description: 'User ID admin yang akan diaktifkan' })
  @ApiResponse({ status: 200, description: 'Admin berhasil diaktifkan' })
  reactivate(@Param('id') targetId: string) {
    return this.adminUsersService.reactivate(targetId);
  }
}
