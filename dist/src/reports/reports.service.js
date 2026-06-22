"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ReportsService = class ReportsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    buildPaidOrderWhere(opts) {
        const where = { paymentStatus: 'paid' };
        if (opts.startDate || opts.endDate) {
            where.createdAt = {};
            if (opts.startDate)
                where.createdAt.gte = new Date(opts.startDate);
            if (opts.endDate)
                where.createdAt.lte = new Date(opts.endDate);
        }
        return where;
    }
    groupByPeriod(orders, groupBy) {
        const map = new Map();
        for (const order of orders) {
            const date = new Date(order.createdAt);
            let key;
            if (groupBy === 'month') {
                key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            }
            else if (groupBy === 'week') {
                const startOfWeek = new Date(date);
                startOfWeek.setDate(date.getDate() - date.getDay());
                key = startOfWeek.toISOString().split('T')[0];
            }
            else {
                key = date.toISOString().split('T')[0];
            }
            const existing = map.get(key) ?? { period: key, revenue: 0, orders: 0 };
            existing.revenue += Number(order.total);
            existing.orders += 1;
            map.set(key, existing);
        }
        return Array.from(map.values());
    }
    async getSalesReport(query) {
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
    async getTopProducts(opts) {
        const { limit = 10, ...dateRange } = opts;
        const orderWhere = this.buildPaidOrderWhere(dateRange);
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
        const productMap = new Map(products.map((p) => [p.id, { id: p.id, name: p.name, slug: p.slug, sku: p.sku, mainImage: p.images[0]?.imageUrl ?? null }]));
        return items.map((item) => ({
            product: productMap.get(item.productId) ?? null,
            totalSold: item._sum?.quantity ?? 0,
            totalRevenue: Number(item._sum?.price ?? 0),
        }));
    }
    async getTopCategories(opts) {
        const { limit = 10, ...dateRange } = opts;
        const orderWhere = this.buildPaidOrderWhere(dateRange);
        const items = await this.prisma.orderItem.findMany({
            where: { order: orderWhere },
            select: {
                quantity: true,
                price: true,
                product: { select: { categoryId: true } },
            },
        });
        const categoryMap = new Map();
        for (const item of items) {
            const catId = item.product?.categoryId;
            if (!catId)
                continue;
            const existing = categoryMap.get(catId) ?? { totalSold: 0, totalRevenue: 0 };
            existing.totalSold += item.quantity;
            existing.totalRevenue += Number(item.price);
            categoryMap.set(catId, existing);
        }
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
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReportsService);
//# sourceMappingURL=reports.service.js.map