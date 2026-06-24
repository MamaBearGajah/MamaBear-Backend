import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAdminUserDto, UpdateAdminUserRoleDto } from './admin-users.dto';

@Injectable()
export class AdminUsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const admins = await this.prisma.user.findMany({
      where: {
        role: { in: ['admin', 'super_admin'] },
        deletedAt: null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        isVerified: true,
        bannedAt: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return { data: admins, total: admins.length };
  }

  async create(dto: CreateAdminUserDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) throw new ConflictException('Email sudah digunakan');

    const hashed = await bcrypt.hash(dto.password, 10);

    const admin = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashed,
        role: dto.role ?? 'admin',
        isVerified: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isVerified: true,
        createdAt: true,
      },
    });

    return { message: 'Admin berhasil dibuat', data: admin };
  }

  async updateRole(
    targetId: string,
    dto: UpdateAdminUserRoleDto,
    requesterId: string,
  ) {
    if (targetId === requesterId)
      throw new BadRequestException('Tidak dapat mengubah role sendiri');

    const target = await this.prisma.user.findUnique({ where: { id: targetId } });
    if (!target) throw new NotFoundException('Admin tidak ditemukan');
    if (target.role === 'customer')
      throw new BadRequestException('User ini bukan admin');

    if (target.role === 'super_admin' && dto.role === 'admin') {
      const count = await this.prisma.user.count({
        where: { role: 'super_admin', deletedAt: null },
      });
      if (count <= 1)
        throw new ForbiddenException(
          'Tidak dapat mengubah role: minimal harus ada 1 super_admin aktif',
        );
    }

    const updated = await this.prisma.user.update({
      where: { id: targetId },
      data: { role: dto.role },
      select: { id: true, name: true, email: true, role: true },
    });

    return { message: 'Role berhasil diubah', data: updated };
  }

  async deactivate(targetId: string, requesterId: string) {
    if (targetId === requesterId)
      throw new BadRequestException('Tidak dapat menonaktifkan akun sendiri');

    const target = await this.prisma.user.findUnique({ where: { id: targetId } });
    if (!target) throw new NotFoundException('Admin tidak ditemukan');
    if (target.role === 'customer')
      throw new BadRequestException('User ini bukan admin');

    if (target.role === 'super_admin') {
      const count = await this.prisma.user.count({
        where: { role: 'super_admin', deletedAt: null, bannedAt: null },
      });
      if (count <= 1)
        throw new ForbiddenException(
          'Tidak dapat menonaktifkan: minimal harus ada 1 super_admin aktif',
        );
    }

    await this.prisma.user.update({
      where: { id: targetId },
      data: { bannedAt: new Date(), banReason: 'Dinonaktifkan oleh super_admin' },
    });

    return { message: 'Akun admin berhasil dinonaktifkan' };
  }

  async reactivate(targetId: string) {
    const target = await this.prisma.user.findUnique({ where: { id: targetId } });
    if (!target) throw new NotFoundException('Admin tidak ditemukan');

    await this.prisma.user.update({
      where: { id: targetId },
      data: { bannedAt: null, banReason: null },
    });

    return { message: 'Akun admin berhasil diaktifkan kembali' };
  }
}