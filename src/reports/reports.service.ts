import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SalesQueryDto } from './dto/reports-query.dto';

interface DateRangeOpts {
  startDate?: string;
  endDate?: string;
}

interface TopOpts extends DateRangeOpts {
  limit?: number;
}

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  // ── Helpers ────────────────────────────────────────────────────────────────

  /** Build Prisma where clause — HANYA order dengan paymentStatus === 'paid' */
  private buildPaidOrderWhere(opts: DateRangeOpts) {
    const where: any = { paymentStatus: 'paid' };
    if (opts.startDate || opts.endDate) {
      where.createdAt = {};
      if (opts.startDate) where.createdAt.gte = new Date(opts.startDate);
      if (opts.endDate) where.createdAt.lte = new Date(opts.endDate);
    }
    return where;
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

  // ── GET /reports/sales ─────────────────────────────────────────────────────
  async getSalesReport(query: SalesQueryDto) {
    const { groupBy = 'day', ...dateRange } = query;
    const where = this.buildPaidOrderWhere(dateRange);

    const [aggregate, orderCount, orders] = await Promise.all([
      this.prisma.order.aggregate({ where, _sum: { total: true } }),
      this.prisma.order.count({ where }),
      this.prisma.order.findMany({
        where,
        select: { total: true, createdAt: true },
        orderBy: { createdAt: 'asc' },
      }),
    ]);

    const totalSales = Number(aggregate._sum.total ?? 0);
    const avgOrderValue = orderCount > 0 ? Math.round(totalSales / orderCount) : 0;

    return {
      totalSales,
      orderCount,
      avgOrderValue,
      groupBy,
      data: this.groupByPeriod(orders, groupBy),
    };
  }

  // ── GET /reports/top-products ──────────────────────────────────────────────
  // groupBy productId, sum quantity + revenue, top 10
  async getTopProducts(opts: TopOpts) {
    const { limit = 10, ...dateRange } = opts;
    const orderWhere = this.buildPaidOrderWhere(dateRange);

    // Aggregate order items dari paid orders saja
    const items = await this.prisma.orderItem.groupBy({
      by: ['productId'],
      where: { order: orderWhere },
      _sum: { quantity: true, price: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: limit,
    });

    const productIds = items.map((i) => i.productId);
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
      select: {
        id: true,
        name: true,
        slug: true,
        sku: true,
        images: { where: { isFeatured: true }, select: { imageUrl: true }, take: 1 },
      },
    });
    const productMap = new Map(
      products.map((p) => [p.id, { id: p.id, name: p.name, slug: p.slug, sku: p.sku, mainImage: p.images[0]?.imageUrl ?? null }]),
    );

    return items.map((item) => ({
      product: productMap.get(item.productId) ?? null,
      totalSold: item._sum?.quantity ?? 0,
      totalRevenue: Number(item._sum?.price ?? 0),
    }));
  }

  // ── GET /reports/top-categories ────────────────────────────────────────────
  // join orderItems → products → categories, sum revenue per kategori
  async getTopCategories(opts: TopOpts) {
    const { limit = 10, ...dateRange } = opts;
    const orderWhere = this.buildPaidOrderWhere(dateRange);

    // Fetch order items dari paid orders, sertakan categoryId produk
    const items = await this.prisma.orderItem.findMany({
      where: { order: orderWhere },
      select: {
        quantity: true,
        price: true,
        product: { select: { categoryId: true } },
      },
    });

    // Agregasi revenue per categoryId
    const categoryMap = new Map<string, { totalSold: number; totalRevenue: number }>();
    for (const item of items) {
      const catId = item.product?.categoryId;
      if (!catId) continue;
      const existing = categoryMap.get(catId) ?? { totalSold: 0, totalRevenue: 0 };
      existing.totalSold += item.quantity;
      existing.totalRevenue += Number(item.price);
      categoryMap.set(catId, existing);
    }

    // Sort by revenue desc, ambil top N
    const sorted = Array.from(categoryMap.entries())
      .sort((a, b) => b[1].totalRevenue - a[1].totalRevenue)
      .slice(0, limit);

    const categoryIds = sorted.map(([id]) => id);
    const categories = await this.prisma.category.findMany({
      where: { id: { in: categoryIds } },
      select: { id: true, name: true, slug: true },
    });
    const catInfoMap = new Map(categories.map((c) => [c.id, c]));

    return sorted.map(([catId, stats]) => ({
      category: catInfoMap.get(catId) ?? null,
      totalSold: stats.totalSold,
      totalRevenue: stats.totalRevenue,
    }));
  }
}