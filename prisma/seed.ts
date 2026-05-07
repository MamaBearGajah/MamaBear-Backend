import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, ProductStatus } from "generated/prisma/client";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
})
const prisma = new PrismaClient({ adapter })

function slugify(text: string): string {
    return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function main() {
    console.log("🌱 Seeding database...");

    // ───────────────────────────────────────────────
    // CATEGORIES
    // ───────────────────────────────────────────────
    const momsAndBaby = await prisma.category.upsert({
        where: { slug: "moms-and-baby" },
        update: {},
        create: {
        name: "Moms & Baby",
        slug: "moms-and-baby",
        isActive: true,
        },
    });

    const maternitySupplies = await prisma.category.upsert({
        where: { slug: "maternity-supplies" },
        update: {},
        create: {
        name: "Maternity Supplies",
        slug: "maternity-supplies",
        parentId: momsAndBaby.id,
        isActive: true,
        },
    });

    const asiBooster = await prisma.category.upsert({
        where: { slug: "asi-booster" },
        update: {},
        create: {
        name: "ASI Booster",
        slug: "asi-booster",
        parentId: maternitySupplies.id,
        isActive: true,
        },
    });

    const catAlmonMix = await prisma.category.upsert({
        where: { slug: "almonmix" },
        update: {},
        create: {
        name: "AlmonMix",
        slug: "almonmix",
        parentId: maternitySupplies.id,
        isActive: true,
        },
    });

    const catZoyaMix = await prisma.category.upsert({
        where: { slug: "zoyamix" },
        update: {},
        create: {
        name: "ZoyaMix",
        slug: "zoyamix",
        parentId: maternitySupplies.id,
        isActive: true,
        },
    });

    const catTehPelancar = await prisma.category.upsert({
        where: { slug: "teh-pelancar-asi" },
        update: {},
        create: {
        name: "Teh Pelancar ASI",
        slug: "teh-pelancar-asi",
        parentId: asiBooster.id,
        isActive: true,
        },
    });

    const catKookie = await prisma.category.upsert({
        where: { slug: "kookie" },
        update: {},
        create: {
        name: "Kookie",
        slug: "kookie",
        parentId: asiBooster.id,
        isActive: true,
        },
    });

    const catKapsul = await prisma.category.upsert({
        where: { slug: "kapsul-pelancar-asi" },
        update: {},
        create: {
        name: "Kapsul Pelancar ASI",
        slug: "kapsul-pelancar-asi",
        parentId: asiBooster.id,
        isActive: true,
        },
    });

    console.log("✅ Categories seeded");

    // ───────────────────────────────────────────────
    // PRODUCTS
    // ───────────────────────────────────────────────

    // 1. AlmonMix
    const almonMix = await prisma.product.upsert({
        where: { sku: "AL.MMBR" },
        update: {},
        create: {
        sku: "AL.MMBR",
        name: "MamaBear AlmonMix Isi 6 Sachet - Minuman Serbuk dengan Almond - Kaya Nutrisi Untuk Ibu Menyusui BPOM HALAL",
        slug: slugify("mamabear-almonmix-isi-6-sachet"),
        description: `MamaBear AlmonMix Isi 6 Sachet
Minuman Almond Kaya Nutrisi dengan Daun Katuk & Daun Kelor.

LACTOSE FREE
TINGGI VITAMIN A, B1, B2, B6, B9 (ASAM FOLAT), B12
TINGGI VITAMIN C & ZAT BESI
TINGGI SERAT PANGAN
MAKRO & MIKRO NUTRISI LENGKAP

Hadir dalam 7 varian rasa:
Cokelat, Choco Hazelnut, Coffee Latte, Strawberry, Vanilla, Matcha, Caramel

Cara penyajian:
Seduh 1 sachet MamaBear AlmonMix dengan 200 ml air hangat.
Dapat ditambahkan es batu jika ingin disajikan dingin.

Ingredients: Daun Katuk, Daun Kelor, Almond, Ekstrak Ragi

Keunggulan Mamabear AlmonMix:
- Efektif meningkatkan produksi dan nutrisi ASI.
- Efektif membantu ASI cepat keluar.
- Meningkatkan mood untuk membantu mengurangi risiko baby blues.`,
        price: 80000,
        discountPrice: 40000,
        weight: 200,
        stock: 100,
        mainImage: "AlmonMix.zip",
        status: ProductStatus.active,
        categoryId: catAlmonMix.id,
        variants: {
            create: [
            { name: "Rasa", value: "Cokelat",         imageUrl: "AlmonMix - Cokelat.png",        stock: 100, isActive: true },
            { name: "Rasa", value: "Choco Hazelnut",  imageUrl: "AlmonMix - Choco Hazelnut.png", stock: 100, isActive: true },
            { name: "Rasa", value: "Matcha",           imageUrl: "AlmonMix - Matcha.png",          stock: 100, isActive: true },
            { name: "Rasa", value: "Vanilla",          imageUrl: "AlmonMix - Vanilla.png",         stock: 100, isActive: true },
            { name: "Rasa", value: "Coffee Latte",     imageUrl: "AlmonMix - Coffee Latte.png",    stock: 100, isActive: true },
            { name: "Rasa", value: "Strawberry",       imageUrl: "AlmonMix - Strawberry.png",      stock: 100, isActive: true },
            { name: "Rasa", value: "Caramel",          imageUrl: "AlmonMix - Caramel.png",         stock: 100, isActive: true },
            ],
        },
        },
    });

    // 2. ZoyaMix
    const zoyaMix = await prisma.product.upsert({
        where: { sku: "ZM.MMBR" },
        update: {},
        create: {
        sku: "ZM.MMBR",
        name: "MamaBear ZoyaMix Rasa Cokelat Isi 10 Sachet - Sereal Kaya Nutrisi untuk Ibu Menyusui Halal BPOM",
        slug: slugify("mamabear-zoyamix-rasa-cokelat-isi-10-sachet"),
        description: `MamaBear ZoyaMix Rasa Cokelat Isi 10 Sachet
Sereal Kaya Nutrisi untuk Ibu Menyusui.

MAKRO & MIKRO NUTRISI LENGKAP
SUMBER PROTEIN & ZAT BESI
TINGGI KALSIUM
VIT A, B6, B12, KOLIN, SENG, ZAT BESI

Cara penyajian:
Seduh 1 sachet ZoyaMix dengan 150 ml air hangat.
Dapat ditambahkan es batu jika ingin disajikan dingin.

Ingredients: Daun Katuk, Kedelai, Daun Kelor, Ekstrak Ragi, Rolled Oat

Keunggulan Mamabear ZoyaMix:
- Melancarkan ASI.
- Mengentalkan ASI.
- Tinggi Kalsium & Zinc.
- Kaya Kandungan Omega 3.
- Sumber Zat Besi.

*Catatan: mengandung produk turunan sapi.`,
        price: 80000,
        discountPrice: 38000,
        weight: 250,
        stock: 100,
        mainImage: "ZoyaMix.zip",
        status: ProductStatus.active,
        categoryId: catZoyaMix.id,
        variants: {
            create: [
            { name: "Rasa", value: "Cokelat", imageUrl: "Zoya Mix Cokelat 2.png", stock: 100, isActive: true },
            ],
        },
        },
    });

    // 3. Teh Pelancar ASI
    const tehPelancar = await prisma.product.upsert({
        where: { sku: "TPA.MMBR" },
        update: {},
        create: {
        sku: "TPA.MMBR",
        name: "MamaBear Teh Pelancar ASI Isi 20 Sachet - ASI Booster Pelancar Peningkat Produksi ASI BPOM dan Halal",
        slug: slugify("mamabear-teh-pelancar-asi-isi-20-sachet"),
        description: `MamaBear Teh Pelancar ASI Isi 20 Sachet
ASI Booster & Immunity Tea.

- Individual sachet praktis & higienis.
- Kantong teh bebas klorin, biodegradable, dan food grade.
- Aroma harum menenangkan, relaksASI ala busui.
- Tanpa tambahan bahan pengawet.
- Rasa manis alami.
- Herbal kaya antioksidan.

Cara penyajian (1 box isi 20 sachet x @3gr (60gr)):
Seduh dengan 200-300 ml air mendidih/panas, biarkan selama min 10 menit/kuning keemasan.
Dapat ditambahkan madu/gula/lemon, atau bisa juga disajikan dingin.
Konsumsi MamaBear Teh Pelancar ASI 3-4x sehari.

Ingredients: Fenugreek, Habbatussauda, Kunir, Fennel

Keunggulan Mamabear Teh Pelancar ASI:
- Memperlancar aliran ASI.
- Meningkatkan produksi & nutrisi ASI.
- Meningkatkan lemak ASI & BB bayi (melalui ASI).
- Mempercepat pemulihan & meningkatkan daya tahan tubuh (Habbatussauda).

*Catatan: tidak untuk ibu hamil.`,
        price: 65000,
        discountPrice: 40000,
        weight: 100,
        stock: 100,
        mainImage: "Teh.zip",
        status: ProductStatus.active,
        categoryId: catTehPelancar.id,
        variants: {
            create: [
            {
                name: "Rasa",
                value: "Strawberry",
                imageUrl: "Teh Strawberry 1.png",
                stock: 100,
                isActive: true,
            },
            {
                name: "Rasa",
                value: "Blueberry",
                imageUrl: "Teh Blueberry 1.png",
                stock: 100,
                isActive: true,
            },
            ],
        },
        },
    });

    // 4. Kukis Almond Oat
    const kukis = await prisma.product.upsert({
        where: { sku: "KU.MMBR" },
        update: {},
        create: {
        sku: "KU.MMBR",
        name: "MamaBear Kukis Almond Oat - Camilan Kaya Nutrisi untuk Ibu Menyusui Halal BPOM",
        slug: slugify("mamabear-kukis-almond-oat"),
        description: `MamaBear Kukis Almon Oat
Memberi segala kebaikan untuk Mama selama masa menyusui dengan:

✅ SUPERFOOD meningkatkan produksi & nutrisi ASI
✅ MAKRO & MIKRONUTRISI lengkap untuk Mama
✅ VIT B6, Omega3 & Zat Besi
✅ ANTIOXIDANT Selenium
✅ Tinggi Serat Pangan untuk kesehatan saluran pencernaan

- BPOM MD : 236213003799
- HALAL MUI : 07200046370418

- Rasa ENAK
- Tanpa tambahan bahan pengawet
- Ukuran sekali lahap bebas remahan
- Packaging ziplock, memudahkan penyimpanan
- Aman dikonsumsi ibu hamil & menyusui, anak-anak, dewasa, & orang tua.

*Varian Cookies and Cream & Coklat Chip mengandung produk turunan susu sapi.
*Varian Choconut BEBAS produk turunan susu sapi & TANPA TELUR`,
        price: 80000,
        discountPrice: 40000,
        weight: 150,
        stock: 100,
        mainImage: "PDP - Almond Oat Cookies & Cream 04.zip",
        status: ProductStatus.active,
        categoryId: catKookie.id,
        variants: {
            create: [
            {
                name: "Rasa",
                value: "Choco Nut",
                imageUrl: "Kookite Bites - Choco Nut (Less Sugar).png",
                priceAdjustment: 0,
                stock: 100,
                isActive: true,
            },
            {
                name: "Rasa",
                value: "Choco Chip",
                imageUrl: "kukis almond oat CC front.png",
                priceAdjustment: 14000, // 54000 - 40000
                stock: 100,
                isActive: true,
            },
            {
                name: "Rasa",
                value: "Cookies & Cream",
                imageUrl: "kukis almond oat C&C front.png",
                priceAdjustment: 14000, // 54000 - 40000
                stock: 100,
                isActive: true,
            },
            ],
        },
        },
    });

    // 5. Kapsul ASI Booster
    const kapsul = await prisma.product.upsert({
        where: { sku: "CP.AB30" },
        update: {},
        create: {
        sku: "CP.AB30",
        name: "MamaBear ASI Booster 30 Kapsul - Pelancar ASI Fenugreek Free Halal BPOM",
        slug: slugify("mamabear-asi-booster-30-kapsul"),
        description: `MAMABEAR KAPSUL ASI BOOSTER

Kapsul Pelancar ASI pertama dengan Triple Benefit dalam 1 kapsul:
- Meningkatkan produksi dan nutrisi ASI
- Membantu meredakan peradangan pada penyumbatan kelenjar ASI (Mastitis)
- Membantu meredakan nyeri pasca melahirkan

- POM TR243057401
- HALAL MUI : ID00110000288610422

- Kombinasi herbal & SUPERFOOD dari ekstrak daun katuk, ekstrak daun kelor, ekstrak jahe merah dan serbuk almond
- Fish Allergen Free
- Fenugreek Free
- 17 Nutrisi Makro & Mikro
- Ekstrak Jahe untuk antioksidan yang membantu menjaga daya tahan tubuh Ibu selama menyusui
- Mudah dikonsumsi tidak memerlukan penyeduhan

ANJURAN PEMAKAIAN:
- Konsumsi MamaBear Kapsul Pelancar ASI 2-3x sehari.
- 1 kapsul setelah makan

Catatan: Tidak untuk Ibu hamil`,
        price: 100000,
        discountPrice: 61900,
        weight: 100,
        stock: 100,
        mainImage: "Kapsul.zip",
        status: ProductStatus.active,
        categoryId: catKapsul.id,
        variants: {
            create: [
            {
                name: "Ukuran",
                value: "30 kapsul",
                imageUrl: "Kapsul ASI Booster 1 (1).png",
                stock: 100,
                isActive: true,
            },
            ],
        },
        },
    });

    console.log("✅ Products seeded:");
    console.log(`   - ${almonMix.name.substring(0, 40)}...`);
    console.log(`   - ${zoyaMix.name.substring(0, 40)}...`);
    console.log(`   - ${tehPelancar.name.substring(0, 40)}...`);
    console.log(`   - ${kukis.name.substring(0, 40)}...`);
    console.log(`   - ${kapsul.name.substring(0, 40)}...`);

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