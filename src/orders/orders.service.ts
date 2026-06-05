import { Prisma, OrderStatus } from './../../generated/prisma/client';
import { BadRequestException, ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ShippingService } from '../shipping/shipping.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly shippingService: ShippingService,
    private readonly mailService: MailService,
  ) {}

  // ─── Generate Order Number ───────────────────────────────────────────────────
  private async generateOrderNumber(): Promise<string> {
    const now = new Date();
    const prefix = `ORB-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;

    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);

    const countToday = await this.prisma.order.count({
      where: { createdAt: { gte: startOfDay, lt: endOfDay } },
    });

    const seq = String(countToday + 1).padStart(4, '0');
    return `${prefix}-${seq}`;
  }

  // ─── Create Order ────────────────────────────────────────────────────────────
  async create(userId: string, dto: CreateOrderDto) {
    const cart = await this.prisma.cart.findFirst({
      where: { userId },
      include: {
        items: {
          include: {
            variant: { include: { product: true } },
            product: true,
          },
        },
      },
    });
    if (!cart || cart.items.length === 0) throw new BadRequestException('Cart is empty or not found');

    for (const item of cart.items) {
      if (!item.variant) throw new BadRequestException(`Product variant not found for cart item ${item.id}`);
      if (item.variant.stock < item.quantity) throw new BadRequestException(`Insufficient stock for: ${item.variant.product?.name ?? item.productId}`);

      const price = item.variant.basePrice ?? item.price;
      if (!price || Number(price) <= 0) throw new BadRequestException(`Invalid price for product: ${item.variant.product?.name ?? item.productId}`);
    }

    const address = await this.prisma.address.findFirst({
      where: { id: dto.addressId, userId },
    });
    if (!address) throw new NotFoundException('Address not found');

    const totalWeight = cart.items.reduce((sum, item) => {
      const weight = item.product?.weight ?? 0;
      return sum + weight * item.quantity;
    }, 0);

    const shippingOptions = await this.shippingService.calculateCost({
      originCityId: process.env.WAREHOUSE_CITY_ID!,
      destinationCityId: address.cityId,
      weight: totalWeight,
      courier: dto.courier,
    });

    const selectedService = shippingOptions
      .flatMap((o: any) => o.cost)
      .find((c: any) => c.service === dto.service);
    if (!selectedService) throw new BadRequestException('Shipping service not available');

    const shippingCost = selectedService.cost[0].value;

    const subtotal = cart.items.reduce((sum, item) => {
      const price = Number(item.variant?.basePrice ?? item.price ?? 0);
      return sum + price * item.quantity;
    }, 0);

    const total = subtotal + shippingCost;
    const orderNumber = await this.generateOrderNumber();

    const order = await this.prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          userId,
          addressId: dto.addressId,
          voucherId: dto.voucherId ?? null,
          courier: dto.courier,
          service: dto.service,
          notes: dto.notes ?? null,
          subtotal: new Prisma.Decimal(subtotal),
          shippingCost: new Prisma.Decimal(shippingCost),
          total: new Prisma.Decimal(total),
          status: 'pending',
          paymentStatus: 'pending',
        },
      });

      await tx.orderItem.createMany({
        data: cart.items.map((item) => ({
          orderId: newOrder.id,
          productId: item.productId,
          productName: item.product?.name ?? 'Unknown Product',
          variantId: item.variantId ?? null,
          variantName: item.variant ? `${item.variant.name}: ${item.variant.value}` : null,
          quantity: item.quantity,
          price: item.variant?.basePrice ?? item.price,
        })),
      });

      await tx.orderStatusHistory.create({
        data: {
          orderId: newOrder.id,
          status: 'pending',
          note: 'Order created successfully',
        },
      });

      for (const item of cart.items) {
        if (item.variantId) {
          await tx.productVariant.update({
            where: { id: item.variantId },
            data: { stock: { decrement: item.quantity } },
          });
        }
      }

      const productSoldMap = cart.items.reduce<Record<string, number>>((acc, item) => {
        acc[item.productId] = (acc[item.productId] ?? 0) + item.quantity;
        return acc;
      }, {});

      for (const [productId, qty] of Object.entries(productSoldMap)) {
        await tx.product.update({
          where: { id: productId },
          data: { soldCount: { increment: qty } },
        });
      }

      await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

      return newOrder;
    });

    return this.findOne(userId, order.id);
  }

  // ─── Find All Orders ─────────────────────────────────────────────────────────
  async findAll(userId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          items: { include: { variant: { include: { product: true } } } },
          address: true,
          payment: true,
        },
      }),
      this.prisma.order.count({ where: { userId } }),
    ]);

    return {
      data: orders,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // ─── Find One Order ──────────────────────────────────────────────────────────
  async findOne(userId: string, orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: { include: { variant: { include: { product: true } } } },
        address: true,
        payment: true,
      },
    });
    if (!order) throw new NotFoundException('Order not found');
    if (order.userId !== userId) throw new ForbiddenException('Access denied');

    return order;
  }

  // ─── Update Status (admin) ───────────────────────────────────────────────────
  async updateStatus(orderId: string, dto: UpdateOrderDto) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: { select: { email: true, name: true } },
        items: true,
      },
    });
    if (!order) throw new NotFoundException('Order not found');

    const status = dto.status as OrderStatus;

    const updated = await this.prisma.order.update({
      where: { id: orderId },
      data: {
        status,
        ...(dto.trackingNumber && { trackingNumber: dto.trackingNumber }),
        ...(status === OrderStatus.delivered && { deliveredAt: new Date() }),
        ...(status === OrderStatus.cancelled && { cancelledAt: new Date(), cancelReason: dto.note }),
      },
    });

    await this.prisma.orderStatusHistory.create({
      data: {
        orderId,
        status,
        note: dto.note ?? null,
      },
    });

    // Kirim email shipping notification saat status → shipped
    if (status === OrderStatus.shipped && dto.trackingNumber) {
      this.mailService
        .sendShippingNotification({
          email: order.user.email,
          name: order.user.name,
          orderNumber: order.orderNumber,
          trackingNumber: dto.trackingNumber,
          courier: order.courier,
          service: order.service,
        })
        .catch((err) => this.logger.error('Failed to send shipping notification email', err));
    }

    return updated;
  }

  // ─── Cancel Order ────────────────────────────────────────────────────────────
  async cancel(userId: string, orderId: string) {
    const order = await this.findOne(userId, orderId);

    if (order.status !== 'pending') throw new BadRequestException('Only pending orders can be cancelled');

    return this.prisma.$transaction(async (tx) => {
      const cancelled = await tx.order.update({
        where: { id: orderId },
        data: { status: 'cancelled', cancelledAt: new Date() },
      });

      await tx.orderStatusHistory.create({
        data: {
          orderId,
          status: 'cancelled',
          note: 'Order cancelled by user',
        },
      });

      for (const item of order.items) {
        if (item.variantId) {
          await tx.productVariant.update({
            where: { id: item.variantId },
            data: { stock: { increment: item.quantity } },
          });
        }
      }

      const productSoldMap = order.items.reduce<Record<string, number>>((acc, item) => {
        acc[item.productId] = (acc[item.productId] ?? 0) + item.quantity;
        return acc;
      }, {});

      for (const [productId, qty] of Object.entries(productSoldMap)) {
        await tx.product.update({
          where: { id: productId },
          data: { soldCount: { decrement: qty } },
        });
      }

      return cancelled;
    });
  }
}