import { map } from 'rxjs/operators';
import { Prisma, ProductVariant } from './../../generated/prisma/client';
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  // Create Order
  async create(userId: string, dto: CreateOrderDto) {
    const cart = await this.prisma.cart.findFirst({
      where: { userId, status: 'active' },
      include: {
        items: {
          include: {
            productVariant: {
              include: { product: true },
            },
          },
        },
      },
    })
    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('Cart is empty or not found')
    }

    for (const item of cart.items) {
      const variant = item.ProductVariant
      if (!variant) throw new BadRequestException(`Product variant not found for cart item ${item.id}`)
      if (variant.stock < item.quantity) throw new BadRequestException(`Insufficient stock for: ${variant.product?.name ?? item.productVariantId}`)
    }

    const address = await this.prisma.address.findFirst({
      where: { id: dto.addressId, userId },
    })
    if (!address) throw new NotFoundException('Address not found')

    const subtotal = cart.items.reduce((sum, item) => {
      const price = Number(item.effectivePrice ?? item.productVariant?.price ?? 0)
      return sum + price * item.quantity
    }, 0)

    const shippingCost = 15000 //examples
    const total = subtotal + shippingCost

    const order = await this.prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
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
      })

      await tx.orderItem.createMany({
        data: cart.items.map((item) => ({
          orderId: newOrder.id,
          productId: item.productId,
          variantId: item.variantId ?? null,
          quantity: item.quantity,
          price: item.effectivePrice ?? item.productVariant?.price ?? 0,
          subtotal: Number(item.effectivePrice ?? item.productVariant?.price ?? 0) * item.quantity,
        }))
      })

      for (const item of cart.items) {
        await tx.productVariant.update({
          where: { id: item.variantId },
          data: { stock: { decrement: item.quantity } },
        })
      }

      await tx.cartItem.deleteMany({ where: { cartId: cart.id } })
      await tx.cart.update({
        where: { id: cart.id },
        data: { status: 'checked_out' },
      })

      return newOrder
    })

    return this.findOne(userId, order.id)
  }


  // Find All Orders
  async findAll(userId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: { items: { include: { productVariant: { include: { product: true } } } } },
        address: true,
        payment: true,
      }),
      this.prisma.order.count({ where: { userId } }),
    ])

    return {
      data: orders,
      meta: { 
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }
  }


  // Find One Order
  async findOne(userId: string, orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { items: { include: { productVariant: { include: { product: true } } } } },
      address: true,
      payment: true,
    })
    if (!order) throw new NotFoundException('Order not found')
    if (order.userId !== userId) throw new ForbiddenException('Access denied')

    return order
  }


  // Cancelled Orders
  async cancel(userId: string, orderId: string) {
    const order = await this.findOne(userId, orderId)

    if (order.status !== 'pending') throw new BadRequestException('Only pending orders can be cancelled')
  
    return this.prisma.$transaction(async (tx) => {
      const cancelled = await this.tx.order.update({
        where: { id: orderId },
        data: { status: 'cancelled', cancelledAt: new Date() },
      })

      for (const item of order.items) {
        await tx.productVariant.update({
          where: { id: item.productVariantId },
          data: { stock: { increment: item.quantity } },
        })
      }

      return cancelled
    })
    
    
  }
}
