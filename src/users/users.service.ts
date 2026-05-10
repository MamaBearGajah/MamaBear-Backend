import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { ChangePasswordDto, CreateAddressDto, UpdateAddressDto, UpdateProfileDto } from './dto/users.dto';


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // ─────────────────────────────────────────────
  // PROFILE
  // ─────────────────────────────────────────────
  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        isVerified: true,
        createdAt: true,
        membership: {
          select: { points: true, lastDailyLoginAt: true },
        },
      },
    });

    if (!user) throw new NotFoundException('User tidak ditemukan');
    return user;
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: dto,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
      },
    });

    return { message: 'Profil berhasil diperbarui', user };
  }

  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User tidak ditemukan');

    const match = await bcrypt.compare(dto.oldPassword, user.password);
    if (!match) throw new BadRequestException('Password lama tidak sesuai');

    if (dto.oldPassword === dto.newPassword)
      throw new BadRequestException('Password baru tidak boleh sama dengan password lama');

    const hashed = await bcrypt.hash(dto.newPassword, 10);
    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashed, refreshToken: null }, // invalidate sesi aktif
    });

    return { message: 'Password berhasil diubah. Silakan login kembali.' };
  }

  // ─────────────────────────────────────────────
  // ADDRESSES
  // ─────────────────────────────────────────────
  async getAddresses(userId: string) {
    return this.prisma.address.findMany({
      where: { userId },
      orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
    });
  }

  async getAddressById(userId: string, addressId: string) {
    const address = await this.prisma.address.findUnique({
      where: { id: addressId },
    });

    if (!address) throw new NotFoundException('Alamat tidak ditemukan');
    if (address.userId !== userId) throw new ForbiddenException('Akses ditolak');

    return address;
  }

  async createAddress(userId: string, dto: CreateAddressDto) {
    // Jika ini alamat pertama, jadikan default otomatis
    const count = await this.prisma.address.count({ where: { userId } });
    const isDefault = count === 0;

    const address = await this.prisma.address.create({
      data: { ...dto, userId, isDefault },
    });

    return { message: 'Alamat berhasil ditambahkan', address };
  }

  async updateAddress(userId: string, addressId: string, dto: UpdateAddressDto) {
    await this.getAddressById(userId, addressId); // validasi kepemilikan

    const address = await this.prisma.address.update({
      where: { id: addressId },
      data: dto,
    });

    return { message: 'Alamat berhasil diperbarui', address };
  }

  async setDefaultAddress(userId: string, addressId: string) {
    await this.getAddressById(userId, addressId); // validasi kepemilikan

    // Reset semua alamat user, lalu set yang dipilih jadi default
    await this.prisma.$transaction([
      this.prisma.address.updateMany({
        where: { userId },
        data: { isDefault: false },
      }),
      this.prisma.address.update({
        where: { id: addressId },
        data: { isDefault: true },
      }),
    ]);

    return { message: 'Alamat default berhasil diubah' };
  }

  async deleteAddress(userId: string, addressId: string) {
    const address = await this.getAddressById(userId, addressId);

    if (address.isDefault) {
      throw new BadRequestException(
        'Tidak dapat menghapus alamat default. Ubah alamat default terlebih dahulu.',
      );
    }

    await this.prisma.address.delete({ where: { id: addressId } });
    return { message: 'Alamat berhasil dihapus' };
  }

  // ─────────────────────────────────────────────
  // ORDERS
  // ─────────────────────────────────────────────
  async getOrders(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: {
            product: {
              select: { id: true, name: true, mainImage: true, slug: true },
            },
          },
        },
        payment: { select: { status: true, provider: true, paymentUrl: true } },
        address: { select: { receiverName: true, address: true, cityId: true } },
      },
    });
  }

  async getOrderById(userId: string, orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: {
              select: { id: true, name: true, mainImage: true, slug: true },
            },
          },
        },
        payment: true,
        address: true,
      },
    });

    if (!order) throw new NotFoundException('Order tidak ditemukan');
    if (order.userId !== userId) throw new ForbiddenException('Akses ditolak');

    return order;
  }
}