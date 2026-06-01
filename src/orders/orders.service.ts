import { map } from 'rxjs/operators';
import { Prisma, ProductVariant } from './../../generated/prisma/client';
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ShippingService } from '../shipping/shipping.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly shippingService: ShippingService) {}

  // Create Order
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
    })
    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('Cart is empty or not found')
    }

    for (const item of cart.items) {
      const variant = item.variant
      if (!variant) throw new BadRequestException(`Product variant not found for cart item ${item.id}`)
      if (variant.stock < item.quantity) throw new BadRequestException(`Insufficient stock for: ${variant.product?.name ?? item.productId}`)
    }

    const address = await this.prisma.address.findFirst({
      where: { id: dto.addressId, userId },
    })
    if (!address) throw new NotFoundException('Address not found')

    const totalWeight = cart.items.reduce((sum, item) => {
      const weight = item.product?.weight ?? 0
      return sum + weight * item.quantity
    }, 0)

    // Shipping
    const shippingOptions = await this.shippingService.calculateCost({
      originCityId: process.env.WAREHOUSE_CITY_ID!, // apakah ada gudang atau gimana?
      destinationCityId: address.cityId,
      weight: totalWeight,
      courier: dto.courier,
    })

    const selectedService = shippingOptions
      .flatMap((o: any) => o.cost)
      .find((c: any) => c.service === dto.service)
    if (!selectedService) throw new BadRequestException('Shipping service not available')

    const shippingCost = selectedService.cost[0].value

    const subtotal = cart.items.reduce((sum, item) => {
      const price = Number(item.variant?.basePrice ?? item.price ?? 0)
      return sum + price * item.quantity
    }, 0)

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
          price: item.variant?.basePrice ?? item.price ?? 0,
        }))
      })

      for (const item of cart.items) {
        if (item.variantId) {
          await tx.productVariant.update({
            where: { id: item.variantId },
            data: { stock: { decrement: item.quantity } },
          })
        }
      }

      await tx.cartItem.deleteMany({ where: { cartId: cart.id } })

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
        include: { 
          items: { include: { variant: { include: { product: true } } } },
          address: true,
          payment: true,
        },
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
      include: { 
        items: { include: { variant: { include: { product: true } } } },
        address: true,
        payment: true,
      },
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
      const cancelled = await tx.order.update({
        where: { id: orderId },
        data: { status: 'cancelled', cancelledAt: new Date() },
      })

      for (const item of order.items) {
        if (item.variantId !== null) {
          await tx.productVariant.update({
            where: { id: item.variantId },
            data: { stock: { increment: item.quantity } },
          })
        }
      }

      return cancelled
    })
  }
}