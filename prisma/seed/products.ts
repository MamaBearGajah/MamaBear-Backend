import { PrismaClient, ProductStatus, ImageType } from "generated/prisma/client";

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-");
}

// ─────────────────────────────────────────────────────────────────────────────
// Format URL Cloudinary:
// https://res.cloudinary.com/djyppabfc/image/upload/q_auto/f_auto/v{version}/{public_id}.png
// Ganti v_____/{nama} dengan URL asli setelah upload ke Cloudinary
// ─────────────────────────────────────────────────────────────────────────────

const CDN = "https://res.cloudinary.com/djyppabfc/image/upload/q_auto/f_auto";

const IMG = {
  almon: {
    main:        `${CDN}/v1779906461/Copy_of_PDP_-_AlmonMix_01_yam9or.jpg`,
    comparison:  `${CDN}/v1779906461/Copy_of_PDP_-_AlmonMix_01_yam9or.jpg`,
    nutrition:   `${CDN}/v1779906462/Copy_of_PDP_-_AlmonMix_04_eh0b1z.jpg`,
    ingredients: `${CDN}/v1779906461/Copy_of_PDP_-_AlmonMix_02_x6n9wr.jpg`,
    serve:       `${CDN}/v1779906462/Copy_of_PDP_-_AlmonMix_05_zwop0e.jpg`,
  },
  almonVariant: {
    cokelat:       `${CDN}/v1779911654/AlmonMix_-_Cokelat_kfwdk4.png`,
    chocoHazelnut: `${CDN}/v1779911762/AlmonMix_-_Choco_Hazelnut_mkgwwy.png`,
    matcha:        `${CDN}/v1779937931/AlmonMix_-_Matcha_lqyyib.png`,
    vanilla:       `${CDN}/v1779937926/AlmonMix_-_Vanilla_vaelgw.png`,
    coffeeLatte:   `${CDN}/v1779937928/AlmonMix_-_Coffee_Latte_vmhb8k.png`,
    strawberry:    `${CDN}/v1779937501/AlmonMix_-_Strawberry_oskpsv.png`,
    caramel:       `${CDN}/v1779937526/AlmonMix_-_Caramel_jsoc9b.png`,
  },
  zoya: {
    main:        `${CDN}/v1779906478/PDP_-_ZoyaMix_01_mhnoas.jpg`,
    halal:       `${CDN}/v1779906480/PDP_-_ZoyaMix_03_kyd1y3.jpg`,
    nutrients:   `${CDN}/v1779906479/PDP_-_ZoyaMix_02_qpr51s.jpg`,
    nutrition:   `${CDN}/v1779906483/PDP_-_ZoyaMix_06_sxz3ib.jpg`,
    ingredients: `${CDN}/v1779906481/PDP_-_ZoyaMix_04_eik2c6.jpg`,
    serve:       `${CDN}/v1779906484/PDP_-_ZoyaMix_07_kgocgg.jpg`,
    comparison:  `${CDN}/v1779906482/PDP_-_ZoyaMix_05_ev54ed.jpg`,
  },
  zoyaVariant: {
    cokelat:      `${CDN}/v1779938346/Zoya_Mix_Cokelat_2_x9jhfl.png`,
  },
  teh: {
    main:         `${CDN}/v1779906475/PDP_-_Lactation_Tea_01_xwadr5.jpg`,
    comparison:   `${CDN}/v1779906477/PDP_-_Lactation_Tea_03_mfojv8.jpg`,
    ingredients:  `${CDN}/v1779906476/PDP_-_Lactation_Tea_02_v0dddg.jpg`,
  },
  tehVariant: {
    strawberry20Sach: `${CDN}/v1779956034/Teh_Strawberry_2_ztmb9y.png`,
    strawberry10Sach: `${CDN}/v1779956054/Teh_Strawberry_Isi_10_lsjyna.png`,
    strawerry5Sach:   `${CDN}/v1779956076/Teh_Strawberry_Isi_5_zbrgal.png`,
    blueberry:        `${CDN}/v1779955897/Teh_Blueberry_2_bah9xw.png`,
  },
  kukis: {
    main:         `${CDN}/v1779906469/Cover_Product_MamaBear_Cookie_Bites_Kukis_Almond_Oat_zlp0ht.png`,
    ingredients:  `${CDN}/v1779961119/PDP_-_Kookie_Bites_Choco_Nut_04_n0pgrd.jpg`,
    nutrition:    `${CDN}/v1779961126/PDP_-_Kookie_Bites_Choco_Nut_02_wrcljb.jpg`,
    comparison:   `${CDN}/v1779961124/PDP_-_Almond_Oat_Cookies_Cream_04_azwmin.jpg`,
  },
  kukisVariant: {
    chocoNut:     `${CDN}/v1779955235/Kookite_Bites_-_Choco_Nut_Less_Sugar_nu4l8f.png`,
    chocoChip:    `${CDN}/v1779955230/kukis_almond_oat_CC_front_htjrhg.png`,
    cookiesCream: `${CDN}/v1779955230/kukis_almond_oat_CaC_front_htjrhg.png`,
  },
  kapsul: {
    main:        `${CDN}/v1779906465/MP_-_Cover_Kapsul_Bahasa_Inggris-01_ymbcky.jpg`,
    dosage:      `${CDN}/v1779906470/MP_-_Cover_Kapsul_Bahasa_Inggris-03_godphj.jpg`,
    momsChoice:  `${CDN}/v1779906466/MP_-_Cover_Kapsul_Bahasa_Inggris-02_ys6dsx.jpg`,
    ingredients: `${CDN}/v1779906469/MP_-_Cover_Kapsul_Bahasa_Inggris-04_lyg3dk.jpg`,
  },
  kapsulVariant: {
    kapsul30: `${CDN}/v1779954164/Kapsul_ASI_Booster_2_1_qmegcj.png`,
  },
};

