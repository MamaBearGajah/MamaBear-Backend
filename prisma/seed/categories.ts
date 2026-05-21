import { PrismaClient } from "generated/prisma/client";

export async function seedCategories(prisma: PrismaClient) {
  const momsAndBaby = await prisma.category.upsert({
    where: { slug: "moms-and-baby" },
    update: {},
    create: { name: "Moms & Baby", slug: "moms-and-baby", isActive: true },
  });

  const maternitySupplies = await prisma.category.upsert({
    where: { slug: "maternity-supplies" },
    update: {},
    create: { name: "Maternity Supplies", slug: "maternity-supplies", parentId: momsAndBaby.id, isActive: true },
  });

  const asiBooster = await prisma.category.upsert({
    where: { slug: "asi-booster" },
    update: {},
    create: { name: "ASI Booster", slug: "asi-booster", parentId: maternitySupplies.id, isActive: true },
  });

  const catAlmonMix = await prisma.category.upsert({
    where: { slug: "almonmix" },
    update: {},
    create: { name: "AlmonMix", slug: "almonmix", parentId: maternitySupplies.id, isActive: true },
  });

  const catZoyaMix = await prisma.category.upsert({
    where: { slug: "zoyamix" },
    update: {},
    create: { name: "ZoyaMix", slug: "zoyamix", parentId: maternitySupplies.id, isActive: true },
  });

  const catTehPelancar = await prisma.category.upsert({
    where: { slug: "teh-pelancar-asi" },
    update: {},
    create: { name: "Teh Pelancar ASI", slug: "teh-pelancar-asi", parentId: asiBooster.id, isActive: true },
  });

  const catKookie = await prisma.category.upsert({
    where: { slug: "kookie" },
    update: {},
    create: { name: "Kookie", slug: "kookie", parentId: asiBooster.id, isActive: true },
  });

  const catKapsul = await prisma.category.upsert({
    where: { slug: "kapsul-pelancar-asi" },
    update: {},
    create: { name: "Kapsul Pelancar ASI", slug: "kapsul-pelancar-asi", parentId: asiBooster.id, isActive: true },
  });

  console.log("✅ Categories seeded");
  return { momsAndBaby, maternitySupplies, asiBooster, catAlmonMix, catZoyaMix, catTehPelancar, catKookie, catKapsul };
}