import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async getSalesReport(startDate?: string, endDate?: string, groupBy: 'day' | 'week' | 'month' = 'day') {
    const where: any = { paymentStatus: 'paid' };
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }

    const [totalRevenue, totalOrders, orders] = await Promise.all([
      this.prisma.order.aggregate({ where, _sum: { total: true } }),
      this.prisma.order.count({ where }),
      this.prisma.order.findMany({
        where,
        select: { total: true, createdAt: true },
        orderBy: { createdAt: 'asc' },
      }),
    ]);

    const grouped = this.groupByPeriod(orders, groupBy);

    return {
      totalRevenue: totalRevenue._sum.total ?? 0,
      totalOrders,
      groupBy,
      data: grouped,
    };
  }

  private groupByPeriod(
    orders: { total: any; createdAt: Date }[],
    groupBy: 'day' | 'week' | 'month',
  ) {
    const map = new Map<string, { period: string; revenue: number; orders: number }>();

    for (const order of orders) {
      const date = new Date(order.createdAt);
      let key: string;

      if (groupBy === 'month') {
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      } else if (groupBy === 'week') {
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay());
        key = startOfWeek.toISOString().split('T')[0]!;
      } else {
        key = date.toISOString().split('T')[0]!;
      }

      const existing = map.get(key) ?? { period: key, revenue: 0, orders: 0 };
      existing.revenue += Number(order.total);
      existing.orders += 1;
      map.set(key, existing);
    }

    return Array.from(map.values());
  }

  async getTopProducts(limit = 10, startDate?: string, endDate?: string) {
    const orderWhere: any = {};
    if (startDate || endDate) {
      orderWhere.createdAt = {};
      if (startDate) orderWhere.createdAt.gte = new Date(startDate);
      if (endDate) orderWhere.createdAt.lte = new Date(endDate);
    }

    const items = await this.prisma.orderItem.groupBy({
      by: ['productId'],
      where: Object.keys(orderWhere).length ? { order: orderWhere } : undefined,
      _sum: { quantity: true, price: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: limit,
    });

    const productIds = items.map((i) => i.productId);
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, name: true, slug: true, mainImage: true, sku: true },
    });

    const productMap = new Map(products.map((p) => [p.id, p]));

    return items.map((item) => ({
      product: productMap.get(item.productId),
      totalSold: item._sum?.quantity ?? 0,
      totalRevenue: item._sum?.price ?? 0,
    }));
  }

  async getTopCategories(limit = 10, startDate?: string, endDate?: string) {
    const orderWhere: any = {};
    if (startDate || endDate) {
      orderWhere.createdAt = {};
      if (startDate) orderWhere.createdAt.gte = new Date(startDate);
      if (endDate) orderWhere.createdAt.lte = new Date(endDate);
    }

    const items = await this.prisma.orderItem.findMany({
      where: Object.keys(orderWhere).length ? { order: orderWhere } : undefined,
      select: {
        quantity: true,
        price: true,
        productId: true,
      },
    });

    const productIds = [...new Set(items.map((i) => i.productId))];
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, categoryId: true },
    });
    const productCategoryMap = new Map(products.map((p) => [p.id, p.categoryId]));

    const categoryMap = new Map<string, { totalSold: number; totalRevenue: number }>();
    for (const item of items) {
      const catId = productCategoryMap.get(item.productId);
      if (!catId) continue;
      const existing = categoryMap.get(catId) ?? { totalSold: 0, totalRevenue: 0 };
      existing.totalSold += item.quantity;
      existing.totalRevenue += Number(item.price);
      categoryMap.set(catId, existing);
    }

    const sorted = Array.from(categoryMap.entries())
      .sort((a, b) => b[1].totalSold - a[1].totalSold)
      .slice(0, limit);

    const categoryIds = sorted.map(([id]) => id);
    const categories = await this.prisma.category.findMany({
      where: { id: { in: categoryIds } },
      select: { id: true, name: true, slug: true },
    });

    const catInfoMap = new Map(categories.map((c) => [c.id, c]));

    return sorted.map(([catId, stats]) => ({
      category: catInfoMap.get(catId),
      ...stats,
    }));
  }
}
