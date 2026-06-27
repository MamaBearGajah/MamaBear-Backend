import { PrismaClient } from "generated/prisma/client";
import * as bcrypt from "bcrypt";

/**
 * prisma/seed/membership-users.ts
 *
 * Seed 3 user dengan tier membership berbeda (silver, gold, platinum),
 * beserta:
 *   - Address lengkap
 *   - Order history delivered & paid (yang menentukan totalSpent & tier)
 *   - Membership record (tier, points, totalSpent)
 *   - PointTransaction per order
 *   - Shipping voucher tier benefit
 *   - Bonus point transaction untuk variasi data
 */

// ── Konstanta (sama dengan membership.ts) ────────────────────────────────────
const POINT_RATE      = 1_000; // Rp 1.000 = 1 poin
const POINT_TO_RUPIAH = 100;   // 1 poin = Rp 100

function calculatePoints(amount: number): number {
  return Math.floor(amount / POINT_RATE);
}

function orderNumber(): string {
  const now  = Date.now().toString();
  const rand = Math.floor(Math.random() * 9000 + 1000);
  return `ORD-${now.slice(-8)}-${rand}`;
}

async function generateVoucherCode(prisma: PrismaClient, prefix: string): Promise<string> {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code: string;
  let exists: boolean;
  do {
    const rand = Array.from({ length: 6 }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length)),
    ).join("");
    code = `${prefix}-${rand}`;
    const found = await prisma.voucher.findUnique({ where: { code } });
    exists = !!found;
  } while (exists);
  return code;
}

// ── Data user & skenario belanja ─────────────────────────────────────────────

const MEMBERSHIP_USERS = [
  {
    // Silver: totalSpent >= 1.000.000 & < 5.000.000
    name:  "Rania Putri",
    email: "rania.putri@gmail.com",
    phone: "081399900001",
    address: {
      label:        "Rumah",
      receiverName: "Rania Putri",
      phone:        "081399900001",
      address:      "Jl. Diponegoro No. 45, Kel. Mugassari",
      cityId:       "399",
      provinceId:   "14",
      postalCode:   "50249",
    },
    // 3 order: total ≈ Rp 1.580.000 → silver
    orders: [
      { subtotal: 400_000, shippingCost: 12_000, discountAmount: 0,  daysAgo: 120 },
      { subtotal: 680_000, shippingCost: 15_000, discountAmount: 25_000, daysAgo: 60 },
      { subtotal: 480_000, shippingCost: 12_000, discountAmount: 0,  daysAgo: 14 },
    ],
    tier: "silver" as const,
    bonusPoints: 50, // bonus dari daily login / event
  },
  {
    // Gold: totalSpent >= 5.000.000 & < 10.000.000
    name:  "Kartika Dewi",
    email: "kartika.dewi@gmail.com",
    phone: "081399900002",
    address: {
      label:        "Rumah",
      receiverName: "Kartika Dewi",
      phone:        "081399900002",
      address:      "Jl. Gajah Mada No. 12, Kel. Karangkidul",
      cityId:       "399",
      provinceId:   "14",
      postalCode:   "50135",
    },
    // 6 order: total ≈ Rp 5.480.000 → gold
    orders: [
      { subtotal: 750_000,  shippingCost: 15_000, discountAmount: 0,      daysAgo: 300 },
      { subtotal: 920_000,  shippingCost: 15_000, discountAmount: 50_000, daysAgo: 240 },
      { subtotal: 850_000,  shippingCost: 12_000, discountAmount: 0,      daysAgo: 180 },
      { subtotal: 1_100_000, shippingCost: 0,     discountAmount: 0,      daysAgo: 120 },
      { subtotal: 980_000,  shippingCost: 12_000, discountAmount: 25_000, daysAgo: 60  },
      { subtotal: 880_000,  shippingCost: 0,      discountAmount: 0,      daysAgo: 10  },
    ],
    tier: "gold" as const,
    bonusPoints: 200,
  },
  {
    // Platinum: totalSpent >= 10.000.000
    name:  "Sekar Arum",
    email: "sekar.arum@gmail.com",
    phone: "081399900003",
    address: {
      label:        "Rumah",
      receiverName: "Sekar Arum",
      phone:        "081399900003",
      address:      "Jl. Pandanaran No. 8, Kel. Pekunden",
      cityId:       "399",
      provinceId:   "14",
      postalCode:   "50241",
    },
    // 8 order: total ≈ Rp 11.150.000 → platinum
    orders: [
      { subtotal: 1_200_000, shippingCost: 15_000, discountAmount: 0,       daysAgo: 365 },
      { subtotal: 1_500_000, shippingCost: 0,      discountAmount: 100_000, daysAgo: 300 },
      { subtotal: 980_000,   shippingCost: 15_000, discountAmount: 0,       daysAgo: 240 },
      { subtotal: 1_800_000, shippingCost: 0,      discountAmount: 50_000,  daysAgo: 180 },
      { subtotal: 1_350_000, shippingCost: 15_000, discountAmount: 0,       daysAgo: 120 },
      { subtotal: 1_200_000, shippingCost: 0,      discountAmount: 25_000,  daysAgo: 60  },
      { subtotal: 1_650_000, shippingCost: 15_000, discountAmount: 0,       daysAgo: 30  },
      { subtotal: 1_470_000, shippingCost: 0,      discountAmount: 0,       daysAgo: 5   },
    ],
    tier: "platinum" as const,
    bonusPoints: 500,
  },
];

