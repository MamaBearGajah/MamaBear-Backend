import { PrismaClient } from '../generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

function slugify(text: string): string {
    return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

async function main() {
    console.log('🌱 Seeding products...')

    // ─── Categories ───────────────────────────────────────────────
    const catMoms = await prisma.category.upsert({
        where: { slug: 'moms-baby' },
        update: {},
        create: {
        name: 'Moms & Baby',
        slug: 'moms-baby',
        isActive: true,
        },
    })

    const catMaternity = await prisma.category.upsert({
        where: { slug: 'maternity-supplies' },
        update: {},
        create: {
        name: 'Maternity Supplies',
        slug: 'maternity-supplies',
        parentId: catMoms.id,
        isActive: true,
        },
    })

    const catAsiBooster = await prisma.category.upsert({
        where: { slug: 'asi-booster' },
        update: {},
        create: {
        name: 'ASI Booster',
        slug: 'asi-booster',
        parentId: catMaternity.id,
        isActive: true,
        },
    })

    const catAlmonMix = await prisma.category.upsert({
        where: { slug: 'almonmix' },
        update: {},
        create: {
        name: 'AlmonMix',
        slug: 'almonmix',
        parentId: catMaternity.id,
        isActive: true,
        },
    })

    const catZoyaMix = await prisma.category.upsert({
        where: { slug: 'zoyamix' },
        update: {},
        create: {
        name: 'ZoyaMix',
        slug: 'zoyamix',
        parentId: catMaternity.id,
        isActive: true,
        },
    })

    const catTeh = await prisma.category.upsert({
        where: { slug: 'teh-pelancar-asi' },
        update: {},
        create: {
        name: 'Teh Pelancar ASI',
        slug: 'teh-pelancar-asi',
        parentId: catAsiBooster.id,
        isActive: true,
        },
    })

    const catKookie = await prisma.category.upsert({
        where: { slug: 'kookie' },
        update: {},
        create: {
        name: 'Kookie',
        slug: 'kookie',
        parentId: catAsiBooster.id,
        isActive: true,
        },
    })

    const catKapsul = await prisma.category.upsert({
        where: { slug: 'kapsul-pelancar-asi' },
        update: {},
        create: {
        name: 'Kapsul Pelancar ASI',
        slug: 'kapsul-pelancar-asi',
        parentId: catAsiBooster.id,
        isActive: true,
        },
    })

    console.log('✅ Categories seeded')

    // ─── Products ─────────────────────────────────────────────────

    // 1. AlmonMix
    const almonMix = await prisma.product.upsert({
        where: { sku: 'AL.MMBR' },
        update: {},
        create: {
        name: 'MamaBear AlmonMix Isi 6 Sachet - Minuman Serbuk dengan Almond - Kaya Nutrisi Untuk Ibu Menyusui BPOM HALAL',
        slug: slugify('mamabear-almonmix-isi-6-sachet'),
        sku: 'AL.MMBR',
        description: `MamaBear AlmonMix Isi 6 Sachet Minuman Almond Kaya Nutrisi dengan Daun Katuk & Daun Kelor.

LACTOSE FREE | TINGGI VITAMIN A, B1, B2, B6, B9 (ASAM FOLAT), B12 | TINGGI VITAMIN C & ZAT BESI | TINGGI SERAT PANGAN | MAKRO & MIKRO NUTRISI LENGKAP

Hadir dalam 7 varian rasa: Cokelat, Choco Hazelnut, Coffee Latte, Strawberry, Vanilla, Matcha, Caramel

Cara penyajian: Seduh 1 sachet MamaBear AlmonMix dengan 200 ml air hangat. Dapat ditambahkan es batu jika ingin disajikan dingin.

Ingredients: Daun Katuk, Daun Kelor, Almond, Ekstrak Ragi

Keunggulan: Efektif meningkatkan produksi dan nutrisi ASI. Efektif membantu ASI cepat keluar. Meningkatkan mood untuk membantu mengurangi risiko baby blues.`,
        price: 80000,
        weight: 200,
        stock: 100,
        status: 'active',
        categoryId: catAlmonMix.id,
        variants: {
            create: [
            { name: 'Rasa', value: 'Cokelat', priceAdjustment: 0, stock: 100, sku: 'AL.MMBR-COK' },
            { name: 'Rasa', value: 'Choco Hazelnut', priceAdjustment: 0, stock: 100, sku: 'AL.MMBR-CHZ' },
            { name: 'Rasa', value: 'Matcha', priceAdjustment: 0, stock: 100, sku: 'AL.MMBR-MAT' },
            { name: 'Rasa', value: 'Vanilla', priceAdjustment: 0, stock: 100, sku: 'AL.MMBR-VAN' },
            { name: 'Rasa', value: 'Coffee Latte', priceAdjustment: 0, stock: 100, sku: 'AL.MMBR-COF' },
            { name: 'Rasa', value: 'Strawberry', priceAdjustment: 0, stock: 100, sku: 'AL.MMBR-STR' },
            { name: 'Rasa', value: 'Caramel', priceAdjustment: 0, stock: 100, sku: 'AL.MMBR-CAR' },
            ],
        },
        images: {
            create: [
            { imageUrl: '/images/products/AlmonMix - Cokelat.png', altText: 'AlmonMix Cokelat', isFeatured: true, sortOrder: 0 },
            { imageUrl: '/images/products/AlmonMix - Choco Hazelnut.png', altText: 'AlmonMix Choco Hazelnut', sortOrder: 1 },
            { imageUrl: '/images/products/AlmonMix - Matcha.png', altText: 'AlmonMix Matcha', sortOrder: 2 },
            { imageUrl: '/images/products/AlmonMix - Vanilla.png', altText: 'AlmonMix Vanilla', sortOrder: 3 },
            { imageUrl: '/images/products/AlmonMix - Coffee Latte.png', altText: 'AlmonMix Coffee Latte', sortOrder: 4 },
            { imageUrl: '/images/products/AlmonMix - Strawberry.png', altText: 'AlmonMix Strawberry', sortOrder: 5 },
            { imageUrl: '/images/products/AlmonMix - Caramel.png', altText: 'AlmonMix Caramel', sortOrder: 6 },
            ],
        },
        },
    })
    console.log('✅ AlmonMix seeded:', almonMix.id)

    // 2. ZoyaMix
    const zoyaMix = await prisma.product.upsert({
        where: { sku: 'ZM.MMBR' },
        update: {},
        create: {
        name: 'MamaBear ZoyaMix Rasa Cokelat Isi 10 Sachet - Sereal Kaya Nutrisi untuk Ibu Menyusui Halal BPOM',
        slug: slugify('mamabear-zoyamix-rasa-cokelat-isi-10-sachet'),
        sku: 'ZM.MMBR',
        description: `MamaBear ZoyaMix Rasa Cokelat Isi 10 Sachet Sereal Kaya Nutrisi untuk Ibu Menyusui.

MAKRO & MIKRO NUTRISI LENGKAP | SUMBER PROTEIN & ZAT BESI | TINGGI KALSIUM | VIT A, B6, B12, KOLIN, SENG, ZAT BESI

Cara penyajian: Seduh 1 sachet ZoyaMix dengan 150 ml air hangat. Dapat ditambahkan es batu jika ingin disajikan dingin.

Ingredients: Daun Katuk, Kedelai, Daun Kelor, Ekstrak Ragi, Rolled Oat

Keunggulan: Melancarkan ASI. Mengentalkan ASI. Tinggi Kalsium & Zinc. Kaya Kandungan Omega 3. Sumber Zat Besi.

*Catatan: mengandung produk turunan sapi.`,
        price: 80000,
        weight: 300,
        stock: 100,
        status: 'active',
        categoryId: catZoyaMix.id,
        variants: {
            create: [
            { name: 'Rasa', value: 'Cokelat', priceAdjustment: 0, stock: 100, sku: 'ZM.MMBR-COK' },
            ],
        },
        images: {
            create: [
            { imageUrl: '/images/products/Zoya Mix Cokelat 2.png', altText: 'ZoyaMix Cokelat', isFeatured: true, sortOrder: 0 },
            ],
        },
        },
    })
    console.log('✅ ZoyaMix seeded:', zoyaMix.id)

    // 3. Teh Pelancar ASI
    const tehPelancar = await prisma.product.upsert({
        where: { sku: 'TPA.MMBR' },
        update: {},
        create: {
        name: 'MamaBear Teh Pelancar ASI Isi 20 Sachet - ASI Booster Pelancar Peningkat Produksi ASI BPOM dan Halal',
        slug: slugify('mamabear-teh-pelancar-asi-isi-20-sachet'),
        sku: 'TPA.MMBR',
        description: `MamaBear Teh Pelancar ASI Isi 20 Sachet ASI Booster & Immunity Tea.

Individual sachet praktis & higienis. Kantong teh bebas klorin, biodegradable, dan food grade. Aroma harum menenangkan. Tanpa tambahan bahan pengawet. Rasa manis alami. Herbal kaya antioksidan.

Hadir dalam 2 varian rasa: Strawberry, Blueberry

Cara penyajian (1 box isi 20 sachet x @3gr): Seduh dengan 200-300 ml air mendidih/panas, biarkan selama min 10 menit. Dapat ditambahkan madu/gula/lemon, atau disajikan dingin. Konsumsi 3-4x sehari.

Ingredients: Fenugreek, Habbatussauda, Kunir, Fennel

Keunggulan: Memperlancar aliran ASI. Meningkatkan produksi & nutrisi ASI. Meningkatkan lemak ASI & BB bayi. Mempercepat pemulihan & meningkatkan daya tahan tubuh.

*Catatan: tidak untuk ibu hamil.`,
        price: 65000,
        weight: 100,
        stock: 100,
        status: 'active',
        categoryId: catTeh.id,
        variants: {
            create: [
            { name: 'Rasa', value: 'Strawberry', priceAdjustment: 0, stock: 100, sku: 'TPA.MMBR-STR' },
            { name: 'Rasa', value: 'Blueberry', priceAdjustment: 0, stock: 100, sku: 'TPA.MMBR-BLU' },
            ],
        },
        images: {
            create: [
            { imageUrl: '/images/products/Teh Strawberry 1.png', altText: 'Teh Pelancar ASI Strawberry', isFeatured: true, sortOrder: 0 },
            { imageUrl: '/images/products/Teh Strawberry 2.png', altText: 'Teh Pelancar ASI Strawberry 2', sortOrder: 1 },
            { imageUrl: '/images/products/Teh Strawberry Sachet.png', altText: 'Teh Pelancar ASI Strawberry Sachet', sortOrder: 2 },
            { imageUrl: '/images/products/Teh Blueberry 1.png', altText: 'Teh Pelancar ASI Blueberry', sortOrder: 3 },
            { imageUrl: '/images/products/Teh Blueberry 2.png', altText: 'Teh Pelancar ASI Blueberry 2', sortOrder: 4 },
            { imageUrl: '/images/products/Teh Blueberry Sachet.png', altText: 'Teh Pelancar ASI Blueberry Sachet', sortOrder: 5 },
            ],
        },
        },
    })
    console.log('✅ Teh Pelancar ASI seeded:', tehPelancar.id)

    // 4. Kukis Almond Oat
    const kukis = await prisma.product.upsert({
        where: { sku: 'KU.MMBR' },
        update: {},
        create: {
        name: 'MamaBear Kukis Almond Oat - Camilan Kaya Nutrisi untuk Ibu Menyusui Halal BPOM',
        slug: slugify('mamabear-kukis-almond-oat'),
        sku: 'KU.MMBR',
        description: `MamaBear Kukis Almon Oat - Memberi segala kebaikan untuk Mama selama masa menyusui.

✅ SUPERFOOD meningkatkan produksi & nutrisi ASI
✅ MAKRO & MIKRONUTRISI lengkap untuk Mama
✅ VIT B6, Omega3 & Zat Besi
✅ ANTIOXIDANT Selenium
✅ Tinggi Serat Pangan untuk kesehatan saluran pencernaan

BPOM MD: 236213003799 | HALAL MUI: 07200046370418

Hadir dalam 3 varian: Choco Nut, Choco Chip, Cookies & Cream

*Varian Cookies and Cream & Coklat Chip mengandung produk turunan susu sapi.
*Varian Choconut BEBAS produk turunan susu sapi & TANPA TELUR`,
        price: 80000,
        weight: 150,
        stock: 100,
        status: 'active',
        categoryId: catKookie.id,
        variants: {
            create: [
            { name: 'Varian', value: 'Choco Nut', priceAdjustment: 0, stock: 100, sku: 'KU.MMBR-CHN' },
            { name: 'Varian', value: 'Choco Chip', priceAdjustment: -26000, stock: 100, sku: 'KU.MMBR-CHC' },
            { name: 'Varian', value: 'Cookies & Cream', priceAdjustment: -26000, stock: 100, sku: 'KU.MMBR-CNC' },
            ],
        },
        images: {
            create: [
            { imageUrl: '/images/products/Kookite Bites - Choco Nut (Less Sugar).png', altText: 'Kukis Choco Nut', isFeatured: true, sortOrder: 0 },
            { imageUrl: '/images/products/kukis almond oat CC front.png', altText: 'Kukis Choco Chip', sortOrder: 1 },
            { imageUrl: '/images/products/kukis almond oat C&C front.png', altText: 'Kukis Cookies & Cream', sortOrder: 2 },
            ],
        },
        },
    })
    console.log('✅ Kukis Almond Oat seeded:', kukis.id)

    // 5. Kapsul ASI Booster
    const kapsul = await prisma.product.upsert({
        where: { sku: 'CP.AB30' },
        update: {},
        create: {
        name: 'MamaBear ASI Booster 30 Kapsul - Pelancar ASI Fenugreek Free Halal BPOM',
        slug: slugify('mamabear-asi-booster-30-kapsul'),
        sku: 'CP.AB30',
        description: `MAMABEAR KAPSUL ASI BOOSTER

Kapsul Pelancar ASI pertama dengan Triple Benefit dalam 1 kapsul:
- Meningkatkan produksi dan nutrisi ASI
- Membantu meredakan peradangan pada penyumbatan kelenjar ASI (Mastitis)
- Membantu meredakan nyeri pasca melahirkan

POM TR243057401 | HALAL MUI: ID00110000288610422

Kombinasi herbal & SUPERFOOD dari ekstrak daun katuk, ekstrak daun kelor, ekstrak jahe merah dan serbuk almond.
Fish Allergen Free | Fenugreek Free | 17 Nutrisi Makro & Mikro

Anjuran pemakaian: Konsumsi 2-3x sehari, 1 kapsul setelah makan.

*Catatan: Tidak untuk Ibu hamil.`,
        price: 100000,
        weight: 100,
        stock: 100,
        status: 'active',
        categoryId: catKapsul.id,
        variants: {
            create: [
            { name: 'Ukuran', value: '30 Kapsul', priceAdjustment: 0, stock: 100, sku: 'CP.AB30-30' },
            ],
        },
        images: {
            create: [
            { imageUrl: '/images/products/Kapsul ASI Booster 1 (1).png', altText: 'Kapsul ASI Booster', isFeatured: true, sortOrder: 0 },
            { imageUrl: '/images/products/Kapsul ASI Booster 2 (1).png', altText: 'Kapsul ASI Booster 2', sortOrder: 1 },
            { imageUrl: '/images/products/Kapsul ASI Booster Pill (1).png', altText: 'Kapsul ASI Booster Pill', sortOrder: 2 },
            ],
        },
        },
    })
    console.log('✅ Kapsul ASI Booster seeded:', kapsul.id)

    console.log('\n🎉 Seeding selesai!')
}

main()
    .catch((e) => {
        console.error('❌ Seeding gagal:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })