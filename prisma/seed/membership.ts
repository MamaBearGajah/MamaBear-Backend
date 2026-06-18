// prisma/seed/membership.ts
import { PrismaClient } from 'generated/prisma/client';

const POINT_RATE = 1_000;        // Rp 1.000 = 1 point
const POINT_TO_RUPIAH = 100;     // 1 point = Rp 100
const MIN_REDEEM_POINTS = 100;   // minimal 100 point

type MembershipTier = 'bronze' | 'silver' | 'gold' | 'platinum';

function determineTier(totalSpent: number): MembershipTier {
  if (totalSpent >= 10_000_000) return 'platinum';
  if (totalSpent >= 5_000_000)  return 'gold';
  if (totalSpent >= 1_000_000)  return 'silver';
  return 'bronze';
}

function calculatePoints(amount: number): number {
  return Math.floor(amount / POINT_RATE);
}

async function generateVoucherCode(prisma: PrismaClient, prefix: string): Promise<string> {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code: string;
  let exists: boolean;
  do {
    const random = Array.from({ length: 6 }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length)),
    ).join('');
    code = `${prefix}-${random}`;
    const found = await prisma.voucher.findUnique({ where: { code } });
    exists = !!found;
  } while (exists);
  return code;
}

export async function seedMembership(prisma: PrismaClient, customers: { id: string }[]) {
  console.log('🌱 Seeding membership, points & vouchers...');

  const customerIds = customers.map((c) => c.id);

  // Ambil semua order delivered per customer
  const orders = await prisma.order.findMany({
    where: {
      userId: { in: customerIds },
      status: 'delivered',
      paymentStatus: 'paid',
    },
    orderBy: { createdAt: 'asc' },
    select: {
      id: true,
      userId: true,
      total: true,
      createdAt: true,
    },
  });

  // Group orders per customer
  const ordersByUser = orders.reduce<Record<string, typeof orders>>(
    (acc, order) => {
      if (!acc[order.userId]) acc[order.userId] = [];
      acc[order.userId].push(order);
      return acc;
    },
    {},
  );

  for (const userId of customerIds) {
    const userOrders = ordersByUser[userId] ?? [];
    const totalSpent = userOrders.reduce((sum, o) => sum + Number(o.total), 0);
    const totalPoints = userOrders.reduce((sum, o) => sum + calculatePoints(Number(o.total)), 0);
    const tier = determineTier(totalSpent);

    // Tanggal order terakhir sebagai lastTierUpAt jika sudah silver+
    const lastOrder = userOrders[userOrders.length - 1];

    // ── Upsert Membership ────────────────────────────────────────────────────
    await prisma.membership.upsert({
      where: { userId },
      update: {
        tier,
        points: totalPoints,
        totalSpent,
        lastTierUpAt: tier !== 'bronze' && lastOrder ? lastOrder.createdAt : null,
      },
      create: {
        userId,
        tier,
        points: totalPoints,
        totalSpent,
        lastTierUpAt: tier !== 'bronze' && lastOrder ? lastOrder.createdAt : null,
      },
    });

    // ── Seed PointTransactions per order ────────────────────────────────────
    // Hapus transaksi lama dulu (idempotent re-seed)
    await prisma.pointTransaction.deleteMany({
      where: { userId, type: 'purchase' },
    });

    for (const order of userOrders) {
      const pts = calculatePoints(Number(order.total));
      if (pts <= 0) continue;

      // Buat tanggal transaksi = 1 hari setelah order (setelah delivered)
      const txDate = new Date(order.createdAt.getTime() + 24 * 60 * 60 * 1000);

      await prisma.pointTransaction.create({
        data: {
          userId,
          points: pts,
          type: 'purchase',
          referenceId: order.id,
          description: `Point dari pembelian order #${order.id.slice(0, 8)}...`,
          createdAt: txDate,
        },
      });
    }

    // ── Seed tier-upgrade shipping voucher (silver+) ─────────────────────────
    const TIER_SHIPPING_BENEFIT: Partial<Record<MembershipTier, number>> = {
      silver:   5_000,
      gold:    10_000,
      platinum: 15_000,
    };

    if (tier !== 'bronze') {
      const shippingValue = TIER_SHIPPING_BENEFIT[tier]!;
      const voucherCode   = await generateVoucherCode(prisma, `SHIP-${tier.toUpperCase()}`);
      const endDate       = new Date();
      endDate.setDate(endDate.getDate() + 90); // berlaku 90 hari

      // Cek apakah sudah punya voucher ongkir aktif dari tier ini
      const existingShipVoucher = await prisma.voucher.findFirst({
        where: {
          ownerId: userId,
          source:  'tier_benefit',
          type:    'free_shipping',
          isActive: true,
        },
      });

      if (!existingShipVoucher) {
        await prisma.voucher.create({
          data: {
            code:       voucherCode,
            type:       'free_shipping',
            source:     'tier_benefit',
            value:      shippingValue,
            usageLimit: 1,
            isActive:   true,
            endDate,
            ownerId:    userId,
          },
        });
      }
    }

    console.log(
      `  ✓ ${userId.slice(0, 8)}... | tier=${tier} | spent=Rp${totalSpent.toLocaleString('id-ID')} | points=${totalPoints}`,
    );
  }

  // ── Seed voucher publik (manual, bisa dipakai semua user) ─────────────────
  const publicVouchers = [
    {
      code:       'MAMABEAR10',
      type:       'percentage' as const,
      source:     'manual' as const,
      value:      10,
      maxDiscount: 20_000,
      minPurchase: 100_000,
      usageLimit: 100,
      description: 'Diskon 10% max Rp 20.000 untuk semua produk',
    },
    {
      code:       'HEMAT25K',
      type:       'fixed' as const,
      source:     'manual' as const,
      value:      25_000,
      minPurchase: 150_000,
      usageLimit: 50,
      description: 'Potongan Rp 25.000 min belanja Rp 150.000',
    },
    {
      code:       'ONGKIRGRATIS',
      type:       'free_shipping' as const,
      source:     'manual' as const,
      value:      15_000,
      minPurchase: 0,
      usageLimit: 200,
      description: 'Gratis ongkir sampai Rp 15.000',
    },
  ];

  for (const v of publicVouchers) {
    const exists = await prisma.voucher.findUnique({ where: { code: v.code } });
    if (exists) {
      console.log(`  ⚠ Voucher ${v.code} sudah ada, skip`);
      continue;
    }

    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 3); // berlaku 3 bulan

    await prisma.voucher.create({
      data: {
        code:        v.code,
        type:        v.type,
        source:      v.source,
        value:       v.value,
        maxDiscount: 'maxDiscount' in v ? v.maxDiscount : null,
        minPurchase: v.minPurchase,
        usageLimit:  v.usageLimit,
        isActive:    true,
        endDate,
      },
    });

    console.log(`  ✓ Voucher publik: ${v.code} — ${v.description}`);
  }

  // ── Seed contoh redeem point untuk customer[0] ────────────────────────────
  // Simulasikan customer pertama redeem 200 point → voucher Rp 20.000
  const firstCustomerId = customers[0]?.id;
  if (firstCustomerId) {
    const membership = await prisma.membership.findUnique({
      where: { userId: firstCustomerId },
    });

    const redeemPoints = 200;

    if (membership && membership.points >= redeemPoints) {
      const existingRedeem = await prisma.pointTransaction.findFirst({
        where: { userId: firstCustomerId, type: 'redeem' },
      });

      if (!existingRedeem) {
        const discountValue = redeemPoints * POINT_TO_RUPIAH; // 200 * 100 = Rp 20.000
        const voucherCode   = await generateVoucherCode(prisma, 'RDM');
        const endDate       = new Date();
        endDate.setDate(endDate.getDate() + 30);

        await prisma.$transaction(async (tx) => {
          // Kurangi point
          await tx.membership.update({
            where: { userId: firstCustomerId },
            data: { points: { decrement: redeemPoints } },
          });

          // Catat transaksi negatif
          await tx.pointTransaction.create({
            data: {
              userId:      firstCustomerId,
              points:      -redeemPoints,
              type:        'redeem',
              description: `Redeem ${redeemPoints} point → voucher potongan Rp ${discountValue.toLocaleString('id-ID')}`,
            },
          });

          // Buat voucher hasil redeem
          await tx.voucher.create({
            data: {
              code:       voucherCode,
              type:       'fixed',
              source:     'point_redeem',
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
          `  ✓ Contoh redeem: customer[0] redeem ${redeemPoints} point → voucher ${voucherCode} (Rp ${discountValue.toLocaleString('id-ID')})`,
        );
      }
    }
  }

  console.log('✅ Membership, points & vouchers seeded');
}