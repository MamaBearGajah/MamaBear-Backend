import { PrismaClient, ProductStatus } from "generated/prisma/client";

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-");
}

export async function seedProducts(prisma: PrismaClient) {
  // Ambil kategori dari DB (sudah di-seed sebelumnya)
  const cat = await prisma.category.findMany({
    where: { slug: { in: ["almonmix", "zoyamix", "teh-pelancar-asi", "kookie", "kapsul-pelancar-asi"] } },
  });
  const catMap = Object.fromEntries(cat.map((c) => [c.slug, c.id]));

  const almonMix = await prisma.product.upsert({
    where: { sku: "AL.MMBR" },
    update: {},
    create: {
      sku: "AL.MMBR",
      name: "MamaBear AlmonMix Isi 6 Sachet - Minuman Serbuk dengan Almond - Kaya Nutrisi Untuk Ibu Menyusui BPOM HALAL",
      slug: slugify("mamabear-almonmix-isi-6-sachet"),
      description: `MamaBear AlmonMix Isi 6 Sachet\nMinuman Almond Kaya Nutrisi dengan Daun Katuk & Daun Kelor.\n\nLACTOSE FREE\nTINGGI VITAMIN A, B1, B2, B6, B9 (ASAM FOLAT), B12\nTINGGI VITAMIN C & ZAT BESI\nTINGGI SERAT PANGAN\nMAKRO & MIKRO NUTRISI LENGKAP`,
      basePrice: 80000, discountPrice: 40000, weight: 200, stock: 250, soldCount: 312,
      status: ProductStatus.active, categoryId: catMap["almonmix"],
      variants: {
        create: [
          { name: "Rasa", value: "Cokelat",        basePrice: 40000, priceAdjustment: 0, stock: 50, imageUrl: "AlmonMix - Cokelat.png",        isActive: true },
          { name: "Rasa", value: "Choco Hazelnut", basePrice: 40000, priceAdjustment: 0, stock: 50, imageUrl: "AlmonMix - Choco Hazelnut.png", isActive: true },
          { name: "Rasa", value: "Matcha",          basePrice: 40000, priceAdjustment: 0, stock: 30, imageUrl: "AlmonMix - Matcha.png",          isActive: true },
          { name: "Rasa", value: "Vanilla",         basePrice: 40000, priceAdjustment: 0, stock: 30, imageUrl: "AlmonMix - Vanilla.png",         isActive: true },
          { name: "Rasa", value: "Coffee Latte",    basePrice: 40000, priceAdjustment: 0, stock: 40, imageUrl: "AlmonMix - Coffee Latte.png",    isActive: true },
          { name: "Rasa", value: "Strawberry",      basePrice: 40000, priceAdjustment: 0, stock: 30, imageUrl: "AlmonMix - Strawberry.png",      isActive: true },
          { name: "Rasa", value: "Caramel",         basePrice: 40000, priceAdjustment: 0, stock: 20, imageUrl: "AlmonMix - Caramel.png",         isActive: true },
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
      description: `MamaBear ZoyaMix Rasa Cokelat Isi 10 Sachet\nSereal Kaya Nutrisi untuk Ibu Menyusui.`,
      basePrice: 80000, discountPrice: 38000, weight: 250, stock: 150, soldCount: 198,
      status: ProductStatus.active, categoryId: catMap["zoyamix"],
      variants: {
        create: [
          { name: "Rasa", value: "Cokelat", basePrice: 38000, priceAdjustment: 0, stock: 150, imageUrl: "Zoya Mix Cokelat 2.png", isActive: true },
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
      description: `MamaBear Teh Pelancar ASI Isi 20 Sachet\nASI Booster & Immunity Tea.`,
      basePrice: 65000, discountPrice: 40000, weight: 100, stock: 200, soldCount: 274,
      status: ProductStatus.active, categoryId: catMap["teh-pelancar-asi"],
      variants: {
        create: [
          { name: "Rasa", value: "Strawberry", basePrice: 40000, priceAdjustment: 0, stock: 100, imageUrl: "Teh Strawberry 1.png", isActive: true },
          { name: "Rasa", value: "Blueberry",  basePrice: 40000, priceAdjustment: 0, stock: 100, imageUrl: "Teh Blueberry 1.png",  isActive: true },
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
      description: `MamaBear Kukis Almon Oat\nSUPERFOOD meningkatkan produksi & nutrisi ASI.`,
      basePrice: 80000, discountPrice: 40000, weight: 150, stock: 120, soldCount: 156,
      status: ProductStatus.active, categoryId: catMap["kookie"],
      variants: {
        create: [
          { name: "Rasa", value: "Choco Nut",       basePrice: 40000, priceAdjustment: 0,     stock: 50, imageUrl: "Kookite Bites - Choco Nut (Less Sugar).png", isActive: true },
          { name: "Rasa", value: "Choco Chip",      basePrice: 54000, priceAdjustment: 14000, stock: 40, imageUrl: "kukis almond oat CC front.png",               isActive: true },
          { name: "Rasa", value: "Cookies & Cream", basePrice: 54000, priceAdjustment: 14000, stock: 30, imageUrl: "kukis almond oat C&C front.png",              isActive: true },
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
      description: `MAMABEAR KAPSUL ASI BOOSTER\nTriple Benefit dalam 1 kapsul.`,
      basePrice: 100000, discountPrice: 61900, weight: 100, stock: 100, soldCount: 89,
      status: ProductStatus.active, categoryId: catMap["kapsul-pelancar-asi"],
      variants: {
        create: [
          { name: "Ukuran", value: "30 kapsul", basePrice: 61900, priceAdjustment: 0, stock: 100, imageUrl: "Kapsul ASI Booster 1 (1).png", isActive: true },
        ],
      },
      images: {
        create: [
          { imageUrl: "Kapsul ASI Booster 1 (1).png", altText: "Kapsul ASI Booster 30 kapsul", sortOrder: 0, isFeatured: true },
        ],
      },
    },
  });

  console.log("✅ Products seeded");
  return { almonMix, zoyaMix, tehPelancar, kukis, kapsul };
}