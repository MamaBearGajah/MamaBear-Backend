import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, ProductStatus, BlogStatus } from "generated/prisma/client";
import * as bcrypt from "bcrypt";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function main() {
  console.log("🌱 Seeding database...\n");

  // ── 1. USERS ─────────────────────────────────────────────────────────────────
  const hashedAdmin = await bcrypt.hash("Admin@12345", 10);
  const hashedCustomer = await bcrypt.hash("Customer@12345", 10);

  const superAdmin = await prisma.user.upsert({
    where: { email: "superadmin@mamabear.id" },
    update: {},
    create: { name: "Super Admin", email: "superadmin@mamabear.id", password: hashedAdmin, role: "super_admin", isVerified: true },
  });

  const admin = await prisma.user.upsert({
    where: { email: "admin@mamabear.id" },
    update: {},
    create: { name: "Admin Mamabear", email: "admin@mamabear.id", password: hashedAdmin, role: "admin", isVerified: true },
  });

  const c1 = await prisma.user.upsert({
    where: { email: "customer@mamabear.id" },
    update: {},
    create: { name: "Demo Customer", email: "customer@mamabear.id", password: hashedCustomer, role: "customer", isVerified: true, phone: "081234567890" },
  });

  const c2 = await prisma.user.upsert({
    where: { email: "ani.wijaya@example.com" },
    update: {},
    create: { name: "Ani Wijaya", email: "ani.wijaya@example.com", password: hashedCustomer, role: "customer", isVerified: true, phone: "082345678901" },
  });

  const c3 = await prisma.user.upsert({
    where: { email: "budi.santoso@example.com" },
    update: {},
    create: { name: "Budi Santoso", email: "budi.santoso@example.com", password: hashedCustomer, role: "customer", isVerified: true, phone: "083456789012" },
  });

  const c4 = await prisma.user.upsert({
    where: { email: "citra.dewi@example.com" },
    update: {},
    create: { name: "Citra Dewi", email: "citra.dewi@example.com", password: hashedCustomer, role: "customer", isVerified: true, phone: "084567890123" },
  });

  const c5 = await prisma.user.upsert({
    where: { email: "diana.putri@example.com" },
    update: {},
    create: { name: "Diana Putri", email: "diana.putri@example.com", password: hashedCustomer, role: "customer", isVerified: true, phone: "085678901234" },
  });

  const customers = [c1, c2, c3, c4, c5];
  const customerIds = customers.map((c) => c.id);
  console.log(`✅ Users seeded: ${superAdmin.name}, ${admin.name}, ${customers.map((c) => c.name).join(", ")}`);

  // ── 2. MEMBERSHIPS ────────────────────────────────────────────────────────────
  const membershipSeeds = [
    { userId: c1.id, points: 150 },
    { userId: c2.id, points: 75 },
    { userId: c3.id, points: 200 },
    { userId: c4.id, points: 25 },
    { userId: c5.id, points: 0 },
  ];
  for (const m of membershipSeeds) {
    await prisma.membership.upsert({
      where: { userId: m.userId },
      update: { points: m.points },
      create: { userId: m.userId, points: m.points },
    });
  }
  console.log("✅ Memberships seeded: 5");

  // ── 3. CATEGORIES ─────────────────────────────────────────────────────────────
  const momsAndBaby = await prisma.category.upsert({
    where: { slug: "moms-and-baby" },
    update: {},
    create: { name: "Moms & Baby", slug: "moms-and-baby", isActive: true, sortOrder: 0 },
  });
  const maternitySupplies = await prisma.category.upsert({
    where: { slug: "maternity-supplies" },
    update: {},
    create: { name: "Maternity Supplies", slug: "maternity-supplies", parentId: momsAndBaby.id, isActive: true, sortOrder: 1 },
  });
  const asiBooster = await prisma.category.upsert({
    where: { slug: "asi-booster" },
    update: {},
    create: { name: "ASI Booster", slug: "asi-booster", parentId: maternitySupplies.id, isActive: true, sortOrder: 0 },
  });
  const catAlmonMix = await prisma.category.upsert({
    where: { slug: "almonmix" },
    update: {},
    create: { name: "AlmonMix", slug: "almonmix", parentId: maternitySupplies.id, isActive: true, sortOrder: 1 },
  });
  const catZoyaMix = await prisma.category.upsert({
    where: { slug: "zoyamix" },
    update: {},
    create: { name: "ZoyaMix", slug: "zoyamix", parentId: maternitySupplies.id, isActive: true, sortOrder: 2 },
  });
  const catTehPelancar = await prisma.category.upsert({
    where: { slug: "teh-pelancar-asi" },
    update: {},
    create: { name: "Teh Pelancar ASI", slug: "teh-pelancar-asi", parentId: asiBooster.id, isActive: true, sortOrder: 0 },
  });
  const catKookie = await prisma.category.upsert({
    where: { slug: "kookie" },
    update: {},
    create: { name: "Kookie", slug: "kookie", parentId: asiBooster.id, isActive: true, sortOrder: 1 },
  });
  const catKapsul = await prisma.category.upsert({
    where: { slug: "kapsul-pelancar-asi" },
    update: {},
    create: { name: "Kapsul Pelancar ASI", slug: "kapsul-pelancar-asi", parentId: asiBooster.id, isActive: true, sortOrder: 2 },
  });
  console.log("✅ Categories seeded: 8");

  // ── 4. PRODUCTS ───────────────────────────────────────────────────────────────
  const almonMix = await prisma.product.upsert({
    where: { sku: "AL.MMBR" },
    update: {},
    create: {
      sku: "AL.MMBR",
      name: "MamaBear AlmonMix Isi 6 Sachet - Minuman Serbuk dengan Almond - Kaya Nutrisi Untuk Ibu Menyusui BPOM HALAL",
      slug: slugify("mamabear-almonmix-isi-6-sachet"),
      description: `MamaBear AlmonMix Isi 6 Sachet\nMinuman Almond Kaya Nutrisi dengan Daun Katuk & Daun Kelor.\n\nLACTOSE FREE\nTINGGI VITAMIN A, B1, B2, B6, B9 (ASAM FOLAT), B12\nTINGGI VITAMIN C & ZAT BESI\nTINGGI SERAT PANGAN\nMAKRO & MIKRO NUTRISI LENGKAP\n\nHadir dalam 7 varian rasa:\nCokelat, Choco Hazelnut, Coffee Latte, Strawberry, Vanilla, Matcha, Caramel`,
      basePrice: 80000, discountPrice: 40000, weight: 200, stock: 700,
      mainImage: "AlmonMix.zip", status: ProductStatus.active, categoryId: catAlmonMix.id,
      variants: {
        create: [
          { name: "Rasa", value: "Cokelat",        basePrice: 80000, discountPrice: 40000, imageUrl: "AlmonMix - Cokelat.png",        stock: 100, isActive: true },
          { name: "Rasa", value: "Choco Hazelnut", basePrice: 80000, discountPrice: 40000, imageUrl: "AlmonMix - Choco Hazelnut.png", stock: 100, isActive: true },
          { name: "Rasa", value: "Matcha",          basePrice: 80000, discountPrice: 40000, imageUrl: "AlmonMix - Matcha.png",          stock: 100, isActive: true },
          { name: "Rasa", value: "Vanilla",         basePrice: 80000, discountPrice: 40000, imageUrl: "AlmonMix - Vanilla.png",         stock: 100, isActive: true },
          { name: "Rasa", value: "Coffee Latte",    basePrice: 80000, discountPrice: 40000, imageUrl: "AlmonMix - Coffee Latte.png",    stock: 100, isActive: true },
          { name: "Rasa", value: "Strawberry",      basePrice: 80000, discountPrice: 40000, imageUrl: "AlmonMix - Strawberry.png",      stock: 100, isActive: true },
          { name: "Rasa", value: "Caramel",         basePrice: 80000, discountPrice: 40000, imageUrl: "AlmonMix - Caramel.png",         stock: 100, isActive: true },
        ],
      },
      images: {
        create: [
          { imageUrl: "AlmonMix - Cokelat.png",        altText: "AlmonMix rasa Cokelat",        sortOrder: 0, isFeatured: true  },
          { imageUrl: "AlmonMix - Choco Hazelnut.png", altText: "AlmonMix rasa Choco Hazelnut", sortOrder: 1, isFeatured: false },
          { imageUrl: "AlmonMix - Matcha.png",          altText: "AlmonMix rasa Matcha",          sortOrder: 2, isFeatured: false },
          { imageUrl: "AlmonMix - Vanilla.png",         altText: "AlmonMix rasa Vanilla",         sortOrder: 3, isFeatured: false },
          { imageUrl: "AlmonMix - Coffee Latte.png",    altText: "AlmonMix rasa Coffee Latte",    sortOrder: 4, isFeatured: false },
          { imageUrl: "AlmonMix - Strawberry.png",      altText: "AlmonMix rasa Strawberry",      sortOrder: 5, isFeatured: false },
          { imageUrl: "AlmonMix - Caramel.png",         altText: "AlmonMix rasa Caramel",         sortOrder: 6, isFeatured: false },
        ],
      },
    },
  });

  const zoyaMix = await prisma.product.upsert({
    where: { sku: "ZM.MMBR" },
    update: {},
    create: {
      sku: "ZM.MMBR",
      name: "MamaBear ZoyaMix Rasa Cokelat Isi 10 Sachet - Sereal Kaya Nutrisi untuk Ibu Menyusui Halal BPOM",
      slug: slugify("mamabear-zoyamix-rasa-cokelat-isi-10-sachet"),
      description: `MamaBear ZoyaMix Rasa Cokelat Isi 10 Sachet\nSereal Kaya Nutrisi untuk Ibu Menyusui.\n\nMAKRO & MIKRO NUTRISI LENGKAP\nSUMBER PROTEIN & ZAT BESI\nTINGGI KALSIUM`,
      basePrice: 80000, discountPrice: 38000, weight: 250, stock: 100,
      mainImage: "ZoyaMix.zip", status: ProductStatus.active, categoryId: catZoyaMix.id,
      variants: {
        create: [
          { name: "Rasa", value: "Cokelat", basePrice: 80000, discountPrice: 38000, imageUrl: "Zoya Mix Cokelat 2.png", stock: 100, isActive: true },
        ],
      },
      images: {
        create: [
          { imageUrl: "Zoya Mix Cokelat 2.png", altText: "ZoyaMix rasa Cokelat", sortOrder: 0, isFeatured: true },
        ],
      },
    },
  });

  const tehPelancar = await prisma.product.upsert({
    where: { sku: "TPA.MMBR" },
    update: {},
    create: {
      sku: "TPA.MMBR",
      name: "MamaBear Teh Pelancar ASI Isi 20 Sachet - ASI Booster Pelancar Peningkat Produksi ASI BPOM dan Halal",
      slug: slugify("mamabear-teh-pelancar-asi-isi-20-sachet"),
      description: `MamaBear Teh Pelancar ASI Isi 20 Sachet\nASI Booster & Immunity Tea.\n\nTanpa tambahan bahan pengawet.\nRasa manis alami. Herbal kaya antioksidan.`,
      basePrice: 65000, discountPrice: 40000, weight: 100, stock: 200,
      mainImage: "Teh.zip", status: ProductStatus.active, categoryId: catTehPelancar.id,
      variants: {
        create: [
          { name: "Rasa", value: "Strawberry", basePrice: 65000, discountPrice: 40000, imageUrl: "Teh Strawberry 1.png", stock: 100, isActive: true },
          { name: "Rasa", value: "Blueberry",  basePrice: 65000, discountPrice: 40000, imageUrl: "Teh Blueberry 1.png",  stock: 100, isActive: true },
        ],
      },
      images: {
        create: [
          { imageUrl: "Teh Strawberry 1.png", altText: "Teh Pelancar ASI rasa Strawberry", sortOrder: 0, isFeatured: true  },
          { imageUrl: "Teh Blueberry 1.png",  altText: "Teh Pelancar ASI rasa Blueberry",  sortOrder: 1, isFeatured: false },
        ],
      },
    },
  });

  const kukis = await prisma.product.upsert({
    where: { sku: "KU.MMBR" },
    update: {},
    create: {
      sku: "KU.MMBR",
      name: "MamaBear Kukis Almond Oat - Camilan Kaya Nutrisi untuk Ibu Menyusui Halal BPOM",
      slug: slugify("mamabear-kukis-almond-oat"),
      description: `MamaBear Kukis Almon Oat\nMemberi segala kebaikan untuk Mama selama masa menyusui.\n\nSUPERFOOD meningkatkan produksi & nutrisi ASI\nMAKRO & MIKRONUTRISI lengkap untuk Mama`,
      basePrice: 80000, discountPrice: 40000, weight: 150, stock: 300,
      mainImage: "PDP - Almond Oat Cookies & Cream 04.zip", status: ProductStatus.active, categoryId: catKookie.id,
      variants: {
        create: [
          { name: "Rasa", value: "Choco Nut",       basePrice: 80000, discountPrice: 40000, imageUrl: "Kookite Bites - Choco Nut (Less Sugar).png", stock: 100, isActive: true },
          { name: "Rasa", value: "Choco Chip",      basePrice: 94000, discountPrice: 54000, imageUrl: "kukis almond oat CC front.png",               stock: 100, isActive: true },
          { name: "Rasa", value: "Cookies & Cream", basePrice: 94000, discountPrice: 54000, imageUrl: "kukis almond oat C&C front.png",              stock: 100, isActive: true },
        ],
      },
      images: {
        create: [
          { imageUrl: "Kookite Bites - Choco Nut (Less Sugar).png", altText: "Kukis Almond Oat Choco Nut",       sortOrder: 0, isFeatured: true  },
          { imageUrl: "kukis almond oat CC front.png",               altText: "Kukis Almond Oat Choco Chip",      sortOrder: 1, isFeatured: false },
          { imageUrl: "kukis almond oat C&C front.png",              altText: "Kukis Almond Oat Cookies & Cream", sortOrder: 2, isFeatured: false },
        ],
      },
    },
  });

  const kapsul = await prisma.product.upsert({
    where: { sku: "CP.AB30" },
    update: {},
    create: {
      sku: "CP.AB30",
      name: "MamaBear ASI Booster 30 Kapsul - Pelancar ASI Fenugreek Free Halal BPOM",
      slug: slugify("mamabear-asi-booster-30-kapsul"),
      description: `MAMABEAR KAPSUL ASI BOOSTER\n\nKapsul Pelancar ASI pertama dengan Triple Benefit dalam 1 kapsul:\n- Meningkatkan produksi dan nutrisi ASI\n- Membantu meredakan peradangan pada penyumbatan kelenjar ASI (Mastitis)\n- Membantu meredakan nyeri pasca melahirkan`,
      basePrice: 100000, discountPrice: 61900, weight: 100, stock: 100,
      mainImage: "Kapsul.zip", status: ProductStatus.active, categoryId: catKapsul.id,
      variants: {
        create: [
          { name: "Ukuran", value: "30 kapsul", basePrice: 100000, discountPrice: 61900, imageUrl: "Kapsul ASI Booster 1 (1).png", stock: 100, isActive: true },
        ],
      },
      images: {
        create: [
          { imageUrl: "Kapsul ASI Booster 1 (1).png", altText: "Kapsul ASI Booster 30 kapsul", sortOrder: 0, isFeatured: true },
        ],
      },
    },
  });
  console.log("✅ Products seeded: 5 (with variants & images)");

  // ── 5. CLEANUP TRANSACTIONAL DATA (idempotent re-seed) ────────────────────────
  console.log("🧹 Cleaning transactional data...");
  const existingOrders = await prisma.order.findMany({ where: { userId: { in: customerIds } }, select: { id: true } });
  const existingOrderIds = existingOrders.map((o) => o.id);
  await prisma.productReview.deleteMany({ where: { userId: { in: customerIds } } }); // cascades helpfulVotes
  if (existingOrderIds.length > 0) {
    await prisma.payment.deleteMany({ where: { orderId: { in: existingOrderIds } } });
    await prisma.order.deleteMany({ where: { id: { in: existingOrderIds } } }); // cascades orderItems
  }
  await prisma.cart.deleteMany({ where: { userId: { in: customerIds } } }); // cascades cartItems
  await prisma.guestCart.deleteMany({}); // cascades guestCartItems
  await prisma.address.deleteMany({ where: { userId: { in: customerIds } } });
  console.log("   Done.\n");

  // ── 6. ADDRESSES ──────────────────────────────────────────────────────────────
  const [addr1, addr2, addr3, addr4] = await Promise.all([
    prisma.address.create({ data: { userId: c1.id, label: "Rumah",  receiverName: "Demo Customer", phone: "081234567890", address: "Jl. Merpati No. 12, RT 03/RW 05, Kel. Antapani Kidul",      cityId: "151", provinceId: "9",  postalCode: "40291", isDefault: true } }),
    prisma.address.create({ data: { userId: c2.id, label: "Rumah",  receiverName: "Ani Wijaya",    phone: "082345678901", address: "Jl. Dago No. 45, Kel. Dago, Kec. Coblong",                  cityId: "22",  provinceId: "9",  postalCode: "40135", isDefault: true } }),
    prisma.address.create({ data: { userId: c3.id, label: "Kantor", receiverName: "Budi Santoso",  phone: "083456789012", address: "Jl. Raya Darmo No. 88, Kel. Darmo, Kec. Wonokromo",         cityId: "444", provinceId: "11", postalCode: "60241", isDefault: true } }),
    prisma.address.create({ data: { userId: c4.id, label: "Rumah",  receiverName: "Citra Dewi",    phone: "084567890123", address: "Jl. Sudirman No. 100, Kel. Gelora, Kec. Tanah Abang",       cityId: "153", provinceId: "6",  postalCode: "10220", isDefault: true } }),
    prisma.address.create({ data: { userId: c5.id, label: "Rumah",  receiverName: "Diana Putri",   phone: "085678901234", address: "Jl. Imam Bonjol No. 25, Kel. Menteng, Kec. Menteng",        cityId: "153", provinceId: "6",  postalCode: "10310", isDefault: true } }),
  ]);
  console.log("✅ Addresses seeded: 5");

  // ── 7. CARTS ──────────────────────────────────────────────────────────────────
  await Promise.all([
    // c1: AlmonMix x2 + Teh x1 (browsing before checkout)
    prisma.cart.create({
      data: {
        userId: c1.id,
        items: { create: [
          { productId: almonMix.id, quantity: 2, price: 40000 },
          { productId: tehPelancar.id, quantity: 1, price: 40000 },
        ]},
      },
    }),
    // c4: Kukis x1
    prisma.cart.create({
      data: {
        userId: c4.id,
        items: { create: [
          { productId: kukis.id, quantity: 1, price: 40000 },
        ]},
      },
    }),
    // c5: ZoyaMix x2 + Kapsul x1
    prisma.cart.create({
      data: {
        userId: c5.id,
        items: { create: [
          { productId: zoyaMix.id, quantity: 2, price: 38000 },
          { productId: kapsul.id, quantity: 1, price: 61900 },
        ]},
      },
    }),
  ]);
  console.log("✅ Carts seeded: 3 (c1, c4, c5 with items)");

  // ── 8. GUEST CART ─────────────────────────────────────────────────────────────
  await prisma.guestCart.create({
    data: {
      sessionId: "guest-session-demo-001",
      items: { create: [
        { productId: almonMix.id, quantity: 1, price: 40000 },
        { productId: kapsul.id, quantity: 1, price: 61900 },
      ]},
    },
  });
  console.log("✅ Guest cart seeded: 1 (sessionId: guest-session-demo-001)");

  // ── 9. ORDERS ─────────────────────────────────────────────────────────────────
  // ── c1: delivered, shipped, processing, pending ───────────────────────────────
  // order1: delivered | paid  → total: (40000×2 + 40000×1) + 15000 = 135000
  const order1 = await prisma.order.create({
    data: {
      userId: c1.id, addressId: addr1.id,
      status: "delivered", paymentStatus: "paid",
      total: 135000, shippingCost: 15000, courier: "JNE", service: "REG",
      trackingNumber: "JNE20260401001",
      createdAt: new Date("2026-04-01T08:30:00Z"),
      items: { create: [
        { productId: almonMix.id, quantity: 2, price: 40000 },
        { productId: tehPelancar.id, quantity: 1, price: 40000 },
      ]},
    },
  });

  // order2: shipped | paid  → total: (54000×1 + 38000×1 + 61900×1) + 15000 = 168900
  const order2 = await prisma.order.create({
    data: {
      userId: c1.id, addressId: addr1.id,
      status: "shipped", paymentStatus: "paid",
      total: 168900, shippingCost: 15000, courier: "JNE", service: "REG",
      trackingNumber: "JNE20260510001",
      createdAt: new Date("2026-05-10T10:15:00Z"),
      items: { create: [
        { productId: kukis.id, quantity: 1, price: 54000 },
        { productId: zoyaMix.id, quantity: 1, price: 38000 },
        { productId: kapsul.id, quantity: 1, price: 61900 },
      ]},
    },
  });

  // order3: processing | paid  → total: (40000×2) + 20000 = 100000
  const order3 = await prisma.order.create({
    data: {
      userId: c1.id, addressId: addr1.id,
      status: "processing", paymentStatus: "paid",
      total: 100000, shippingCost: 20000, courier: "TIKI", service: "ONS",
      createdAt: new Date("2026-05-18T14:00:00Z"),
      items: { create: [
        { productId: almonMix.id, quantity: 2, price: 40000 },
      ]},
    },
  });

  // order4: pending | pending  → total: (40000×1 + 61900×1) + 18000 = 119900
  const order4 = await prisma.order.create({
    data: {
      userId: c1.id, addressId: addr1.id,
      status: "pending", paymentStatus: "pending",
      total: 119900, shippingCost: 18000, courier: "SICEPAT", service: "REG",
      createdAt: new Date("2026-05-23T09:45:00Z"),
      items: { create: [
        { productId: tehPelancar.id, quantity: 1, price: 40000 },
        { productId: kapsul.id, quantity: 1, price: 61900 },
      ]},
    },
  });

  // ── c2: delivered, cancelled ──────────────────────────────────────────────────
  // order5: delivered | paid  → total: (38000×2 + 40000×1) + 20000 = 136000
  const order5 = await prisma.order.create({
    data: {
      userId: c2.id, addressId: addr2.id,
      status: "delivered", paymentStatus: "paid",
      total: 136000, shippingCost: 20000, courier: "JNE", service: "REG",
      trackingNumber: "JNE20260315001",
      createdAt: new Date("2026-03-15T11:00:00Z"),
      items: { create: [
        { productId: zoyaMix.id, quantity: 2, price: 38000 },
        { productId: almonMix.id, quantity: 1, price: 40000 },
      ]},
    },
  });

  // order6: cancelled | expired  → total: (40000×1 + 40000×1) + 20000 = 100000
  const order6 = await prisma.order.create({
    data: {
      userId: c2.id, addressId: addr2.id,
      status: "cancelled", paymentStatus: "expired",
      total: 100000, shippingCost: 20000, courier: "TIKI", service: "REG",
      createdAt: new Date("2026-05-01T16:30:00Z"),
      items: { create: [
        { productId: kukis.id, quantity: 1, price: 40000 },
        { productId: tehPelancar.id, quantity: 1, price: 40000 },
      ]},
    },
  });

  // ── c3: delivered, processing ─────────────────────────────────────────────────
  // order7: delivered | paid  → total: (61900×1 + 38000×1) + 25000 = 124900
  const order7 = await prisma.order.create({
    data: {
      userId: c3.id, addressId: addr3.id,
      status: "delivered", paymentStatus: "paid",
      total: 124900, shippingCost: 25000, courier: "JNE", service: "REG",
      trackingNumber: "JNE20260220001",
      createdAt: new Date("2026-02-20T09:00:00Z"),
      items: { create: [
        { productId: kapsul.id, quantity: 1, price: 61900 },
        { productId: zoyaMix.id, quantity: 1, price: 38000 },
      ]},
    },
  });

  // order8: processing | paid  → total: (40000×2 + 61900×1) + 25000 = 166900
  const order8 = await prisma.order.create({
    data: {
      userId: c3.id, addressId: addr3.id,
      status: "processing", paymentStatus: "paid",
      total: 166900, shippingCost: 25000, courier: "SICEPAT", service: "BEST",
      createdAt: new Date("2026-05-20T13:00:00Z"),
      items: { create: [
        { productId: almonMix.id, quantity: 2, price: 40000 },
        { productId: kapsul.id, quantity: 1, price: 61900 },
      ]},
    },
  });

  // ── c4: paid, pending ─────────────────────────────────────────────────────────
  // order9: paid | paid  → total: (40000×1 + 40000×1) + 18000 = 98000
  const order9 = await prisma.order.create({
    data: {
      userId: c4.id, addressId: addr4.id,
      status: "paid", paymentStatus: "paid",
      total: 98000, shippingCost: 18000, courier: "JNE", service: "REG",
      createdAt: new Date("2026-05-22T15:00:00Z"),
      items: { create: [
        { productId: tehPelancar.id, quantity: 1, price: 40000 },
        { productId: kukis.id, quantity: 1, price: 40000 },
      ]},
    },
  });

  // order10: pending | pending  → total: (40000×1 + 38000×1) + 18000 = 96000
  const order10 = await prisma.order.create({
    data: {
      userId: c4.id, addressId: addr4.id,
      status: "pending", paymentStatus: "pending",
      total: 96000, shippingCost: 18000, courier: "TIKI", service: "ONS",
      createdAt: new Date("2026-05-24T08:00:00Z"),
      items: { create: [
        { productId: almonMix.id, quantity: 1, price: 40000 },
        { productId: zoyaMix.id, quantity: 1, price: 38000 },
      ]},
    },
  });

  console.log("✅ Orders seeded: 10 (all statuses covered)");

  // ── 10. PAYMENTS ──────────────────────────────────────────────────────────────
  await Promise.all([
    // Paid orders
    prisma.payment.create({ data: { orderId: order1.id, provider: "midtrans", status: "paid", amount: 135000, paidAt: new Date("2026-04-01T08:35:00Z"), paymentUrl: `https://app.midtrans.com/pay/${order1.id}` } }),
    prisma.payment.create({ data: { orderId: order2.id, provider: "xendit", status: "paid", amount: 168900, paidAt: new Date("2026-05-10T10:20:00Z"), paymentUrl: `https://checkout.xendit.co/${order2.id}` } }),
    prisma.payment.create({ data: { orderId: order3.id, provider: "midtrans", status: "paid", amount: 100000, paidAt: new Date("2026-05-18T14:05:00Z"), paymentUrl: `https://app.midtrans.com/pay/${order3.id}` } }),
    prisma.payment.create({ data: { orderId: order5.id, provider: "xendit", status: "paid", amount: 136000, paidAt: new Date("2026-03-15T11:05:00Z"), paymentUrl: `https://checkout.xendit.co/${order5.id}` } }),
    prisma.payment.create({ data: { orderId: order7.id, provider: "midtrans", status: "paid", amount: 124900, paidAt: new Date("2026-02-20T09:05:00Z"), paymentUrl: `https://app.midtrans.com/pay/${order7.id}` } }),
    prisma.payment.create({ data: { orderId: order8.id, provider: "xendit", status: "paid", amount: 166900, paidAt: new Date("2026-05-20T13:05:00Z"), paymentUrl: `https://checkout.xendit.co/${order8.id}` } }),
    prisma.payment.create({ data: { orderId: order9.id, provider: "midtrans", status: "paid", amount: 98000, paidAt: new Date("2026-05-22T15:05:00Z"), paymentUrl: `https://app.midtrans.com/pay/${order9.id}` } }),
    // Pending payments
    prisma.payment.create({ data: { orderId: order4.id, provider: "midtrans", status: "pending", amount: 119900, paymentUrl: `https://app.midtrans.com/pay/${order4.id}` } }),
    prisma.payment.create({ data: { orderId: order10.id, provider: "xendit", status: "pending", amount: 96000, paymentUrl: `https://checkout.xendit.co/${order10.id}` } }),
    // Expired payment (cancelled order)
    prisma.payment.create({ data: { orderId: order6.id, provider: "xendit", status: "expired", amount: 100000, paymentUrl: `https://checkout.xendit.co/${order6.id}` } }),
  ]);
  console.log("✅ Payments seeded: 10 (7 paid, 2 pending, 1 expired)");

  // ── 11. PRODUCT REVIEWS ───────────────────────────────────────────────────────
  const rev1 = await prisma.productReview.create({
    data: {
      productId: almonMix.id, userId: c1.id, orderId: order1.id,
      rating: 5, isVerifiedPurchase: true, helpfulCount: 2,
      review: "Produk luar biasa! ASI saya meningkat drastis setelah seminggu konsumsi AlmonMix. Rasa Cokelat dan Matcha favorit saya. Sangat direkomendasikan untuk semua ibu menyusui!",
    },
  });
  const rev2 = await prisma.productReview.create({
    data: {
      productId: tehPelancar.id, userId: c1.id, orderId: order1.id,
      rating: 4, isVerifiedPurchase: true, helpfulCount: 1,
      review: "Tehnya enak dan segar. Sudah terasa manfaatnya dalam 3 hari. Packagingnya juga bagus dan praktis. Recommended!",
    },
  });
  const rev3 = await prisma.productReview.create({
    data: {
      productId: zoyaMix.id, userId: c2.id, orderId: order5.id,
      rating: 5, isVerifiedPurchase: true, helpfulCount: 3,
      review: "ZoyaMix benar-benar membantu! Awalnya ragu tapi setelah coba ternyata rasanya enak banget. Suami pun suka minum bareng saya. Produksi ASI jadi lebih lancar dan bayi kenyang lebih lama.",
    },
  });
  const rev4 = await prisma.productReview.create({
    data: {
      productId: almonMix.id, userId: c2.id, orderId: order5.id,
      rating: 4, isVerifiedPurchase: true, helpfulCount: 1,
      review: "Rasanya enak, tapi sayang kalau terkena panas agak menggumpal. Overall tetap bagus dan manfaatnya terasa!",
    },
  });
  const rev5 = await prisma.productReview.create({
    data: {
      productId: kapsul.id, userId: c3.id, orderId: order7.id,
      rating: 5, isVerifiedPurchase: true, helpfulCount: 4,
      review: "Kapsul ini benar-benar work! Sempat mengalami mastitis dan setelah konsumsi kapsul ini peradangannya berkurang signifikan. Produksi ASI juga meningkat pesat. Terima kasih Mamabear, produk ini penyelamat!",
    },
  });
  await prisma.productReview.create({
    data: {
      productId: zoyaMix.id, userId: c3.id, orderId: order7.id,
      rating: 3, isVerifiedPurchase: true, helpfulCount: 0,
      review: "Rasanya oke, tapi efeknya tidak terlalu terasa di saya. Mungkin perlu konsumsi lebih lama atau kombinasi dengan produk lain.",
    },
  });
  console.log("✅ Product reviews seeded: 6");

  // ── 12. HELPFUL VOTES ─────────────────────────────────────────────────────────
  await Promise.all([
    // rev1 (AlmonMix ★5 by c1): c2 & c3 find helpful — count: 2 ✓
    prisma.productReviewHelpful.create({ data: { reviewId: rev1.id, userId: c2.id, isHelpful: true } }),
    prisma.productReviewHelpful.create({ data: { reviewId: rev1.id, userId: c3.id, isHelpful: true } }),
    // rev2 (Teh ★4 by c1): c2 finds helpful — count: 1 ✓
    prisma.productReviewHelpful.create({ data: { reviewId: rev2.id, userId: c2.id, isHelpful: true } }),
    // rev3 (ZoyaMix ★5 by c2): c1, c3, c4 find helpful — count: 3 ✓
    prisma.productReviewHelpful.create({ data: { reviewId: rev3.id, userId: c1.id, isHelpful: true } }),
    prisma.productReviewHelpful.create({ data: { reviewId: rev3.id, userId: c3.id, isHelpful: true } }),
    prisma.productReviewHelpful.create({ data: { reviewId: rev3.id, userId: c4.id, isHelpful: true } }),
    // rev4 (AlmonMix ★4 by c2): c1 finds helpful — count: 1 ✓
    prisma.productReviewHelpful.create({ data: { reviewId: rev4.id, userId: c1.id, isHelpful: true } }),
    // rev5 (Kapsul ★5 by c3): c1, c2, c4, c5 find helpful — count: 4 ✓
    prisma.productReviewHelpful.create({ data: { reviewId: rev5.id, userId: c1.id, isHelpful: true } }),
    prisma.productReviewHelpful.create({ data: { reviewId: rev5.id, userId: c2.id, isHelpful: true } }),
    prisma.productReviewHelpful.create({ data: { reviewId: rev5.id, userId: c4.id, isHelpful: true } }),
    prisma.productReviewHelpful.create({ data: { reviewId: rev5.id, userId: c5.id, isHelpful: true } }),
    // rev6 (ZoyaMix ★3 by c3): no votes — count: 0 ✓
  ]);
  console.log("✅ Helpful votes seeded: 11");

  // ── 13. FAQ ───────────────────────────────────────────────────────────────────
  await prisma.faq.deleteMany({});
  await prisma.faq.createMany({
    data: [
      { question: "Apa itu Mamabear?", answer: "Mamabear adalah penyedia produk-produk pelancar ASI dengan bahan-bahan alami. Founder Agnes Susanti Widjaja adalah ibu menyusui sekaligus Bachelor degree in Science in Food Technology & Nutrition lulusan Royal Melbourne Institute of Technology.", isActive: true },
      { question: "Apa saja produk-produk Mamabear?", answer: "Mamabear menyediakan produk-produk pelancar ASI yaitu: Teh Pelancar ASI, Minuman Bubuk (ZoyaMix dan AlmonMix), dan Almond Oat Cookies. Kami juga menawarkan Kantong ASI dan produk menarik lainnya.", isActive: true },
      { question: "Apa keunggulan produk Mamabear?", answer: "Kami hanya menggunakan bahan-bahan alami berkualitas yang diproduksi dengan teknologi dan proses terbaik. Seluruh produk kami aman dan efektif, serta praktis untuk ibu menyusui. Seluruh produk Mamabear juga telah lulus uji BPOM dan tersertifikasi Halal.", isActive: true },
      { question: "Produk pelancar ASI yang paling cocok untuk saya?", answer: "Setiap produk Mamabear dibuat untuk ibu menyusui. Namun, setiap hasil yang dirasakan akan berbeda-beda pada setiap individu. Sesuai pengalaman kami, Teh Pelancar ASI dan ZoyaMix efektif untuk meningkatkan produksi ASI, sedangkan AlmonMix dan Almond Oat Cookies bisa memperkaya kualitas ASI.", isActive: true },
      { question: "Apa perbedaan antara ZoyaMix dan AlmonMix?", answer: "ZoyaMix dan AlmonMix adalah produk minuman bubuk dari bahan-bahan tumbuhan yang didesain untuk meningkatkan produksi ASI. Keduanya punya rasa lezat dan praktis digunakan. Perbedaannya lebih ke bahan-bahan yang digunakan dan rasa yang tersedia.", isActive: true },
      { question: "Apakah ada peringatan kesehatan sebelum pemakaian produk Mamabear?", answer: "Seluruh produk kami terbuat dari bahan-bahan alami dan pilihan yang aman untuk ibu menyusui. ZoyaMix dan Almond Oat Cookies juga cocok untuk segala usia, termasuk untuk ibu hamil.", isActive: true },
      { question: "Apakah ada efek samping dari produk Mamabear?", answer: "Jika dikonsumsi secara tepat dan sesuai dengan porsi yang direkomendasikan di kemasan, produk Mamabear tidak memiliki efek samping atau ketergantungan.", isActive: true },
      { question: "Apakah ibu hamil boleh mengkonsumsi produk Mamabear?", answer: "Teh Pelancar ASI Mamabear boleh dikonsumsi setelah melahirkan atau pasca bersalin. Ibu hamil juga boleh mengkonsumsi teh setelah minggu ke-38 kehamilan. Selain itu, ZoyaMix dan Almond Oat Cookies aman dan cocok untuk segala usia.", isActive: true },
      { question: "Bagaimana cara konsumsi produk Mamabear agar cepat mendapatkan hasil?", answer: "Ikuti anjuran pemakaian yang tersedia untuk masing-masing produk. Jika ingin mengombinasikan beberapa produk Mamabear sekaligus, Anda bisa menggunakannya secara bergantian.", isActive: true },
      { question: "Apakah produk Mamabear bisa digunakan secara bersamaan?", answer: "Ya, kombinasi produk-produk Mamabear dapat saling melengkapi dan mendukung produksi ASI yang semakin maksimal. Seluruh bahan-bahan kami bersifat alami dan tidak mengandung bahan kimia berbahaya.", isActive: true },
      { question: "Apakah produk Mamabear aman untuk yang alergi susu?", answer: "Hampir seluruh produk kami tidak mengandung susu dan produk turunannya, KECUALI Almond Oat Cookies varian Chocolate Chip dan Cookies and Cream.", isActive: true },
      { question: "Bagaimana cara pesan produk Mamabear?", answer: "Buat akun dengan cara mendaftarkan email Anda. Login dan tambahkan produk ke keranjang, lalu lengkapi pembayaran untuk menyelesaikan pesanan.", isActive: true },
      { question: "Apa saja sistem pembayaran yang tersedia?", answer: "Kami menerima berbagai bentuk pembayaran, antara lain transfer bank (BCA & Mandiri), kartu kredit, GoPay, dan Alfamart.", isActive: true },
      { question: "Berapa lama untuk proses pengiriman?", answer: "Pesanan Anda akan diproses dalam 3-4 hari kerja. Lama pengiriman tergantung pada lokasi tujuan.", isActive: true },
      { question: "Apakah saya bisa mengganti pesanan atau alamat jika pembayaran sudah terkonfirmasi?", answer: "Untuk mengubah pesanan, langsung WhatsApp untuk menghubungi tim kami. Untuk mengubah alamat, silahkan batalkan pesanan untuk membuat pesanan baru.", isActive: true },
      { question: "Apakah ada diskon belanja?", answer: "Silahkan subscribe ke newsletter kami untuk mendapatkan info penawaran dan update menarik lainnya!", isActive: true },
      { question: "Apakah Mamabear punya program reseller?", answer: "Ya, Mamabear memiliki program reseller. Silahkan hubungi kami via WhatsApp untuk informasi lebih lanjut.", isActive: true },
    ],
  });
  console.log("✅ FAQ seeded: 17");

  // ── 14. BLOG POSTS ────────────────────────────────────────────────────────────
  const blogPosts = [
    {
      title: "Manfaat Daun Katuk untuk Produksi ASI",
      slug: "manfaat-daun-katuk-untuk-produksi-asi",
      content: `Daun katuk (Sauropus androgynus) sudah lama dikenal sebagai galaktagog alami yang efektif meningkatkan produksi ASI. Kandungan fitosterol dan steroid pada daun katuk dipercaya dapat merangsang hormon prolaktin yang berperan dalam produksi ASI.\n\nPenelitian menunjukkan bahwa ibu menyusui yang mengonsumsi ekstrak daun katuk secara rutin mengalami peningkat volume ASI yang signifikan. Selain itu, daun katuk juga kaya akan vitamin A, C, dan zat besi yang penting untuk kesehatan ibu dan bayi.\n\nMamabear menggunakan ekstrak daun katuk berkualitas tinggi dalam seluruh lini produknya.`,
      status: BlogStatus.published, publishedAt: new Date("2024-01-15"),
    },
    {
      title: "Tips Menyusui untuk Ibu Baru: Panduan Lengkap",
      slug: "tips-menyusui-untuk-ibu-baru",
      content: `Menyusui adalah perjalanan yang indah sekaligus penuh tantangan bagi ibu baru. Berikut beberapa tips yang dapat membantu:\n\n1. Susui sesering mungkin di awal kelahiran untuk merangsang produksi ASI.\n2. Pastikan posisi menyusui yang benar agar bayi dapat mengisap dengan optimal.\n3. Jaga asupan nutrisi ibu dengan makanan bergizi dan suplemen pendukung ASI.\n4. Istirahat yang cukup karena stres dan kelelahan dapat menghambat produksi ASI.\n5. Tetap terhidrasi dengan minum air putih minimal 8 gelas per hari.`,
      status: BlogStatus.published, publishedAt: new Date("2024-02-01"),
    },
    {
      title: "Mengenal Mastitis: Penyebab, Gejala, dan Cara Mengatasinya",
      slug: "mengenal-mastitis-penyebab-gejala-cara-mengatasi",
      content: `Mastitis adalah peradangan pada jaringan payudara yang sering dialami ibu menyusui. Kondisi ini dapat menyebabkan rasa nyeri, pembengkakan, dan kemerahan pada payudara.\n\nPenyebab utama mastitis adalah penyumbatan saluran ASI atau infeksi bakteri. Beberapa faktor risiko meliputi teknik menyusui yang tidak tepat, jadwal menyusui yang tidak teratur, atau penggunaan bra yang terlalu ketat.\n\nMamaBear Kapsul ASI Booster diformulasikan dengan ekstrak jahe merah yang memiliki sifat anti-inflamasi untuk membantu meredakan peradangan.`,
      status: BlogStatus.draft, publishedAt: null,
    },
    {
      title: "Panduan Nutrisi Ibu Menyusui: Makanan yang Wajib Dikonsumsi",
      slug: "panduan-nutrisi-ibu-menyusui",
      content: `Nutrisi yang baik sangat penting selama masa menyusui. Ibu menyusui membutuhkan sekitar 500 kalori ekstra per hari dibanding sebelum hamil.\n\nMakanan yang direkomendasikan:\n- Protein: ikan, daging, telur, tahu, tempe\n- Kalsium: susu, keju, yogurt, sayuran hijau\n- Zat besi: daging merah, bayam, kacang-kacangan\n- Vitamin C: jeruk, paprika, brokoli\n- Lemak sehat: alpukat, minyak zaitun, kacang almond\n\nSelain makanan, suplemen seperti AlmonMix dapat melengkapi nutrisi harian ibu menyusui dengan cara yang praktis dan lezat.`,
      status: BlogStatus.published, publishedAt: new Date("2024-03-10"),
    },
    {
      title: "5 Mitos tentang ASI yang Perlu Diluruskan",
      slug: "5-mitos-tentang-asi-yang-perlu-diluruskan",
      content: `Banyak mitos seputar menyusui yang beredar di masyarakat. Berikut 5 mitos yang perlu diluruskan:\n\n1. Mitos: Payudara kecil menghasilkan ASI lebih sedikit. Fakta: Ukuran payudara tidak menentukan jumlah produksi ASI.\n\n2. Mitos: Ibu sakit tidak boleh menyusui. Fakta: Sebagian besar penyakit ringan tidak menghalangi menyusui.\n\n3. Mitos: ASI pertama (kolostrum) harus dibuang. Fakta: Kolostrum sangat berharga karena kaya antibodi.\n\n4. Mitos: Stres total menghentikan produksi ASI. Fakta: Stres memang dapat sedikit mengurangi ASI, tapi jarang menghentikan sepenuhnya.\n\n5. Mitos: Bayi yang sering menyusu berarti ASI kurang. Fakta: Bayi yang sering menyusu justru merangsang produksi ASI lebih banyak.`,
      status: BlogStatus.published, publishedAt: new Date("2024-04-05"),
    },
  ];
  for (const post of blogPosts) {
    await prisma.blogPost.upsert({ where: { slug: post.slug }, update: {}, create: post });
  }
  console.log(`✅ Blog posts seeded: ${blogPosts.length}`);

  // ── 15. CONSULTATIONS ─────────────────────────────────────────────────────────
  await prisma.consultation.deleteMany({});
  await prisma.consultation.createMany({
    data: [
      { name: "Ratna Sari",     email: "ratna@example.com",  phone: "081111111111", message: "Saya ingin tahu produk mana yang cocok untuk meningkatkan ASI saya yang sedikit. Bayi saya baru 2 minggu.",                                               status: "new" },
      { name: "Siti Rahayu",   email: "siti@example.com",   phone: "082222222222", message: "Apakah aman mengkonsumsi AlmonMix bersamaan dengan ZoyaMix? Saya sedang menyusui bayi 3 bulan.",                                                           status: "in_progress" },
      { name: "Dewi Lestari",  email: "dewi@example.com",   phone: "083333333333", message: "Produk saya sudah habis tapi ASI saya sudah lancar. Apakah perlu lanjut konsumsi?",                                                                        status: "closed" },
      { name: "Maya Anggraini", email: "maya@example.com",   phone: "084444444444", message: "Saya baru melahirkan 2 hari lalu dan ASI belum keluar. Produk apa yang paling cepat membantu?",                                                            status: "new" },
      { name: "Rika Fitriani", email: "rika@example.com",   phone: "085555555555", message: "Anak saya 6 bulan dan ASI saya mulai berkurang sejak saya kembali bekerja. Ada saran produk kombinasi yang efektif?",                                      status: "in_progress" },
      { name: "Nita Kusuma",   email: "nita@example.com",   phone: "086666666666", message: "Apakah kapsul ASI booster bisa dikonsumsi bersamaan dengan vitamin dari dokter? Saya khawatir ada interaksi.",                                             status: "new" },
    ],
  });
  console.log("✅ Consultations seeded: 6");

  // ── SUMMARY ───────────────────────────────────────────────────────────────────
  console.log(`
🎉 Seeding complete! All tables populated.

📊 Summary:
   Users          : 7  (1 super_admin, 1 admin, 5 customers)
   Memberships    : 5  (all customers)
   Categories     : 8  (nested: Moms&Baby > Maternity > ASI Booster, etc.)
   Products       : 5  (AlmonMix, ZoyaMix, Teh, Kukis, Kapsul)
   Variants       : 14 (7 AlmonMix + 1 ZoyaMix + 2 Teh + 3 Kukis + 1 Kapsul)
   Product Images : 14
   Addresses      : 5  (1 per customer)
   Carts          : 3  (c1, c4, c5 with items)
   Cart Items     : 4
   Guest Carts    : 1  (session: guest-session-demo-001)
   Guest Cart Items: 2
   Orders         : 10 (pending×2, paid×1, processing×2, shipped×1, delivered×3, cancelled×1)
   Order Items    : 20
   Payments       : 10 (paid×7, pending×2, expired×1)
   Reviews        : 6  (★5×3, ★4×2, ★3×1 — all verified purchase)
   Helpful Votes  : 11
   FAQs           : 17
   Blog Posts     : 5
   Consultations  : 6

🔑 Login credentials:
   Super Admin : superadmin@mamabear.id  / Admin@12345
   Admin       : admin@mamabear.id       / Admin@12345
   Customer 1  : customer@mamabear.id    / Customer@12345
   Customer 2  : ani.wijaya@example.com  / Customer@12345
   Customer 3  : budi.santoso@example.com / Customer@12345
   Customer 4  : citra.dewi@example.com  / Customer@12345
   Customer 5  : diana.putri@example.com / Customer@12345
  `);
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
