"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedBanner = seedBanner;
const CDN = "https://res.cloudinary.com/djyppabfc/image/upload/q_auto/f_auto";
async function seedBanner(prisma) {
    const banners = [
        {
            id: "banner-hero-asi-booster",
            imageUrl: `${CDN}/v1779906475/PDP_-_Lactation_Tea_01_xwadr5.jpg`,
            altText: "Pelancar ASI MamaBear",
            label: "BEST SELLER",
            title: "Pelancar ASI Alami",
            extraText: "Diskon 20% untuk produk pelancar ASI",
            desc: "Lengkapi nutrisi menyusui dengan produk MamaBear yang dirancang khusus untuk ibu menyusui.",
            path: "/products?category=asi-booster",
            isActive: true,
            sortOrder: 0,
            startDate: new Date("2025-05-01T00:00:00Z"),
            endDate: new Date("2025-05-31T23:59:59Z"),
        },
        {
            id: "banner-hero-kookie",
            imageUrl: `${CDN}/v1779906469/Cover_Product_MamaBear_Cookie_Bites_Kukis_Almond_Oat_zlp0ht.png`,
            altText: "Camilan sehat untuk ibu menyusui",
            label: "NEW",
            title: "Kookie Sehat & Bergizi",
            extraText: "Camilan sehat yang cocok untuk Ibu menyusui",
            desc: "Kookie MamaBear hadir dengan bahan premium untuk dukung energi dan kenyamanan menyusui.",
            path: "/products?category=kookie",
            isActive: true,
            sortOrder: 1,
            startDate: new Date("2025-05-01T00:00:00Z"),
            endDate: new Date("2025-08-31T23:59:59Z"),
        },
        {
            id: "banner-hero-zoyamix",
            imageUrl: `${CDN}/v1779906478/PDP_-_ZoyaMix_01_mhnoas.jpg`,
            altText: "Sereal nutrisi untuk ibu menyusui",
            label: "HEALTHY",
            title: "ZoyaMix Nutri Bowl",
            extraText: "Sarapan penuh gizi untuk dukung produksi ASI",
            desc: "Diformulasikan untuk menjaga asupan nutrisi dan energi ibu menyusui setiap hari.",
            path: "/products?category=zoyamix",
            isActive: true,
            sortOrder: 2,
            startDate: new Date("2025-05-01T00:00:00Z"),
            endDate: new Date("2025-10-31T23:59:59Z"),
        },
    ];
    for (const banner of banners) {
        await prisma.banner.upsert({
            where: { id: banner.id },
            update: {
                imageUrl: banner.imageUrl,
                altText: banner.altText,
                label: banner.label,
                title: banner.title,
                extraText: banner.extraText,
                desc: banner.desc,
                path: banner.path,
                isActive: banner.isActive,
                sortOrder: banner.sortOrder,
                startDate: banner.startDate,
                endDate: banner.endDate,
            },
            create: banner,
        });
    }
    console.log(`✅ Banners seeded: ${banners.length}`);
}
//# sourceMappingURL=banner.js.map