export async function seedProducts(prisma: PrismaClient) {
  const cat = await prisma.category.findMany({
    where: {
      slug: { in: ["almonmix", "zoyamix", "teh-pelancar-asi", "kookie", "kapsul-pelancar-asi"] },
    },
  });
  const catMap = Object.fromEntries(cat.map((c) => [c.slug, c.id]));

  // ─── AlmonMix ─────────────────────────────────────────────────────────────
  // basePrice: 80000 | discountPrice: 40000 (semua varian sama)

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

Hadir dalam 7 varian rasa: Cokelat, Choco Hazelnut, Coffee Latte, Strawberry, Vanilla, Matcha, Caramel

Cara penyajian: Seduh 1 sachet MamaBear AlmonMix dengan 200 ml air hangat. Dapat ditambahkan es batu jika ingin disajikan dingin.

Ingredients: Daun Katuk, Daun Kelor, Almond, Ekstrak Ragi

Keunggulan Mamabear AlmonMix:
- Efektif meningkatkan produksi dan nutrisi ASI
- Efektif membantu ASI cepat keluar
- Meningkatkan mood untuk membantu mengurangi risiko baby blues`,
      basePrice: 80000,
      discountPrice: 40000,
      weight: 200,
      stock: 700,
      soldCount: 312,
      status: ProductStatus.active,
      categoryId: catMap["almonmix"],
      variants: {
        create: [
          { name: "Rasa", value: "Cokelat",        basePrice: 80000, discountPrice: 40000, priceAdjustment: 40000, stock: 100, imageUrl: IMG.almonVariant.cokelat,       isActive: true },
          { name: "Rasa", value: "Choco Hazelnut", basePrice: 80000, discountPrice: 40000, priceAdjustment: 40000, stock: 100, imageUrl: IMG.almonVariant.chocoHazelnut, isActive: true },
          { name: "Rasa", value: "Matcha",         basePrice: 80000, discountPrice: 40000, priceAdjustment: 40000, stock: 100, imageUrl: IMG.almonVariant.matcha,        isActive: true },
          { name: "Rasa", value: "Vanilla",        basePrice: 80000, discountPrice: 40000, priceAdjustment: 40000, stock: 100, imageUrl: IMG.almonVariant.vanilla,       isActive: true },
          { name: "Rasa", value: "Coffee Latte",   basePrice: 80000, discountPrice: 40000, priceAdjustment: 40000, stock: 100, imageUrl: IMG.almonVariant.coffeeLatte,   isActive: true },
          { name: "Rasa", value: "Strawberry",     basePrice: 80000, discountPrice: 40000, priceAdjustment: 40000, stock: 100, imageUrl: IMG.almonVariant.strawberry,    isActive: true },
          { name: "Rasa", value: "Caramel",        basePrice: 80000, discountPrice: 40000, priceAdjustment: 40000, stock: 100, imageUrl: IMG.almonVariant.caramel,       isActive: true },
        ],
      },
      images: {
        create: [
          { imageUrl: IMG.almon.main,        altText: "MamaBear AlmonMix",                   imageType: ImageType.main,        sortOrder: 0, isFeatured: true  },
          { imageUrl: IMG.almon.comparison,  altText: "AlmonMix semua varian rasa",          imageType: ImageType.other,       sortOrder: 1, isFeatured: false },
          { imageUrl: IMG.almon.nutrition,   altText: "AlmonMix Nutrition Fact",             imageType: ImageType.nutrition,   sortOrder: 2, isFeatured: false },
          { imageUrl: IMG.almon.ingredients, altText: "AlmonMix Komposisi Ingredients",      imageType: ImageType.ingredients, sortOrder: 3, isFeatured: false },
          { imageUrl: IMG.almon.serve,       altText: "AlmonMix Cara Penyajian",             imageType: ImageType.usage,       sortOrder: 4, isFeatured: false },
        ],
      },
    },
  });

  // ─── ZoyaMix ──────────────────────────────────────────────────────────────
  // basePrice: 80000 | discountPrice: 38000

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

Cara penyajian: Seduh 1 sachet ZoyaMix dengan 150 ml air hangat. Dapat ditambahkan es batu jika ingin disajikan dingin.

Ingredients: Daun Katuk, Kedelai, Daun Kelor, Ekstrak Ragi, Rolled Oat

Keunggulan Mamabear ZoyaMix:
- Melancarkan ASI
- Tinggi Kalsium & Zinc
- Kaya Kandungan Omega 3
- Sumber Zat Besi

*Catatan: mengandung produk turunan sapi.`,
      basePrice: 80000,
      discountPrice: 38000,
      weight: 250,
      stock: 100,
      soldCount: 198,
      status: ProductStatus.active,
      categoryId: catMap["zoyamix"],
      variants: {
        create: [
          { name: "Rasa", value: "Cokelat", basePrice: 80000, discountPrice: 38000, priceAdjustment: 42000, stock: 100, imageUrl: IMG.zoyaVariant.cokelat, isActive: true },
        ],
      },
      images: {
        create: [
          { imageUrl: IMG.zoya.main,        altText: "MamaBear ZoyaMix",                        imageType: ImageType.main,        sortOrder: 0, isFeatured: true  },
          { imageUrl: IMG.zoya.comparison,  altText: "Perbandingan ZoyaMix dengan brand lain",  imageType: ImageType.other,       sortOrder: 1, isFeatured: false },
          { imageUrl: IMG.zoya.nutrition,   altText: "ZoyaMix Nutrition Fact",                  imageType: ImageType.nutrition,   sortOrder: 2, isFeatured: false },
          { imageUrl: IMG.zoya.ingredients, altText: "ZoyaMix Komposisi Ingredients",           imageType: ImageType.ingredients, sortOrder: 3, isFeatured: false },
          { imageUrl: IMG.zoya.serve,       altText: "ZoyaMix Cara Penyajian",                  imageType: ImageType.usage,       sortOrder: 4, isFeatured: false },
        ],
      },
    },
  });

  // ─── Teh Pelancar ASI ─────────────────────────────────────────────────────
  // basePrice: 65000 | discountPrice: 40000 (semua varian sama)

  const tehPelancar = await prisma.product.upsert({
    where: { sku: "TPA.MMBR" },
    update: {},
    create: {
      sku: "TPA.MMBR",
      name: "MamaBear Teh Pelancar ASI Isi 20 Sachet - ASI Booster Pelancar Peningkat Produksi ASI BPOM dan Halal",
      slug: slugify("mamabear-teh-pelancar-asi-isi-20-sachet"),
      description: `MamaBear Teh Pelancar ASI Isi 20 Sachet
ASI Booster & Immunity Tea.

Individual sachet praktis & higienis.
Kantong teh bebas klorin, biodegradable, dan food grade.
Aroma harum menenangkan, relaksASI ala busui.
Tanpa tambahan bahan pengawet.
Rasa manis alami.
Herbal kaya antioksidan.

Hadir dalam 2 varian rasa: Strawberry, Blueberry

Cara penyajian (1 box isi 20 sachet x @3gr):
Seduh dengan 200-300 ml air mendidih/panas, biarkan selama min 10 menit/kuning keemasan.
Dapat ditambahkan madu/gula/lemon, atau bisa juga disajikan dingin.
Konsumsi MamaBear Teh Pelancar ASI 3-4x sehari.

Ingredients: Fenugreek, Habbatussauda, Kunir, Fennel

Keunggulan Mamabear Teh Pelancar ASI:
- Memperlancar aliran ASI
- Meningkatkan produksi & nutrisi ASI
- Meningkatkan lemak ASI & BB bayi (melalui ASI)
- Mempercepat pemulihan & meningkatkan daya tahan tubuh (Habbatussauda)

*Catatan: tidak untuk ibu hamil.`,
      basePrice: 65000,
      discountPrice: 40000,
      weight: 100,
      stock: 200,
      soldCount: 274,
      status: ProductStatus.active,
      categoryId: catMap["teh-pelancar-asi"],
      variants: {
        create: [
          { name: "Rasa", value: "Strawberry 20 Sachet", basePrice: 65000, discountPrice: 40000, priceAdjustment: 25000, stock: 100, imageUrl: IMG.tehVariant.strawberry20Sach,   isActive: true },
          { name: "Rasa", value: "Strawberry", basePrice: 65000, discountPrice: 40000, priceAdjustment: 25000, stock: 100, imageUrl: IMG.tehVariant.strawberry10Sach,   isActive: true },
          { name: "Rasa", value: "Strawberry", basePrice: 65000, discountPrice: 40000, priceAdjustment: 25000, stock: 100, imageUrl: IMG.tehVariant.strawerry5Sach,     isActive: true },
          { name: "Rasa", value: "Blueberry",  basePrice: 65000, discountPrice: 40000, priceAdjustment: 25000, stock: 100, imageUrl: IMG.tehVariant.blueberry,          isActive: true },
        ],
      },
      images: {
        create: [
          { imageUrl: IMG.teh.main,        altText: "MamaBear Teh Pelancar ASI",                                 imageType: ImageType.main,        sortOrder: 0, isFeatured: true  },
          { imageUrl: IMG.teh.comparison,  altText: "Perbandingan MamaBear Teh Pelancar ASI dengan brand lain",  imageType: ImageType.other,       sortOrder: 1, isFeatured: false },
          { imageUrl: IMG.teh.ingredients, altText: "Teh Pelancar ASI Komposisi Ingredients",                    imageType: ImageType.ingredients, sortOrder: 2, isFeatured: false },
        ],
      },
    },
  });

  // ─── Kukis Almond Oat ─────────────────────────────────────────────────────
  // Choco Nut:       basePrice: 80000 | discountPrice: 40000
  // Choco Chip:      basePrice: 80000 | discountPrice: 54000
  // Cookies & Cream: basePrice: 80000 | discountPrice: 54000

  const kukis = await prisma.product.upsert({
    where: { sku: "KU.MMBR" },
    update: {},
    create: {
      sku: "KU.MMBR",
      name: "MamaBear Kukis Almond Oat - Camilan Kaya Nutrisi untuk Ibu Menyusui Halal BPOM",
      slug: slugify("mamabear-kukis-almond-oat"),
      description: `MamaBear Kukis Almond Oat

✅ SUPERFOOD meningkatkan produksi & nutrisi ASI
✅ MAKRO & MIKRONUTRISI lengkap untuk Mama
✅ VIT B6, Omega3 & Zat Besi
✅ ANTIOXIDANT Selenium
✅ Tinggi Serat Pangan untuk kesehatan saluran pencernaan

- BPOM MD: 236213003799
- HALAL MUI: 07200046370418

Tanpa tambahan bahan pengawet.
Ukuran sekali lahap bebas remahan.
Packaging ziplock, memudahkan penyimpanan.
Aman dikonsumsi ibu hamil & menyusui, anak-anak, dewasa, & orang tua.

*Varian Cookies and Cream & Coklat Chip mengandung produk turunan susu sapi.
*Varian Choconut BEBAS produk turunan susu sapi & TANPA TELUR`,
      basePrice: 80000,
      discountPrice: 40000, // harga terendah (Choco Nut)
      weight: 150,
      stock: 300,
      soldCount: 156,
      status: ProductStatus.active,
      categoryId: catMap["kookie"],
      variants: {
        create: [
          { name: "Rasa", value: "Choco Nut",       basePrice: 80000, discountPrice: 40000, priceAdjustment: 40000, stock: 100, imageUrl: IMG.kukisVariant.chocoNut,     isActive: true },
          { name: "Rasa", value: "Choco Chip",      basePrice: 80000, discountPrice: 54000, priceAdjustment: 26000, stock: 100, imageUrl: IMG.kukisVariant.chocoChip,    isActive: true },
          { name: "Rasa", value: "Cookies & Cream", basePrice: 80000, discountPrice: 54000, priceAdjustment: 26000, stock: 100, imageUrl: IMG.kukisVariant.cookiesCream, isActive: true },
        ],
      },
      images: {
        create: [
          { imageUrl: IMG.kukis.main,         altText: "MamaBear Kukis Almond Oat",                       imageType: ImageType.main,        sortOrder: 0, isFeatured: true  },
          { imageUrl: IMG.kukis.comparison,   altText: "Perbandingan MamaBear Kukis dengan brand lain",   imageType: ImageType.other,       sortOrder: 1, isFeatured: false },
          { imageUrl: IMG.kukis.ingredients,  altText: "Kukis Almond Oat Komposisi Ingredients",          imageType: ImageType.ingredients, sortOrder: 2, isFeatured: false },
          { imageUrl: IMG.kukis.nutrition,    altText: "Kukis Almond Oat Nutrition Fact",                 imageType: ImageType.nutrition,   sortOrder: 3, isFeatured: false },
        ],
      },
    },
  });

  // ─── Kapsul ASI Booster ───────────────────────────────────────────────────
  // basePrice: 100000 | discountPrice: 61900

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
- HALAL MUI: ID00110000288610422

