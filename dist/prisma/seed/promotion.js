"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedPromotion = seedPromotion;
const enums_1 = require("../../generated/prisma/enums");
async function seedPromotion(prisma) {
    const promotions = [
        {
            title: "Mother's Day Special",
            slug: "mothers-day-special",
            subtitle: "Diskon spesial untuk ibu menyusui",
            description: "Nikmati bundle pilihan MamaBear dengan diskon dan hadiah eksklusif untuk momen spesial ibu.",
            badgeText: "Mother's Day • 1 - 31 Mei",
            startDate: new Date("2025-05-01T00:00:00Z"),
            endDate: new Date("2025-05-31T23:59:59Z"),
            status: enums_1.PromotionStatus.active,
            sections: [
                {
                    title: "Bundle Hemat Ibu",
                    subtitle: "Pilih paket lengkap nutrisi menyusui",
                    sortOrder: 0,
                    isActive: true,
                },
                {
                    title: "Pilihan Terbaik untuk Energi Harian",
                    subtitle: "Produk pilihan MamaBear dari nutrisinya yang seimbang.",
                    sortOrder: 1,
                    isActive: true,
                },
            ],
            benefits: [
                {
                    icon: "🎁",
                    title: "Hadiah Eksklusif",
                    description: "Pilih bundle dan dapatkan gift set khusus MamaBear.",
                    sortOrder: 0,
                },
                {
                    icon: "🚚",
                    title: "Gratis Ongkir",
                    description: "Gratis ongkir untuk semua paket promosi Mother's Day.",
                    sortOrder: 1,
                },
                {
                    icon: "💚",
                    title: "Bahan Aman untuk Ibu",
                    description: "Produk MamaBear diciptakan untuk dukung kesehatan ibu menyusui.",
                    sortOrder: 2,
                },
            ],
        },
        {
            title: "Summer Savings",
            slug: "summer-savings",
            subtitle: "Promo segar untuk ibu aktif",
            description: "Dapatkan diskon produk favorit MamaBear untuk asupan nutrisi harian sepanjang musim panas.",
            badgeText: "Summer Sale • 1 - 30 Juni",
            startDate: new Date("2025-06-01T00:00:00Z"),
            endDate: new Date("2025-06-30T23:59:59Z"),
            status: enums_1.PromotionStatus.draft,
            sections: [
                {
                    title: "Paket Hemat Musim Panas",
                    subtitle: "Jaga stamina ibu dengan produk nutrisi terbaik.",
                    sortOrder: 0,
                    isActive: true,
                },
            ],
            benefits: [
                {
                    icon: "☀️",
                    title: "Promo Musim Panas",
                    description: "Diskon khusus untuk produk tertentu selama bulan Juni.",
                    sortOrder: 0,
                },
            ],
        },
    ];
    for (const promo of promotions) {
        await prisma.promotionLanding.upsert({
            where: { slug: promo.slug },
            update: {
                title: promo.title,
                subtitle: promo.subtitle,
                description: promo.description,
                badgeText: promo.badgeText,
                startDate: promo.startDate,
                endDate: promo.endDate,
                status: promo.status,
                sections: {
                    deleteMany: {},
                    create: promo.sections,
                },
                benefits: {
                    deleteMany: {},
                    create: promo.benefits,
                },
            },
            create: {
                title: promo.title,
                slug: promo.slug,
                subtitle: promo.subtitle,
                description: promo.description,
                badgeText: promo.badgeText,
                startDate: promo.startDate,
                endDate: promo.endDate,
                status: promo.status,
                sections: {
                    create: promo.sections,
                },
                benefits: {
                    create: promo.benefits,
                },
            },
        });
    }
    console.log(`✅ Promotions seeded: ${promotions.length}`);
}
//# sourceMappingURL=promotion.js.map