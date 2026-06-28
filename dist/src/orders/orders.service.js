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
var OrdersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const client_1 = require("./../../generated/prisma/client");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const shipping_service_1 = require("../shipping/shipping.service");
const mail_service_1 = require("../mail/mail.service");
const membership_service_1 = require("../membership/membership.service");
const voucher_service_1 = require("../voucher/voucher.service");
const csv_writer_1 = require("csv-writer");
function parseEtdToDate(etd, from = new Date()) {
    if (!etd)
        return null;
    const match = etd.match(/\d+/g);
    if (!match || match.length === 0)
        return null;
    const maxDays = Math.max(...match.map(Number));
    if (!Number.isFinite(maxDays) || maxDays <= 0)
        return null;
    const date = new Date(from);
    date.setDate(date.getDate() + maxDays);
    return date;
}
let OrdersService = OrdersService_1 = class OrdersService {
    prisma;
    shippingService;
    mailService;
    membershipService;
    voucherService;
    logger = new common_1.Logger(OrdersService_1.name);
    constructor(prisma, shippingService, mailService, membershipService, voucherService) {
        this.prisma = prisma;
        this.shippingService = shippingService;
        this.mailService = mailService;
        this.membershipService = membershipService;
        this.voucherService = voucherService;
    }
    async generateOrderNumber() {
        const now = new Date();
        const prefix = `ORB-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);
        const countToday = await this.prisma.order.count({
            where: { createdAt: { gte: startOfDay, lt: endOfDay } },
        });
        return `${prefix}-${String(countToday + 1).padStart(4, '0')}`;
    }
    async create(userId, dto) {
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
        if (!cart || cart.items.length === 0)
            throw new common_1.BadRequestException('Cart is empty or not found');
        for (const item of cart.items) {
            if (!item.variant)
                throw new common_1.BadRequestException(`Product variant not found for cart item ${item.id}`);
            const availableStock = item.variant.stock - item.variant.reservedStock;
            if (availableStock < item.quantity)
                throw new common_1.BadRequestException(`Stok tidak cukup untuk: ${item.variant.product?.name ?? item.productId}. ` +
                    `Tersedia: ${availableStock}, diminta: ${item.quantity}`);
        }
        const address = await this.prisma.address.findFirst({ where: { id: dto.addressId, userId } });
        if (!address)
            throw new common_1.NotFoundException('Address not found');
        const totalWeight = cart.items.reduce((sum, item) => sum + (item.product?.weight ?? 0) * item.quantity, 0);
        const shippingOptions = await this.shippingService.calculateCost({
            originCityId: process.env.WAREHOUSE_CITY_ID,
            destinationCityId: address.cityId,
            weight: totalWeight,
            courier: dto.courier,
        });
        const selectedService = shippingOptions.find((c) => c.service?.toLowerCase() === dto.service?.toLowerCase());
        if (!selectedService) {
            throw new common_1.BadRequestException(`Shipping service "${dto.service}" not available for courier "${dto.courier}"`);
        }
        const shippingCost = selectedService.cost;
        const estimatedDelivery = parseEtdToDate(selectedService.etd);
        const subtotal = cart.items.reduce((sum, item) => {
            const price = Number(item.variant?.discountPrice ?? item.variant?.basePrice ?? item.price ?? 0);
            return sum + price * item.quantity;
        }, 0);
        let discountAmount = 0;
        let discountShipping = 0;
        const resolvedVoucherId = dto.voucherId ?? null;
        const resolvedVoucherShippingId = dto.voucherShippingId ?? null;
        const orderNumber = await this.generateOrderNumber();
        const now = new Date();
        const paymentDeadline = new Date(now.getTime() + 2 * 60 * 60 * 1000);
        const cancelDeadline = new Date(now.getTime() + 30 * 60 * 1000);
        const order = await this.prisma.$transaction(async (tx) => {
            if (resolvedVoucherId) {
                const applied = await this.voucherService.applyVoucher(tx, resolvedVoucherId, subtotal, userId, 0);
                discountAmount = applied.discountAmount;
            }
            if (resolvedVoucherShippingId) {
                const appliedShipping = await this.voucherService.applyVoucher(tx, resolvedVoucherShippingId, subtotal, userId, shippingCost);
                discountShipping = appliedShipping.discountAmount;
            }
            const total = Math.max(0, subtotal - discountAmount + shippingCost - discountShipping);
            const newOrder = await tx.order.create({
                data: {
                    orderNumber,
                    userId,
                    addressId: dto.addressId,
                    voucherId: resolvedVoucherId,
                    voucherShippingId: resolvedVoucherShippingId,
                    courier: dto.courier,
                    service: dto.service,
                    notes: dto.notes ?? null,
                    subtotal: new client_1.Prisma.Decimal(subtotal),
                    discountAmount: new client_1.Prisma.Decimal(discountAmount),
                    discountShipping: new client_1.Prisma.Decimal(discountShipping),
                    shippingCost: new client_1.Prisma.Decimal(shippingCost),
                    total: new client_1.Prisma.Decimal(total),
                    status: 'pending',
                    paymentStatus: 'pending',
                    paymentDeadline,
                    cancelDeadline,
                    estimatedDelivery,
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
                    price: item.variant?.discountPrice ?? item.variant?.basePrice ?? item.price,
                    notes: item.notes ?? null,
                })),
            });
            await tx.orderStatusHistory.create({
                data: { orderId: newOrder.id, status: 'pending', note: 'Order created successfully' },
            });
            for (const item of cart.items) {
                if (item.variantId) {
                    await tx.productVariant.update({
                        where: { id: item.variantId },
                        data: {
                            stock: { decrement: item.quantity },
                            reservedStock: { decrement: item.quantity },
                        },
                    });
                }
            }
            const productSoldMap = cart.items.reduce((acc, item) => {
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
    async findAll(userId, page = 1, limit = 10) {
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
                    voucher: { select: { code: true, type: true, value: true } },
                    voucherShipping: { select: { code: true, type: true, value: true } },
                },
            }),
            this.prisma.order.count({ where: { userId } }),
        ]);
        return { data: orders, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
    }
    async findAllAdmin(status, q, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const where = {};
        if (status)
            where.status = status;
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
                    voucher: { select: { code: true, type: true, value: true } },
                    voucherShipping: { select: { code: true, type: true, value: true } },
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
    async findOne(userId, orderId) {
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
                voucher: { select: { code: true, type: true, value: true } },
                voucherShipping: { select: { code: true, type: true, value: true } },
                statusHistory: { orderBy: { createdAt: 'asc' } },
                user: { select: { id: true, name: true, email: true } },
            },
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        if (order.userId !== userId &&
            user?.role !== 'admin' &&
            user?.role !== 'super_admin')
            throw new common_1.ForbiddenException('Access denied');
        return order;
    }
    async findOneAdmin(orderId) {
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
                voucher: { select: { code: true, type: true, value: true } },
                voucherShipping: { select: { code: true, type: true, value: true } },
                statusHistory: { orderBy: { createdAt: 'asc' } },
                user: { select: { id: true, name: true, email: true, phone: true } },
            },
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        return order;
    }
    async updateStatus(orderId, dto) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            include: { user: { select: { email: true, name: true } }, items: true },
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        const status = dto.status;
        const updated = await this.prisma.order.update({
            where: { id: orderId },
            data: {
                status,
                ...(dto.trackingNumber && { trackingNumber: dto.trackingNumber }),
                ...(status === client_1.OrderStatus.delivered && { deliveredAt: new Date() }),
                ...(status === client_1.OrderStatus.cancelled && { cancelledAt: new Date(), cancelReason: dto.note }),
            },
        });
        await this.prisma.orderStatusHistory.create({
            data: { orderId, status, note: dto.note ?? null },
        });
        if (status === client_1.OrderStatus.delivered) {
            this.membershipService
                .processPurchase(order.userId, Number(order.total), orderId)
                .catch((err) => this.logger.error(`Membership processing failed for order ${orderId}`, err));
        }
        if (status === client_1.OrderStatus.shipped && dto.trackingNumber) {
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
    async cancel(userId, orderId) {
        const order = await this.findOne(userId, orderId);
        if (order.status !== 'pending')
            throw new common_1.BadRequestException('Hanya order dengan status pending yang bisa dibatalkan');
        if (order.cancelDeadline && new Date() > order.cancelDeadline) {
            throw new common_1.BadRequestException('Batas waktu pembatalan (30 menit) telah terlewati. Untuk membatalkan order, silakan hubungi Customer Service kami.');
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
            const productSoldMap = order.items.reduce((acc, item) => {
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
    async trackOrder(orderNumber) {
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
        if (!order)
            throw new common_1.NotFoundException('Order tidak ditemukan');
        return order;
    }
    async getAdminOrders(page = 1, limit = 10, status, paymentStatus) {
        const skip = (page - 1) * limit;
        const where = {};
        if (status)
            where.status = status;
        if (paymentStatus)
            where.payment = { status: paymentStatus };
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
    async updateTrackingNumber(orderId, trackingNumber) {
        const order = await this.prisma.order.findUnique({ where: { id: orderId } });
        if (!order)
            throw new common_1.NotFoundException('Order tidak ditemukan');
        return this.prisma.order.update({
            where: { id: orderId },
            data: { trackingNumber },
        });
    }
    async exportOrdersToCsv() {
        const orders = await this.prisma.order.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                user: { select: { name: true, email: true } },
                address: { select: { receiverName: true, phone: true, cityId: true, provinceId: true } },
                payment: { select: { provider: true, status: true } },
                _count: { select: { items: true } },
            },
        });
        const csvStringifier = (0, csv_writer_1.createObjectCsvStringifier)({
            header: [
                { id: 'orderNumber', title: 'ORDER_NUMBER' },
                { id: 'createdAt', title: 'DATE' },
                { id: 'customerName', title: 'CUSTOMER_NAME' },
                { id: 'customerEmail', title: 'CUSTOMER_EMAIL' },
                { id: 'recipient', title: 'RECIPIENT' },
                { id: 'phone', title: 'PHONE' },
                { id: 'cityId', title: 'CITY_ID' },
                { id: 'provinceId', title: 'PROVINCE_ID' },
                { id: 'status', title: 'STATUS' },
                { id: 'paymentStatus', title: 'PAYMENT_STATUS' },
                { id: 'paymentProvider', title: 'PAYMENT_PROVIDER' },
                { id: 'courier', title: 'COURIER' },
                { id: 'service', title: 'SERVICE' },
                { id: 'trackingNumber', title: 'TRACKING_NUMBER' },
                { id: 'itemCount', title: 'ITEM_COUNT' },
                { id: 'subtotal', title: 'SUBTOTAL' },
                { id: 'discountAmount', title: 'DISCOUNT_PRODUCT' },
                { id: 'discountShipping', title: 'DISCOUNT_SHIPPING' },
                { id: 'shippingCost', title: 'SHIPPING_COST' },
                { id: 'total', title: 'TOTAL' },
            ],
        });
        const records = orders.map((o) => ({
            orderNumber: o.orderNumber,
            createdAt: o.createdAt.toISOString().slice(0, 19).replace('T', ' '),
            customerName: o.user.name,
            customerEmail: o.user.email,
            recipient: o.address.receiverName,
            phone: o.address.phone,
            cityId: o.address.cityId,
            provinceId: o.address.provinceId,
            status: o.status,
            paymentStatus: o.paymentStatus,
            paymentProvider: o.payment?.provider ?? '',
            courier: o.courier,
            service: o.service,
            trackingNumber: o.trackingNumber ?? '',
            itemCount: o._count.items,
            subtotal: Number(o.subtotal).toFixed(0),
            discountAmount: Number(o.discountAmount).toFixed(0),
            discountShipping: Number(o.discountShipping ?? 0).toFixed(0),
            shippingCost: Number(o.shippingCost).toFixed(0),
            total: Number(o.total).toFixed(0),
        }));
        return csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(records);
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = OrdersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        shipping_service_1.ShippingService,
        mail_service_1.MailService,
        membership_service_1.MembershipService,
        voucher_service_1.VoucherService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map