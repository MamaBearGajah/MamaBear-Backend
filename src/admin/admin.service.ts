import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { OrderStatus } from '../../generated/prisma/enums.js';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const [
      totalUsers,
      totalProducts,
      totalOrders,
      pendingOrders,
      totalRevenue,
      recentOrders,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.product.count(),
      this.prisma.order.count(),
      this.prisma.order.count({ where: { status: 'pending' } }),
      this.prisma.order.aggregate({
        where: { paymentStatus: 'paid' },
        _sum: { total: true },
      }),
      this.prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
          user: { select: { name: true, email: true } },
          payment: { select: { status: true } },
        },
      }),
    ]);

    return {
      totalUsers,
      totalProducts,
      totalOrders,
      pendingOrders,
      totalRevenue: totalRevenue._sum.total ?? 0,
      recentOrders,
    };
  }

  // ── Users ──────────────────────────────────────
  async getUsers(page = 1, limit = 20) {
    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: { id: true, name: true, email: true, role: true, isVerified: true, createdAt: true },
      }),
      this.prisma.user.count(),
    ]);
    return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true, name: true, email: true, phone: true, role: true,
        isVerified: true, createdAt: true,
        addresses: true,
        membership: true,
        _count: { select: { orders: true } },
      },
    });
    if (!user) throw new NotFoundException('User tidak ditemukan');
    return user;
  }

  async updateUserRole(id: string, role: string) {
    const allowed = ['customer', 'admin', 'super_admin'];
    if (!allowed.includes(role)) throw new BadRequestException('Role tidak valid');

    return this.prisma.user.update({
      where: { id },
      data: { role: role as 'customer' | 'admin' | 'super_admin' },
      select: { id: true, name: true, email: true, role: true },
    });
  }

  async deleteUser(id: string) {
    await this.getUserById(id);
    await this.prisma.user.delete({ where: { id } });
    return { message: 'User berhasil dihapus' };
  }

  // ── Orders ────────────────────────────────────
  async getAllOrders(page = 1, limit = 20, status?: OrderStatus) {
    const where = status ? { status } : {};
    const [data, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { name: true, email: true } },
          payment: { select: { status: true, provider: true } },
        },
      }),
      this.prisma.order.count({ where }),
    ]);
    return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async updateOrderStatus(id: string, status: OrderStatus) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) throw new NotFoundException('Order tidak ditemukan');

    return this.prisma.order.update({
      where: { id },
      data: { status, ...(status === 'shipped' ? {} : {}) },
    });
  }

  async updateTrackingNumber(id: string, trackingNumber: string) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) throw new NotFoundException('Order tidak ditemukan');

    return this.prisma.order.update({
      where: { id },
      data: { trackingNumber, status: 'shipped' },
    });
  }

  async getOrderById(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true, phone: true } },
        address: true,
        items: { include: { product: { select: { name: true, sku: true } } } },
        payment: true,
      },
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async getCustomers(page = 1, limit = 20, q?: string) {
    const where: any = { role: 'customer' };
    if (q) where.OR = [{ name: { contains: q, mode: 'insensitive' } }, { email: { contains: q, mode: 'insensitive' } }];
    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: { id: true, name: true, email: true, phone: true, isVerified: true, createdAt: true },
      }),
      this.prisma.user.count({ where }),
    ]);
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async getCustomerById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true, name: true, email: true, phone: true, isVerified: true,
        membership: { select: { points: true, lastDailyLoginAt: true } },
        orders: {
          orderBy: { createdAt: 'desc' },
          take: 10,
          select: { id: true, status: true, total: true, createdAt: true },
        },
      },
    });
    if (!user) throw new NotFoundException('Customer not found');
    return user;
  }

  async bulkProducts(ids: string[], action: string, data?: { status?: string }) {
    if (action === 'delete') {
      const result = await this.prisma.product.deleteMany({ where: { id: { in: ids } } });
      return { updated: result.count, failed: 0 };
    }
    if (action === 'set_status' && data?.status) {
      const result = await this.prisma.product.updateMany({
        where: { id: { in: ids } },
        data: { status: data.status as any },
      });
      return { updated: result.count, failed: ids.length - result.count };
    }
    throw new BadRequestException('Invalid action');
  }
}
