import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAdminOrders(
    page = 1,
    limit = 10,
    status?: string,
    paymentStatus?: string,
  ) {
    const skip = (page - 1) * limit;

    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (paymentStatus) {
      where.payment = {
        status: paymentStatus,
      };
    }

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: true,
          payment: true,
          items: true,
        },
      }),
      this.prisma.order.count({ where }),
    ]);

    return {
      data: orders,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async updateOrderStatus(orderId: string, newStatus: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException('Order tidak ditemukan');
    }

    const allowedTransitions: Record<string, string[]> = {
      pending: ['paid'],
      paid: ['processing'],
      processing: ['shipped'],
      shipped: ['delivered'],
    };

    const currentStatus = String(order.status);

    if (!allowedTransitions[currentStatus]?.includes(newStatus)) {
      throw new BadRequestException(
        `Transisi status tidak valid: ${currentStatus} -> ${newStatus}`,
      );
    }

    return this.prisma.order.update({
      where: { id: orderId },
      data: {
        status: newStatus as any,
      },
    });
  }

  async updateTrackingNumber(orderId: string, trackingNumber: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException('Order tidak ditemukan');
    }

    return this.prisma.order.update({
      where: { id: orderId },
      data: {
        trackingNumber,
      },
    });
  }
}
