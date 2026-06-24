import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "generated/prisma/client";
import { seedUsers }      from "./users";
import { seedCategories } from "./categories";
import { seedProducts }   from "./products";
import { seedOrders }     from "./orders";
import { seedMembership } from "./membership";
import { seedFaq }        from "./faq";
import { seedBlog }       from "./blog";
import { seedBanner }     from "./banner";
import { seedPromotion }  from "./promotion";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
export const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...\n");

  // 1. Users & addresses — harus pertama karena semua entitas lain FK ke User
  const { customers, addresses } = await seedUsers(prisma);

  // 2. Kategori — harus sebelum products
  await seedCategories(prisma);

  // 3. Products — harus sebelum orders (FK orderItem → product)
  const products = await seedProducts(prisma);

  // 4. Orders + reviews + helpful votes
  //    seedOrders melakukan cleanup sendiri (deleteMany) sebelum insert,
  //    sehingga aman dijalankan berulang kali.
  await seedOrders(prisma, { customers, addresses, products });

  // 5. Membership — HARUS setelah orders agar bisa baca totalSpent dari order nyata
  await seedMembership(prisma, customers);

  // 6. Konten statis — tidak bergantung urutan satu sama lain
  await seedFaq(prisma);
  await seedBlog(prisma);
  await seedBanner(prisma);
  await seedPromotion(prisma);

  console.log("\n🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });