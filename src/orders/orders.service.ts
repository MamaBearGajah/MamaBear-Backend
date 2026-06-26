import { Prisma, OrderStatus } from './../../generated/prisma/client';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ShippingService } from '../shipping/shipping.service';
import { MailService } from '../mail/mail.service';
import { MembershipService } from '../membership/membership.service';
import { VoucherService } from '../voucher/voucher.service';
import { createObjectCsvStringifier } from 'csv-writer';

function parseEtdToDate(etd: string | undefined, from: Date = new Date()): Date | null {
  if (!etd) return null;
  const match = etd.match(/\d+/g);
  if (!match || match.length === 0) return null;
  const maxDays = Math.max(...match.map(Number));
  if (!Number.isFinite(maxDays) || maxDays <= 0) return null;
  const date = new Date(from);
  date.setDate(date.getDate() + maxDays);
  return date;
}

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly shippingService: ShippingService,
    private readonly mailService: MailService,
    private readonly membershipService: MembershipService,
    private readonly voucherService: VoucherService,
  ) {}

  // ─── Generate Order Number ────────────────────────────────────────────────
  private async generateOrderNumber(): Promise<string> {
    const now = new Date();
    const prefix = `ORB-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);
    const countToday = await this.prisma.order.count({
      where: { createdAt: { gte: startOfDay, lt: endOfDay } },
    });
    return `${prefix}-${String(countToday + 1).padStart(4, '0')}`;
  }

  // ─── Create Order ─────────────────────────────────────────────────────────
  async create(userId: string, dto: CreateOrderDto) {
    const cart = await this.prisma.cart.findFirst({
      where: { userId },
      include: {
        items: { include: { variant: { include: { product: true } }, product: true } },
      },
    });
    if (!cart || cart.items.length === 0)
      throw new BadRequestException('Cart is empty or not found');

    for (const item of cart.items) {
      if (!item.variant)
        throw new BadRequestException(`Product variant not found for cart item ${item.id}`);
      if (item.variant.stock < item.quantity)
        throw new BadRequestException(`Insufficient stock for: ${item.variant.product?.name ?? item.productId}`);
    }

    const address = await this.prisma.address.findFirst({ where: { id: dto.addressId, userId } });
    if (!address) throw new NotFoundException('Address not found');

    const totalWeight = cart.items.reduce(
      (sum, item) => sum + (item.product?.weight ?? 0) * item.quantity,
      0,
    );

    const shippingOptions = await this.shippingService.calculateCost({
      originCityId: process.env.WAREHOUSE_CITY_ID!,
      destinationCityId: address.cityId,
      weight: totalWeight,
      courier: dto.courier,
    });

    const selectedService = shippingOptions.find(
      (c: any) => c.service?.toLowerCase() === dto.service?.toLowerCase(),
    );
    if (!selectedService) {
      throw new BadRequestException(
        `Shipping service "${dto.service}" not available for courier "${dto.courier}"`,
      );
    }

    const shippingCost: number = selectedService.cost;
    const estimatedDelivery = parseEtdToDate(selectedService.etd);

    // FIX: pakai discountPrice jika ada, supaya konsisten dengan kalkulasi subtotal di frontend
    const subtotal = cart.items.reduce((sum, item) => {
      const price = Number(
        item.variant?.discountPrice ?? item.variant?.basePrice ?? item.price ?? 0
      );
      return sum + price * item.quantity;
    }, 0);

    // ── Voucher ───────────────────────────────────────────────────────────────
    let discountAmount   = 0; // diskon dari voucher produk
    let discountShipping = 0; // diskon dari voucher ongkir (NEW)

    const resolvedVoucherId         = dto.voucherId ?? null;
    const resolvedVoucherShippingId = dto.voucherShippingId ?? null; // NEW

    const orderNumber = await this.generateOrderNumber();

    const now = new Date();
    const paymentDeadline = new Date(now.getTime() + 2 * 60 * 60 * 1000);  // +2 jam
    const cancelDeadline  = new Date(now.getTime() + 30 * 60 * 1000);      // +30 menit

    const order = await this.prisma.$transaction(async (tx) => {
      // 1. Apply voucher produk (potongan harga)
      if (resolvedVoucherId) {
        const applied = await this.voucherService.applyVoucher(
          tx,
          resolvedVoucherId,
          subtotal,
          userId,
          0, // shippingCost tidak relevan untuk voucher produk
        );
        discountAmount = applied.discountAmount;
      }

      // 2. Apply voucher ongkir (NEW)
      if (resolvedVoucherShippingId) {
        const appliedShipping = await this.voucherService.applyVoucher(
          tx,
          resolvedVoucherShippingId,
          subtotal,
          userId,
          shippingCost, // pass ongkir aktual supaya discountAmount = nilai ongkir
        );
        discountShipping = appliedShipping.discountAmount;
      }

      // Total = subtotal - diskon produk + ongkir - diskon ongkir
      const total = Math.max(0, subtotal - discountAmount + shippingCost - discountShipping);

      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          userId,
          addressId:          dto.addressId,
          voucherId:          resolvedVoucherId,
          voucherShippingId:  resolvedVoucherShippingId, // NEW
          courier:            dto.courier,
          service:            dto.service,
          notes:              dto.notes ?? null,
          subtotal:           new Prisma.Decimal(subtotal),
          discountAmount:     new Prisma.Decimal(discountAmount),
          discountShipping:   new Prisma.Decimal(discountShipping), // NEW
          shippingCost:       new Prisma.Decimal(shippingCost),
          total:              new Prisma.Decimal(total),
          status:             'pending',
          paymentStatus:      'pending',
          paymentDeadline,
          cancelDeadline,
          estimatedDelivery,
        },
      });

      await tx.orderItem.createMany({
        data: cart.items.map((item) => ({
          orderId:     newOrder.id,
          productId:   item.productId,
          productName: item.product?.name ?? 'Unknown Product',
          variantId:   item.variantId ?? null,
          variantName: item.variant ? `${item.variant.name}: ${item.variant.value}` : null,
          quantity:    item.quantity,
          price:       item.variant?.basePrice ?? item.price,
          notes:       item.notes ?? null,
        })),
      });

      await tx.orderStatusHistory.create({
        data: { orderId: newOrder.id, status: 'pending', note: 'Order created successfully' },
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
        await tx.product.update({ where: { id: productId }, data: { soldCount: { increment: qty } } });
      }

      await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
      return newOrder;
    });

    return this.findOne(userId, order.id);
  }

  // ─── Find All (user) ──────────────────────────────────────────────────────
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
          voucher:         { select: { code: true, type: true, value: true } },
          voucherShipping: { select: { code: true, type: true, value: true } }, // NEW
        },
      }),
      this.prisma.order.count({ where: { userId } }),
    ]);

    return { data: orders, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  // ─── Find All Admin ───────────────────────────────────────────────────────
  async findAllAdmin(status: OrderStatus, q: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const where: Prisma.OrderWhereInput = {};

    if (status) where.status = status;
    if (q) {
      where.OR = [
        { orderNumber: { contains: q, mode: 'insensitive' } },
        { user: { name: { contains: q, mode: 'insensitive' } } },
        { user: { email: { contains: q, mode: 'insensitive' } } },
      ];
    }

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          payment: { select: { id: true, status: true, paymentMethod: true } },
          user: { select: { id: true, name: true, email: true, phone: true } },
          voucher:         { select: { code: true, type: true, value: true } },
          voucherShipping: { select: { code: true, type: true, value: true } }, // NEW
          _count: { select: { items: true } },
        },
      }),
      this.prisma.order.count({ where }),
    ]);

    return {
      data: orders,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  // ─── Find One (user — cek ownership) ─────────────────────────────────────
  async findOne(userId: string, orderId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, role: true },
    });

    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            variant: true,
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                images: { where: { isFeatured: true }, take: 1 },
              },
            },
          },
        },
        address: true,
        payment: true,
        voucher:         { select: { code: true, type: true, value: true } },
        voucherShipping: { select: { code: true, type: true, value: true } }, // NEW
        statusHistory: { orderBy: { createdAt: 'asc' } },
        user: { select: { id: true, name: true, email: true } },
      },
    });

    if (!order) throw new NotFoundException('Order not found');
    if (
      order.userId !== userId &&
      user?.role !== 'admin' &&
      user?.role !== 'super_admin'
    )
      throw new ForbiddenException('Access denied');

    return order;
  }

  // ─── Find One Admin (tanpa cek ownership) ────────────────────────────────
  async findOneAdmin(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            variant: true,
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                images: { where: { isFeatured: true }, take: 1 },
              },
            },
          },
        },
        address: true,
        payment: true,
        voucher:         { select: { code: true, type: true, value: true } },
        voucherShipping: { select: { code: true, type: true, value: true } }, // NEW
        statusHistory: { orderBy: { createdAt: 'asc' } },
        user: { select: { id: true, name: true, email: true, phone: true } },
      },
    });

    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  // ─── Update Status (admin) ────────────────────────────────────────────────
  async updateStatus(orderId: string, dto: UpdateOrderDto) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { user: { select: { email: true, name: true } }, items: true },
    });
    if (!order) throw new NotFoundException('Order not found');

    const status = dto.status as OrderStatus;

    const updated = await this.prisma.order.update({
      where: { id: orderId },
      data: {
        status,
        ...(dto.trackingNumber && { trackingNumber: dto.trackingNumber }),
        ...(status === OrderStatus.delivered  && { deliveredAt: new Date() }),
        ...(status === OrderStatus.cancelled  && { cancelledAt: new Date(), cancelReason: dto.note }),
      },
    });

    await this.prisma.orderStatusHistory.create({
      data: { orderId, status, note: dto.note ?? null },
    });

    if (status === OrderStatus.delivered) {
      this.membershipService
        .processPurchase(order.userId, Number(order.total), orderId)
        .catch((err) => this.logger.error(`Membership processing failed for order ${orderId}`, err));
    }

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

  // ─── Cancel Order (user) ──────────────────────────────────────────────────
  async cancel(userId: string, orderId: string) {
    const order = await this.findOne(userId, orderId);

    if (order.status !== 'pending')
      throw new BadRequestException('Hanya order dengan status pending yang bisa dibatalkan');

    if (order.cancelDeadline && new Date() > order.cancelDeadline) {
      throw new BadRequestException(
        'Batas waktu pembatalan (30 menit) telah terlewati. Untuk membatalkan order, silakan hubungi Customer Service kami.',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      const cancelled = await tx.order.update({
        where: { id: orderId },
        data: { status: 'cancelled', cancelledAt: new Date() },
      });

      await tx.orderStatusHistory.create({
        data: { orderId, status: 'cancelled', note: 'Order cancelled by user' },
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

  // ─── Order Tracking (public via orderNumber) ──────────────────────────────
  async trackOrder(orderNumber: string) {
    const order = await this.prisma.order.findUnique({
      where: { orderNumber },
      select: {
        orderNumber: true,
        status: true,
        paymentStatus: true,
        trackingNumber: true,
        courier: true,
        service: true,
        estimatedDelivery: true,
        deliveredAt: true,
        cancelledAt: true,
        paymentDeadline: true,
        cancelDeadline: true,
        createdAt: true,
        statusHistory: {
          orderBy: { createdAt: 'asc' },
          select: { status: true, note: true, createdAt: true },
        },
      },
    });
    if (!order) throw new NotFoundException('Order tidak ditemukan');
    return order;
  }

  // ─── Get Admin Orders (legacy helper) ────────────────────────────────────
  async getAdminOrders(page = 1, limit = 10, status?: string, paymentStatus?: string) {
    const skip = (page - 1) * limit;
    const where: any = {};

    if (status) where.status = status;
    if (paymentStatus) where.payment = { status: paymentStatus };

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { user: true, payment: true, items: true },
      }),
      this.prisma.order.count({ where }),
    ]);

    return {
      data: orders,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  // ─── Update Tracking Number (legacy helper) ───────────────────────────────
  async updateTrackingNumber(orderId: string, trackingNumber: string) {
    const order = await this.prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new NotFoundException('Order tidak ditemukan');

    return this.prisma.order.update({
      where: { id: orderId },
      data: { trackingNumber },
    });
  }

  // ─── Export Orders to CSV (Admin) ─────────────────────────────────────────
  async exportOrdersToCsv(): Promise<string> {
    const orders = await this.prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user:    { select: { name: true, email: true } },
        address: { select: { receiverName: true, phone: true, cityId: true, provinceId: true } },
        payment: { select: { provider: true, status: true } },
        _count:  { select: { items: true } },
      },
    });

    const csvStringifier = createObjectCsvStringifier({
      header: [
        { id: 'orderNumber',     title: 'ORDER_NUMBER' },
        { id: 'createdAt',       title: 'DATE' },
        { id: 'customerName',    title: 'CUSTOMER_NAME' },
        { id: 'customerEmail',   title: 'CUSTOMER_EMAIL' },
        { id: 'recipient',       title: 'RECIPIENT' },
        { id: 'phone',           title: 'PHONE' },
        { id: 'cityId',          title: 'CITY_ID' },
        { id: 'provinceId',      title: 'PROVINCE_ID' },
        { id: 'status',          title: 'STATUS' },
        { id: 'paymentStatus',   title: 'PAYMENT_STATUS' },
        { id: 'paymentProvider', title: 'PAYMENT_PROVIDER' },
        { id: 'courier',         title: 'COURIER' },
        { id: 'service',         title: 'SERVICE' },
        { id: 'trackingNumber',  title: 'TRACKING_NUMBER' },
        { id: 'itemCount',       title: 'ITEM_COUNT' },
        { id: 'subtotal',        title: 'SUBTOTAL' },
        { id: 'discountAmount',  title: 'DISCOUNT_PRODUCT' },
        { id: 'discountShipping',title: 'DISCOUNT_SHIPPING' },
        { id: 'shippingCost',    title: 'SHIPPING_COST' },
        { id: 'total',           title: 'TOTAL' },
      ],
    });

    const records = orders.map((o) => ({
      orderNumber:      o.orderNumber,
      createdAt:        o.createdAt.toISOString().slice(0, 19).replace('T', ' '),
      customerName:     o.user.name,
      customerEmail:    o.user.email,
      recipient:        o.address.receiverName,
      phone:            o.address.phone,
      cityId:           o.address.cityId,
      provinceId:       o.address.provinceId,
      status:           o.status,
      paymentStatus:    o.paymentStatus,
      paymentProvider:  o.payment?.provider ?? '',
      courier:          o.courier,
      service:          o.service,
      trackingNumber:   o.trackingNumber ?? '',
      itemCount:        o._count.items,
      subtotal:         Number(o.subtotal).toFixed(0),
      discountAmount:   Number(o.discountAmount).toFixed(0),
      discountShipping: Number((o as any).discountShipping ?? 0).toFixed(0),
      shippingCost:     Number(o.shippingCost).toFixed(0),
      total:            Number(o.total).toFixed(0),
    }));

    return csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(records);
  }
}