import { PrismaClient } from "generated/prisma/client";

const POINT_RATE      = 1_000; // Rp 1.000 = 1 poin
const POINT_TO_RUPIAH = 100;   // 1 poin = Rp 100
const MIN_REDEEM      = 200;   // minimal poin untuk contoh redeem di seed

type MembershipTier = "bronze" | "silver" | "gold" | "platinum";

function determineTier(totalSpent: number): MembershipTier {
  if (totalSpent >= 10_000_000) return "platinum";
  if (totalSpent >= 5_000_000)  return "gold";
  if (totalSpent >= 1_000_000)  return "silver";
  return "bronze";
}

function calculatePoints(amount: number): number {
  return Math.floor(amount / POINT_RATE);
}

async function generateVoucherCode(prisma: PrismaClient, prefix: string): Promise<string> {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code: string;
  let exists: boolean;
  do {
    const random = Array.from({ length: 6 }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length)),
    ).join("");
    code   = `${prefix}-${random}`;
    const found = await prisma.voucher.findUnique({ where: { code } });
    exists = !!found;
  } while (exists);
  return code;
}

export async function seedMembership(prisma: PrismaClient, customers: { id: string }[]) {
  console.log("🌱 Seeding membership, points & vouchers...");

  const customerIds = customers.map((c) => c.id);

  // ── Cleanup (idempotent re-seed) ──────────────────────────────────────────
  // Hapus semua data membership + point transactions + voucher personal
  // milik customers seed ini. Voucher publik di-handle terpisah via upsert.
  await prisma.pointTransaction.deleteMany({ where: { userId: { in: customerIds } } });
  await prisma.voucher.deleteMany({
    where: {
      ownerId:  { in: customerIds },
      source:   { in: ["tier_benefit", "point_redeem"] },
    },
  });
  await prisma.membership.deleteMany({ where: { userId: { in: customerIds } } });
  // ─────────────────────────────────────────────────────────────────────────

  // Ambil semua order delivered per customer
  const orders = await prisma.order.findMany({
    where: {
      userId:        { in: customerIds },
      status:        "delivered",
      paymentStatus: "paid",
    },
    orderBy: { createdAt: "asc" },
    select:  { id: true, userId: true, total: true, createdAt: true },
  });

  // Group orders per customer
  const ordersByUser = orders.reduce<Record<string, typeof orders>>((acc, order) => {
    if (!acc[order.userId]) acc[order.userId] = [];
    acc[order.userId].push(order);
    return acc;
  }, {});

  const TIER_SHIPPING_BENEFIT: Partial<Record<MembershipTier, number>> = {
    silver:   5_000,
    gold:    10_000,
    platinum: 15_000,
  };

  for (const userId of customerIds) {
    const userOrders  = ordersByUser[userId] ?? [];
    const totalSpent  = userOrders.reduce((sum, o) => sum + Number(o.total), 0);
    const totalPoints = userOrders.reduce((sum, o) => sum + calculatePoints(Number(o.total)), 0);
    const tier        = determineTier(totalSpent);
    const lastOrder   = userOrders[userOrders.length - 1];

    // ── Create Membership ────────────────────────────────────────────────────
    // Pakai create (bukan upsert) karena sudah deleteMany di atas
    await prisma.membership.create({
      data: {
        userId,
        tier,
        points:     totalPoints,
        totalSpent,
        lastTierUpAt: tier !== "bronze" && lastOrder ? lastOrder.createdAt : null,
      },
    });

    // ── PointTransactions per order ──────────────────────────────────────────
    for (const order of userOrders) {
      const pts = calculatePoints(Number(order.total));
      if (pts <= 0) continue;

      // Tanggal transaksi = 1 hari setelah order delivered
      const txDate = new Date(order.createdAt.getTime() + 24 * 60 * 60 * 1000);

      await prisma.pointTransaction.create({
        data: {
          userId,
          points:      pts,
          type:        "purchase",
          referenceId: order.id,
          description: `Point dari pembelian order #${order.id.slice(0, 8)}...`,
          createdAt:   txDate,
        },
      });
    }

    // ── Tier-upgrade shipping voucher (silver+) ───────────────────────────────
    if (tier !== "bronze") {
      const shippingValue = TIER_SHIPPING_BENEFIT[tier]!;
      const voucherCode   = await generateVoucherCode(prisma, `SHIP-${tier.toUpperCase()}`);
      const endDate       = new Date();
      endDate.setDate(endDate.getDate() + 90);

      await prisma.voucher.create({
        data: {
          code:       voucherCode,
          type:       "free_shipping",
          source:     "tier_benefit",
          value:      shippingValue,
          usageLimit: 1,
          isActive:   true,
          endDate,
          ownerId:    userId,
        },
      });
    }

    console.log(
      `  ✓ ${userId.slice(0, 8)}... | tier=${tier} | spent=Rp${totalSpent.toLocaleString("id-ID")} | points=${totalPoints}`,
    );
  }

  // ── Voucher publik (upsert by code — idempotent) ──────────────────────────
  const threeMonthsLater = new Date();
  threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);

  const publicVouchers = [
    {
      code:        "MAMABEAR10",
      type:        "percentage" as const,
      source:      "manual" as const,
      value:       10,
      maxDiscount: 20_000,
      minPurchase: 100_000,
      usageLimit:  100,
      description: "Diskon 10% max Rp 20.000 untuk semua produk",
    },
    {
      code:        "HEMAT25K",
      type:        "fixed" as const,
      source:      "manual" as const,
      value:       25_000,
      maxDiscount: null,
      minPurchase: 150_000,
      usageLimit:  50,
      description: "Potongan Rp 25.000 min belanja Rp 150.000",
    },
    {
      code:        "ONGKIRGRATIS",
      type:        "free_shipping" as const,
      source:      "manual" as const,
      value:       15_000,
      maxDiscount: null,
      minPurchase: 0,
      usageLimit:  200,
      description: "Gratis ongkir sampai Rp 15.000",
    },
  ];

  for (const v of publicVouchers) {
    await prisma.voucher.upsert({
      where: { code: v.code },
      update: {
        isActive:    true,
        usageLimit:  v.usageLimit,
        endDate:     threeMonthsLater,
        maxDiscount: v.maxDiscount,
        minPurchase: v.minPurchase,
      },
      create: {
        code:        v.code,
        type:        v.type,
        source:      v.source,
        value:       v.value,
        maxDiscount: v.maxDiscount,
        minPurchase: v.minPurchase,
        usageLimit:  v.usageLimit,
        isActive:    true,
        endDate:     threeMonthsLater,
      },
    });
    console.log(`  ✓ Voucher publik: ${v.code} — ${v.description}`);
  }

  // ── Contoh redeem point untuk customer[0] ─────────────────────────────────
  // Simulasikan customer pertama redeem 200 point → voucher Rp 20.000
  const firstCustomerId = customers[0]?.id;
  if (firstCustomerId) {
    const membership  = await prisma.membership.findUnique({ where: { userId: firstCustomerId } });
    const redeemPoints = MIN_REDEEM;

    if (membership && membership.points >= redeemPoints) {
      const discountValue = redeemPoints * POINT_TO_RUPIAH; // 200 * 100 = Rp 20.000
      const voucherCode   = await generateVoucherCode(prisma, "RDM");
      const endDate       = new Date();
      endDate.setDate(endDate.getDate() + 30);

      await prisma.$transaction(async (tx) => {
        await tx.membership.update({
          where: { userId: firstCustomerId },
          data:  { points: { decrement: redeemPoints } },
        });

        await tx.pointTransaction.create({
          data: {
            userId:      firstCustomerId,
            points:      -redeemPoints,
            type:        "redeem",
            description: `Redeem ${redeemPoints} point → voucher potongan Rp ${discountValue.toLocaleString("id-ID")}`,
          },
        });

        await tx.voucher.create({
          data: {
            code:       voucherCode,
            type:       "fixed",
            source:     "point_redeem",
            value:      discountValue,
            minPurchase: 0,
            usageLimit: 1,
            isActive:   true,
            endDate,
            ownerId:    firstCustomerId,
          },
        });
      });

      console.log(
        `  ✓ Contoh redeem: customer[0] redeem ${redeemPoints} point → voucher ${voucherCode} (Rp ${discountValue.toLocaleString("id-ID")})`,
      );
    }
  }

  console.log("✅ Membership, points & vouchers seeded");
}