const TIER_SHIPPING_BENEFIT: Record<"silver" | "gold" | "platinum", number> = {
  silver:   5_000,
  gold:    10_000,
  platinum: 15_000,
};

// ── Main function ─────────────────────────────────────────────────────────────

export async function seedMembershipUsers(prisma: PrismaClient) {
  console.log("🌱 Seeding membership users (silver / gold / platinum)...");

  const hashedPassword = await bcrypt.hash("Member@123", 10);

  // Lookup produk untuk order items (ambil produk pertama yang aktif)
  const products = await prisma.product.findMany({
    where: { status: "active" },
    select: { id: true, name: true, basePrice: true, discountPrice: true },
    take: 5,
  });

  if (products.length === 0) {
    console.warn("⚠️  seedMembershipUsers: tidak ada produk aktif. Jalankan seedProducts() dulu.");
    return;
  }

  for (const userData of MEMBERSHIP_USERS) {
    // ── 1. Upsert user ──────────────────────────────────────────────────────
    const user = await prisma.user.upsert({
      where:  { email: userData.email },
      update: { name: userData.name, phone: userData.phone },
      create: {
        name:       userData.name,
        email:      userData.email,
        phone:      userData.phone,
        password:   hashedPassword,
        role:       "customer",
        isVerified: true,
      },
    });

    // ── 2. Upsert address ───────────────────────────────────────────────────
    const existingAddr = await prisma.address.findFirst({ where: { userId: user.id } });
    const address = existingAddr
      ? existingAddr
      : await prisma.address.create({
          data: { userId: user.id, ...userData.address, isDefault: true },
        });

    // ── 3. Cleanup data lama ────────────────────────────────────────────────
    await prisma.pointTransaction.deleteMany({ where: { userId: user.id } });
    await prisma.voucher.deleteMany({
      where: { ownerId: user.id, source: { in: ["tier_benefit", "point_redeem"] } },
    });
    // Hapus order lama milik user ini (cascade ke OrderItem, Payment, StatusHistory)
    const oldOrders = await prisma.order.findMany({
      where: { userId: user.id },
      select: { id: true },
    });
    for (const o of oldOrders) {
      await prisma.payment.deleteMany({ where: { orderId: o.id } });
      await prisma.orderStatusHistory.deleteMany({ where: { orderId: o.id } });
      await prisma.orderItem.deleteMany({ where: { orderId: o.id } });
    }
    await prisma.order.deleteMany({ where: { userId: user.id } });
    await prisma.membership.deleteMany({ where: { userId: user.id } });

    // ── 4. Buat orders ──────────────────────────────────────────────────────
    let accumulatedSpent = 0;
    let accumulatedPoints = 0;
    const createdOrderIds: { orderId: string; total: number; createdAt: Date }[] = [];

    for (const [idx, orderData] of userData.orders.entries()) {
      const orderDate = new Date();
      orderDate.setDate(orderDate.getDate() - orderData.daysAgo);

      const total = orderData.subtotal + orderData.shippingCost - orderData.discountAmount;
      const product = products[idx % products.length];

      const order = await prisma.order.create({
        data: {
          orderNumber:   orderNumber(),
          userId:        user.id,
          addressId:     address.id,
          status:        "delivered",
          paymentStatus: "paid",
          subtotal:      orderData.subtotal,
          discountAmount: orderData.discountAmount,
          shippingCost:  orderData.shippingCost,
          total,
          courier:       "JNE",
          service:       "REG",
          deliveredAt:   new Date(orderDate.getTime() + 3 * 24 * 60 * 60 * 1000),
          createdAt:     orderDate,
          updatedAt:     orderDate,
          items: {
            create: {
              productId:   product.id,
              productName: product.name,
              quantity:    Math.max(1, Math.floor(orderData.subtotal / Number(product.discountPrice ?? product.basePrice))),
              price:       product.discountPrice ?? product.basePrice,
            },
          },
          statusHistory: {
            create: [
              { status: "pending",    createdAt: orderDate },
              { status: "processing", createdAt: new Date(orderDate.getTime() + 1 * 60 * 60 * 1000) },
              { status: "shipped",    createdAt: new Date(orderDate.getTime() + 24 * 60 * 60 * 1000) },
              { status: "delivered",  createdAt: new Date(orderDate.getTime() + 3 * 24 * 60 * 60 * 1000) },
            ],
          },
        },
      });

      // Payment record
      await prisma.payment.create({
        data: {
          orderId:       order.id,
          provider:      "midtrans",
          status:        "paid",
          amount:        total,
          paymentMethod: "bank_transfer",
          paidAt:        new Date(orderDate.getTime() + 30 * 60 * 1000),
          createdAt:     orderDate,
          updatedAt:     orderDate,
        },
      });

      accumulatedSpent  += total;
      accumulatedPoints += calculatePoints(total);
      createdOrderIds.push({ orderId: order.id, total, createdAt: orderDate });
    }

    // ── 5. Buat Membership ──────────────────────────────────────────────────
    const lastOrder = createdOrderIds[createdOrderIds.length - 1];
    const finalPoints = accumulatedPoints + userData.bonusPoints;

    await prisma.membership.create({
      data: {
        userId:      user.id,
        tier:        userData.tier,
        points:      finalPoints,
        totalSpent:  accumulatedSpent,
        lastTierUpAt: lastOrder.createdAt,
      },
    });

    // ── 6. PointTransactions per order ─────────────────────────────────────
    for (const { orderId, total, createdAt } of createdOrderIds) {
      const pts = calculatePoints(total);
      if (pts <= 0) continue;

      await prisma.pointTransaction.create({
        data: {
          userId:      user.id,
          points:      pts,
          type:        "purchase",
          referenceId: orderId,
          description: `Point dari pembelian order #${orderId.slice(0, 8)}`,
          createdAt:   new Date(createdAt.getTime() + 24 * 60 * 60 * 1000),
        },
      });
    }

    // ── 7. Bonus point transaction ──────────────────────────────────────────
    if (userData.bonusPoints > 0) {
      await prisma.pointTransaction.create({
        data: {
          userId:      user.id,
          points:      userData.bonusPoints,
          type:        "bonus",
          description: `Bonus point program loyalitas tier ${userData.tier}`,
          createdAt:   new Date(),
        },
      });
    }

    // ── 8. Tier benefit voucher (ongkir) ────────────────────────────────────
    const shippingValue = TIER_SHIPPING_BENEFIT[userData.tier];
    const voucherCode   = await generateVoucherCode(prisma, `SHIP-${userData.tier.toUpperCase()}`);
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
        ownerId:    user.id,
      },
    });

    console.log(
      `  ✓ ${userData.name} (${userData.email}) | tier=${userData.tier} | spent=Rp${accumulatedSpent.toLocaleString("id-ID")} | points=${finalPoints} | voucher=${voucherCode}`,
    );
  }

  console.log("✅ Membership users seeded: silver, gold, platinum");
  console.log("   Password semua user: Member@123");
}