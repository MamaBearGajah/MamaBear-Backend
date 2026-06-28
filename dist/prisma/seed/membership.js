"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedMembership = seedMembership;
const POINT_RATE = 1_000;
const POINT_TO_RUPIAH = 100;
const MIN_REDEEM = 200;
function determineTier(totalSpent) {
    if (totalSpent >= 10_000_000)
        return "platinum";
    if (totalSpent >= 5_000_000)
        return "gold";
    if (totalSpent >= 1_000_000)
        return "silver";
    return "bronze";
}
function calculatePoints(amount) {
    return Math.floor(amount / POINT_RATE);
}
async function generateVoucherCode(prisma, prefix) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code;
    let exists;
    do {
        const random = Array.from({ length: 6 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join("");
        code = `${prefix}-${random}`;
        const found = await prisma.voucher.findUnique({ where: { code } });
        exists = !!found;
    } while (exists);
    return code;
}
async function seedMembership(prisma, customers) {
    console.log("🌱 Seeding membership, points & vouchers...");
    const customerIds = customers.map((c) => c.id);
    await prisma.pointTransaction.deleteMany({ where: { userId: { in: customerIds } } });
    await prisma.voucher.deleteMany({
        where: {
            ownerId: { in: customerIds },
            source: { in: ["tier_benefit", "point_redeem"] },
        },
    });
    await prisma.membership.deleteMany({ where: { userId: { in: customerIds } } });
    const orders = await prisma.order.findMany({
        where: {
            userId: { in: customerIds },
            status: "delivered",
            paymentStatus: "paid",
        },
        orderBy: { createdAt: "asc" },
        select: { id: true, userId: true, total: true, createdAt: true },
    });
    const ordersByUser = orders.reduce((acc, order) => {
        if (!acc[order.userId])
            acc[order.userId] = [];
        acc[order.userId].push(order);
        return acc;
    }, {});
    const TIER_SHIPPING_BENEFIT = {
        silver: 5_000,
        gold: 10_000,
        platinum: 15_000,
    };
    for (const userId of customerIds) {
        const userOrders = ordersByUser[userId] ?? [];
        const totalSpent = userOrders.reduce((sum, o) => sum + Number(o.total), 0);
        const totalPoints = userOrders.reduce((sum, o) => sum + calculatePoints(Number(o.total)), 0);
        const tier = determineTier(totalSpent);
        const lastOrder = userOrders[userOrders.length - 1];
        await prisma.membership.create({
            data: {
                userId,
                tier,
                points: totalPoints,
                totalSpent,
                lastTierUpAt: tier !== "bronze" && lastOrder ? lastOrder.createdAt : null,
            },
        });
        for (const order of userOrders) {
            const pts = calculatePoints(Number(order.total));
            if (pts <= 0)
                continue;
            const txDate = new Date(order.createdAt.getTime() + 24 * 60 * 60 * 1000);
            await prisma.pointTransaction.create({
                data: {
                    userId,
                    points: pts,
                    type: "purchase",
                    referenceId: order.id,
                    description: `Point dari pembelian order #${order.id.slice(0, 8)}...`,
                    createdAt: txDate,
                },
            });
        }
        if (tier !== "bronze") {
            const shippingValue = TIER_SHIPPING_BENEFIT[tier];
            const voucherCode = await generateVoucherCode(prisma, `SHIP-${tier.toUpperCase()}`);
            const endDate = new Date();
            endDate.setFullYear(endDate.getFullYear() + 1);
            await prisma.voucher.create({
                data: {
                    code: voucherCode,
                    type: "free_shipping",
                    source: "tier_benefit",
                    value: shippingValue,
                    usageLimit: null,
                    isActive: true,
                    endDate,
                    ownerId: userId,
                },
            });
        }
        console.log(`  ✓ ${userId.slice(0, 8)}... | tier=${tier} | spent=Rp${totalSpent.toLocaleString("id-ID")} | points=${totalPoints}`);
    }
    const threeMonthsLater = new Date();
    threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
    const publicVouchers = [
        {
            code: "MAMABEAR10",
            type: "percentage",
            source: "manual",
            value: 10,
            maxDiscount: 20_000,
            minPurchase: 100_000,
            usageLimit: 100,
            description: "Diskon 10% max Rp 20.000 untuk semua produk",
        },
        {
            code: "HEMAT25K",
            type: "fixed",
            source: "manual",
            value: 25_000,
            maxDiscount: null,
            minPurchase: 150_000,
            usageLimit: 50,
            description: "Potongan Rp 25.000 min belanja Rp 150.000",
        },
        {
            code: "ONGKIRGRATIS",
            type: "free_shipping",
            source: "manual",
            value: 15_000,
            maxDiscount: null,
            minPurchase: 0,
            usageLimit: 200,
            description: "Gratis ongkir sampai Rp 15.000",
        },
    ];
    for (const v of publicVouchers) {
        await prisma.voucher.upsert({
            where: { code: v.code },
            update: {
                isActive: true,
                usageLimit: v.usageLimit,
                endDate: threeMonthsLater,
                maxDiscount: v.maxDiscount,
                minPurchase: v.minPurchase,
            },
            create: {
                code: v.code,
                type: v.type,
                source: v.source,
                value: v.value,
                maxDiscount: v.maxDiscount,
                minPurchase: v.minPurchase,
                usageLimit: v.usageLimit,
                isActive: true,
                endDate: threeMonthsLater,
            },
        });
        console.log(`  ✓ Voucher publik: ${v.code} — ${v.description}`);
    }
    const firstCustomerId = customers[0]?.id;
    if (firstCustomerId) {
        const membership = await prisma.membership.findUnique({ where: { userId: firstCustomerId } });
        const redeemPoints = MIN_REDEEM;
        if (membership && membership.points >= redeemPoints) {
            const discountValue = redeemPoints * POINT_TO_RUPIAH;
            const voucherCode = await generateVoucherCode(prisma, "RDM");
            const endDate = new Date();
            endDate.setDate(endDate.getDate() + 30);
            await prisma.$transaction(async (tx) => {
                await tx.membership.update({
                    where: { userId: firstCustomerId },
                    data: { points: { decrement: redeemPoints } },
                });
                await tx.pointTransaction.create({
                    data: {
                        userId: firstCustomerId,
                        points: -redeemPoints,
                        type: "redeem",
                        description: `Redeem ${redeemPoints} point → voucher potongan Rp ${discountValue.toLocaleString("id-ID")}`,
                    },
                });
                await tx.voucher.create({
                    data: {
                        code: voucherCode,
                        type: "fixed",
                        source: "point_redeem",
                        value: discountValue,
                        minPurchase: 0,
                        usageLimit: 1,
                        isActive: true,
                        endDate,
                        ownerId: firstCustomerId,
                    },
                });
            });
            console.log(`  ✓ Contoh redeem: customer[0] redeem ${redeemPoints} point → voucher ${voucherCode} (Rp ${discountValue.toLocaleString("id-ID")})`);
        }
    }
    console.log("✅ Membership, points & vouchers seeded");
}
//# sourceMappingURL=membership.js.map