Kombinasi herbal & SUPERFOOD dari ekstrak daun katuk, ekstrak daun kelor, ekstrak jahe merah dan serbuk almond.
Fish Allergen Free | Fenugreek Free | 17 Nutrisi Makro & Mikro

Anjuran pemakaian: Konsumsi 2-3x sehari, 1 kapsul setelah makan.

*Tidak untuk Ibu hamil`,
      basePrice: 100000,
      discountPrice: 61900,
      weight: 100,
      stock: 100,
      soldCount: 89,
      status: ProductStatus.active,
      categoryId: catMap["kapsul-pelancar-asi"],
      variants: {
        create: [
          { name: "Ukuran", value: "30 kapsul", basePrice: 100000, discountPrice: 61900, priceAdjustment: 38100, stock: 100, imageUrl: IMG.kapsulVariant.kapsul30, isActive: true },
        ],
      },
      images: {
        create: [
          { imageUrl: IMG.kapsul.main,        altText: "MamaBear Kapsul ASI Booster",                     imageType: ImageType.main,        sortOrder: 0, isFeatured: true  },
          { imageUrl: IMG.kapsul.dosage,      altText: "Dosis Kapsul ASI Booster",                        imageType: ImageType.usage,       sortOrder: 1, isFeatured: false },
          { imageUrl: IMG.kapsul.momsChoice,  altText: "Alasan Ibu Memilih MamaBear Kapsul ASI Booster",  imageType: ImageType.other,       sortOrder: 2, isFeatured: false },
          { imageUrl: IMG.kapsul.ingredients, altText: "Kapsul ASI Booster Komposisi",                    imageType: ImageType.ingredients, sortOrder: 3, isFeatured: false },
        ],
      },
    },
  });

  console.log("✅ Products seeded:", {
    almonMix: almonMix.sku,
    zoyaMix: zoyaMix.sku,
    tehPelancar: tehPelancar.sku,
    kukis: kukis.sku,
    kapsul: kapsul.sku,
  });

  return { almonMix, zoyaMix, tehPelancar, kukis, kapsul };
}