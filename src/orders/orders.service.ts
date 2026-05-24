import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateOrderDto) {
    const address = await this.prisma.address.findUnique({ where: { id: dto.addressId } });
    if (!address) throw new NotFoundException('Alamat tidak ditemukan');
    if (address.userId !== userId) throw new ForbiddenException('Akses ditolak');

    // Resolve products & calculate totals
    const resolvedItems = await Promise.all(
      dto.items.map(async (item) => {
        const product = await this.prisma.product.findUnique({ where: { id: item.productId } });
        if (!product) throw new NotFoundException(`Produk ${item.productId} tidak ditemukan`);
        if (product.stock < item.quantity)
          throw new BadRequestException(`Stok ${product.name} tidak mencukupi`);
        const price = product.discountPrice ?? product.basePrice;
        return { ...item, price };
      }),
    );

    const subtotal = resolvedItems.reduce(
      (sum, i) => sum + Number(i.price) * i.quantity,
      0,
    );

    // Shipping cost stored separately — caller passes it in service layer
    // For now use 0 as placeholder; payment flow will finalize
    const shippingCost = 0;
    const total = subtotal + shippingCost;

    const order = await this.prisma.$transaction(async (tx) => {
      const created = await tx.order.create({
        data: {
          userId,
          addressId: dto.addressId,
          courier: dto.courier,
          service: dto.service,
          notes: dto.notes,
          shippingCost,
          total,
          items: {
            create: resolvedItems.map((i) => ({
              productId: i.productId,
              variantId: i.variantId,
              quantity: i.quantity,
              price: i.price,
            })),
          },
        },
        include: { items: true, address: true },
      });

      // Decrement stock
      for (const i of resolvedItems) {
        await tx.product.update({
          where: { id: i.productId },
          data: { stock: { decrement: i.quantity } },
        });
      }

      // Clear cart
      const cart = await tx.cart.findUnique({ where: { userId } });
      if (cart) await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

      return created;
    });

    return order;
  }

  async findAll(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: { product: { select: { id: true, name: true, mainImage: true, slug: true } } },
        },
        payment: { select: { status: true, provider: true, paymentUrl: true } },
        address: { select: { receiverName: true, address: true, cityId: true } },
      },
    });
  }

  async findOne(userId: string, orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: { product: { select: { id: true, name: true, mainImage: true, slug: true } } },
        },
        payment: true,
        address: true,
      },
    });
    if (!order) throw new NotFoundException('Order tidak ditemukan');
    if (order.userId !== userId) throw new ForbiddenException('Akses ditolak');
    return order;
  }

  async cancel(userId: string, orderId: string) {
    const order = await this.findOne(userId, orderId);
    if (!['pending', 'paid'].includes(order.status))
      throw new BadRequestException('Order tidak dapat dibatalkan pada status ini');

    await this.prisma.$transaction(async (tx) => {
      await tx.order.update({ where: { id: orderId }, data: { status: 'cancelled' } });
      // Restore stock
      for (const item of order.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { increment: item.quantity } },
        });
      }
    });

    return { message: 'Order berhasil dibatalkan' };
  }
}
