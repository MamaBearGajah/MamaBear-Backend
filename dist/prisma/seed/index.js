"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("../../generated/prisma/client");
const users_1 = require("./users");
const categories_1 = require("./categories");
const products_1 = require("./products");
const orders_1 = require("./orders");
const membership_1 = require("./membership");
const faq_1 = require("./faq");
const blog_1 = require("./blog");
const banner_1 = require("./banner");
const promotion_1 = require("./promotion");
const adapter = new adapter_pg_1.PrismaPg({ connectionString: process.env.DATABASE_URL });
exports.prisma = new client_1.PrismaClient({ adapter });
async function main() {
    console.log("🌱 Seeding database...\n");
    const { customers, addresses } = await (0, users_1.seedUsers)(exports.prisma);
    await (0, categories_1.seedCategories)(exports.prisma);
    const products = await (0, products_1.seedProducts)(exports.prisma);
    await (0, orders_1.seedOrders)(exports.prisma, { customers, addresses, products });
    await (0, membership_1.seedMembership)(exports.prisma, customers);
    await (0, faq_1.seedFaq)(exports.prisma);
    await (0, blog_1.seedBlog)(exports.prisma);
    await (0, banner_1.seedBanner)(exports.prisma);
    await (0, promotion_1.seedPromotion)(exports.prisma);
    console.log("\n🎉 Seeding complete!");
}
main()
    .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
})
    .finally(async () => {
    await exports.prisma.$disconnect();
});
//# sourceMappingURL=index.js.map