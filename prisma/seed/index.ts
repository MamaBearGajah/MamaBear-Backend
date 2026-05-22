import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "generated/prisma/client";
import { seedUsers } from "./users";
import { seedCategories } from "./categories";
import { seedProducts } from "./products";
import { seedOrders } from "./orders";
import { seedFaq } from "./faq";
import { seedBlog } from "./blog";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
export const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  const { customers, addresses } = await seedUsers(prisma);
  await seedCategories(prisma);
  const products = await seedProducts(prisma);
  await seedOrders(prisma, { customers, addresses, products });
  await seedFaq(prisma);
  await seedBlog(prisma);

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