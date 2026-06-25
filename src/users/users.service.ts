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
          select: {
            points: true,
            lastDailyLoginAt: true,
          },
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
      select: { id: true, name: true, email: true, phone: true, role: true },
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
      data: { password: hashed, refreshToken: null },
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
    const address = await this.prisma.address.findUnique({ where: { id: addressId } });
    if (!address) throw new NotFoundException('Alamat tidak ditemukan');
    if (address.userId !== userId) throw new ForbiddenException('Akses ditolak');
    return address;
  }

  async createAddress(userId: string, dto: CreateAddressDto) {
    const { isDefault: wantsDefault, ...addressData } = dto;

    const count = await this.prisma.address.count({ where: { userId } });

    // FIX: alamat pertama selalu jadi default.
    // Alamat berikutnya jadi default hanya kalau user mencentang checkbox.
    const shouldBeDefault = count === 0 || wantsDefault === true;

    return this.prisma.$transaction(async (tx) => {
      // Jika akan jadi default, unset default yang lama dulu
      if (shouldBeDefault) {
        await tx.address.updateMany({
          where: { userId, isDefault: true },
          data: { isDefault: false },
        });
      }

      const address = await tx.address.create({
        data: { ...addressData, userId, isDefault: shouldBeDefault },
      });

      return { message: 'Alamat berhasil ditambahkan', address };
    });
  }

  async updateAddress(userId: string, addressId: string, dto: UpdateAddressDto) {
    await this.getAddressById(userId, addressId);

    const { isDefault: wantsDefault, ...addressData } = dto;

    // FIX: jika update dan user ingin set sebagai default,
    // jalankan via setDefaultAddress agar unset default lama dengan benar
    if (wantsDefault === true) {
      return this.prisma.$transaction(async (tx) => {
        await tx.address.updateMany({
          where: { userId, isDefault: true },
          data: { isDefault: false },
        });

        const address = await tx.address.update({
          where: { id: addressId },
          data: { ...addressData, isDefault: true },
        });

        return { message: 'Alamat berhasil diperbarui', address };
      });
    }

    // Update biasa tanpa mengubah status default
    const address = await this.prisma.address.update({
      where: { id: addressId },
      data: addressData,
    });

    return { message: 'Alamat berhasil diperbarui', address };
  }

  async setDefaultAddress(userId: string, addressId: string) {
    await this.getAddressById(userId, addressId);

    await this.prisma.$transaction([
      this.prisma.address.updateMany({ where: { userId }, data: { isDefault: false } }),
      this.prisma.address.update({ where: { id: addressId }, data: { isDefault: true } }),
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
              select: {
                id: true, name: true, slug: true,
                images: {
                  where: { imageType: 'main' },
                  select: { imageUrl: true, altText: true },
                  orderBy: { sortOrder: 'asc' },
                  take: 1,
                },
              },
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
              select: {
                id: true, name: true, slug: true,
                images: {
                  where: { imageType: 'main' },
                  select: { imageUrl: true, altText: true },
                  orderBy: { sortOrder: 'asc' },
                  take: 1,
                },
              },
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