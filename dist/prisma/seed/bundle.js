"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedBundle = seedBundle;
const CDN = "https://res.cloudinary.com/djyppabfc/image/upload/q_auto/f_auto";
async function seedBundle(prisma) {
    const products = await prisma.product.findMany({
        where: { sku: { in: ["AL.MMBR", "ZM.MMBR", "TPA.MMBR", "KU.MMBR", "CP.AB30"] } },
        select: { id: true, sku: true, name: true },
    });
    const p = Object.fromEntries(products.map((prod) => [prod.sku, prod.id]));
    const missing = ["AL.MMBR", "ZM.MMBR", "TPA.MMBR", "KU.MMBR", "CP.AB30"].filter((sku) => !p[sku]);
    if (missing.length > 0) {
        console.warn(`⚠️  Bundle seed: produk tidak ditemukan → ${missing.join(", ")}. Jalankan seedProducts() dulu.`);
        return;
    }
    await prisma.bundleItem.deleteMany({});
    await prisma.bundle.deleteMany({});
    await prisma.bundle.create({
        data: {
            name: "Starter Pack Ibu Menyusui",
            slug: "starter-pack-ibu-menyusui",
            description: "Paket perdana untuk busui baru! Kombinasi Teh Pelancar ASI & AlmonMix yang saling melengkapi untuk melancarkan dan meningkatkan nutrisi ASI sejak awal.",
            imageUrl: `${CDN}/v1779906475/PDP_-_Lactation_Tea_01_xwadr5.jpg`,
            publicId: "PDP_-_Lactation_Tea_01_xwadr5",
            bundlePrice: 130000,
            discountPrice: 99000,
            isActive: true,
            stock: 50,
            sortOrder: 1,
            startDate: new Date("2026-01-01T00:00:00Z"),
            endDate: new Date("2026-12-31T23:59:59Z"),
            items: {
                create: [
                    { productId: p["TPA.MMBR"], quantity: 1 },
                    { productId: p["AL.MMBR"], quantity: 1 },
                ],
            },
        },
    });
    await prisma.bundle.create({
        data: {
            name: "Paket Lengkap ASI Booster",
            slug: "paket-lengkap-asi-booster",
            description: "Trio terbaik untuk produksi ASI maksimal! AlmonMix & ZoyaMix untuk nutrisi harian, ditambah Kapsul ASI Booster untuk hasil yang lebih cepat dan konsisten.",
            imageUrl: `${CDN}/v1779906461/Copy_of_PDP_-_AlmonMix_01_yam9or.jpg`,
            publicId: "Copy_of_PDP_-_AlmonMix_01_yam9or",
            bundlePrice: 220000,
            discountPrice: 179000,
            isActive: true,
            stock: 30,
            sortOrder: 2,
            startDate: new Date("2026-01-01T00:00:00Z"),
            endDate: new Date("2026-12-31T23:59:59Z"),
            items: {
                create: [
                    { productId: p["AL.MMBR"], quantity: 1 },
                    { productId: p["ZM.MMBR"], quantity: 1 },
                    { productId: p["CP.AB30"], quantity: 1 },
                ],
            },
        },
    });
    await prisma.bundle.create({
        data: {
            name: "Hampers Spesial Mamabear",
            slug: "hampers-spesial-mamabear",
            description: "Paket hampers paling lengkap dari Mamabear! Semua produk unggulan dalam satu kotak — sempurna sebagai hadiah untuk ibu menyusui atau kado spesial.",
            imageUrl: `${CDN}/v1779906465/MP_-_Cover_Kapsul_Bahasa_Inggris-01_ymbcky.jpg`,
            publicId: "MP_-_Cover_Kapsul_Bahasa_Inggris-01_ymbcky",
            bundlePrice: 320000,
            discountPrice: 249000,
            isActive: true,
            stock: 20,
            sortOrder: 3,
            startDate: new Date("2026-01-01T00:00:00Z"),
            endDate: new Date("2026-12-31T23:59:59Z"),
            items: {
                create: [
                    { productId: p["TPA.MMBR"], quantity: 1 },
                    { productId: p["AL.MMBR"], quantity: 1 },
                    { productId: p["ZM.MMBR"], quantity: 1 },
                    { productId: p["KU.MMBR"], quantity: 1 },
                    { productId: p["CP.AB30"], quantity: 1 },
                ],
            },
        },
    });
    console.log("✅ Bundles seeded: 3 bundle (Starter Pack, Paket Lengkap, Hampers Spesial)");
}
//# sourceMappingURL=bundle.js.map