import { PrismaClient } from "generated/prisma/client";

const CDN = "https://res.cloudinary.com/djyppabfc/image/upload/q_auto/f_auto";

export async function seedCategories(prisma: PrismaClient) {

  // ─── Level 1 ──────────────────────────────────────────────────────────────

  const momsAndBaby = await prisma.category.upsert({
    where: { slug: "moms-and-baby" },
    update: {},
    create: {
      name: "Moms & Baby",
      slug: "moms-and-baby",
      description: "Produk kebutuhan ibu dan bayi",
      sortOrder: 0,
      isActive: true,
    },
  });

  // ─── Level 2 ──────────────────────────────────────────────────────────────

  const maternitySupplies = await prisma.category.upsert({
    where: { slug: "maternity-supplies" },
    update: {},
    create: {
      name: "Maternity Supplies",
      slug: "maternity-supplies",
      description: "Perlengkapan nutrisi untuk ibu menyusui",
      parentId: momsAndBaby.id,
      sortOrder: 0,
      isActive: true,
    },
  });

  // ─── Level 3 — langsung di bawah Maternity Supplies ──────────────────────

  const catAlmonMix = await prisma.category.upsert({
    where: { slug: "almonmix" },
    update: {},
    create: {
      name: "AlmonMix",
      slug: "almonmix",
      description: "Minuman serbuk almond kaya nutrisi untuk ibu menyusui",
      imageUrl: `${CDN}/v1779906461/Copy_of_PDP_-_AlmonMix_01_yam9or.jpg`,
      parentId: maternitySupplies.id,
      sortOrder: 0,
      isActive: true,
    },
  });

  const catZoyaMix = await prisma.category.upsert({
    where: { slug: "zoyamix" },
    update: {},
    create: {
      name: "ZoyaMix",
      slug: "zoyamix",
      description: "Sereal kaya nutrisi untuk ibu menyusui",
      imageUrl: `${CDN}/v1779906478/PDP_-_ZoyaMix_01_mhnoas.jpg`,
      parentId: maternitySupplies.id,
      sortOrder: 1,
      isActive: true,
    },
  });

  const asiBooster = await prisma.category.upsert({
    where: { slug: "asi-booster" },
    update: {},
    create: {
      name: "ASI Booster",
      slug: "asi-booster",
      description: "Produk pelancar dan peningkat produksi ASI",
      parentId: maternitySupplies.id,
      sortOrder: 2,
      isActive: true,
    },
  });

  // ─── Level 4 — di bawah ASI Booster ──────────────────────────────────────

  const catTehPelancar = await prisma.category.upsert({
    where: { slug: "teh-pelancar-asi" },
    update: {},
    create: {
      name: "Teh Pelancar ASI",
      slug: "teh-pelancar-asi",
      description: "Teh herbal pelancar dan peningkat produksi ASI",
      imageUrl: `${CDN}/v1779906475/PDP_-_Lactation_Tea_01_xwadr5.jpg`,
      parentId: asiBooster.id,
      sortOrder: 0,
      isActive: true,
    },
  });

  const catKookie = await prisma.category.upsert({
    where: { slug: "kookie" },
    update: {},
    create: {
      name: "Kookie",
      slug: "kookie",
      description: "Camilan bergizi untuk ibu menyusui",
      imageUrl: `${CDN}/v1779906469/Cover_Product_MamaBear_Cookie_Bites_Kukis_Almond_Oat_zlp0ht.png`,
      parentId: asiBooster.id,
      sortOrder: 1,
      isActive: true,
    },
  });

  const catKapsul = await prisma.category.upsert({
    where: { slug: "kapsul-pelancar-asi" },
    update: {},
    create: {
      name: "Kapsul Pelancar ASI",
      slug: "kapsul-pelancar-asi",
      description: "Suplemen kapsul pelancar ASI fenugreek free",
      imageUrl: `${CDN}/v1779906465/MP_-_Cover_Kapsul_Bahasa_Inggris-01_ymbcky.jpg`,
      parentId: asiBooster.id,
      sortOrder: 2,
      isActive: true,
    },
  });

  console.log("✅ Categories seeded");
  return {
    momsAndBaby,
    maternitySupplies,
    asiBooster,
    catAlmonMix,
    catZoyaMix,
    catTehPelancar,
    catKookie,
    catKapsul,
  };
}