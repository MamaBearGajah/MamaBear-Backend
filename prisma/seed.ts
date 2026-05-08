import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, ProductStatus, BlogStatus } from "generated/prisma/client";
import * as bcrypt from "bcrypt";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

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
  // USERS (admin & super_admin)
  // ───────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash("Admin@12345", 10);

  const superAdmin = await prisma.user.upsert({
    where: { email: "superadmin@mamabear.id" },
    update: {},
    create: {
      name: "Super Admin",
      email: "superadmin@mamabear.id",
      password: hashedPassword,
      role: "super_admin",
      isVerified: true,
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: "admin@mamabear.id" },
    update: {},
    create: {
      name: "Admin Mamabear",
      email: "admin@mamabear.id",
      password: hashedPassword,
      role: "admin",
      isVerified: true,
    },
  });

  console.log("✅ Users seeded:");
  console.log(`   - ${superAdmin.email} (super_admin)`);
  console.log(`   - ${admin.email} (admin)`);

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
      basePrice: 80000,
      discountPrice: 40000,
      weight: 200,
      stock: 100,
      mainImage: "AlmonMix.zip",
      status: ProductStatus.active,
      categoryId: catAlmonMix.id,
      variants: {
        create: [
          { name: "Rasa", value: "Cokelat",        imageUrl: "AlmonMix - Cokelat.png",        stock: 100, isActive: true },
          { name: "Rasa", value: "Choco Hazelnut", imageUrl: "AlmonMix - Choco Hazelnut.png", stock: 100, isActive: true },
          { name: "Rasa", value: "Matcha",          imageUrl: "AlmonMix - Matcha.png",          stock: 100, isActive: true },
          { name: "Rasa", value: "Vanilla",         imageUrl: "AlmonMix - Vanilla.png",         stock: 100, isActive: true },
          { name: "Rasa", value: "Coffee Latte",    imageUrl: "AlmonMix - Coffee Latte.png",    stock: 100, isActive: true },
          { name: "Rasa", value: "Strawberry",      imageUrl: "AlmonMix - Strawberry.png",      stock: 100, isActive: true },
          { name: "Rasa", value: "Caramel",         imageUrl: "AlmonMix - Caramel.png",         stock: 100, isActive: true },
        ],
      },
      // ✅ TAMBAHAN: ProductImage untuk galeri produk
      images: {
        create: [
          { imageUrl: "AlmonMix - Cokelat.png",        altText: "AlmonMix rasa Cokelat",        sortOrder: 0, isFeatured: true  },
          { imageUrl: "AlmonMix - Choco Hazelnut.png", altText: "AlmonMix rasa Choco Hazelnut", sortOrder: 1, isFeatured: false },
          { imageUrl: "AlmonMix - Matcha.png",          altText: "AlmonMix rasa Matcha",          sortOrder: 2, isFeatured: false },
          { imageUrl: "AlmonMix - Vanilla.png",         altText: "AlmonMix rasa Vanilla",         sortOrder: 3, isFeatured: false },
          { imageUrl: "AlmonMix - Coffee Latte.png",    altText: "AlmonMix rasa Coffee Latte",    sortOrder: 4, isFeatured: false },
          { imageUrl: "AlmonMix - Strawberry.png",      altText: "AlmonMix rasa Strawberry",      sortOrder: 5, isFeatured: false },
          { imageUrl: "AlmonMix - Caramel.png",         altText: "AlmonMix rasa Caramel",         sortOrder: 6, isFeatured: false },
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
      basePrice: 80000,
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
      // ✅ TAMBAHAN: ProductImage
      images: {
        create: [
          { imageUrl: "Zoya Mix Cokelat 2.png", altText: "ZoyaMix rasa Cokelat", sortOrder: 0, isFeatured: true },
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
      basePrice: 65000,
      discountPrice: 40000,
      weight: 100,
      stock: 100,
      mainImage: "Teh.zip",
      status: ProductStatus.active,
      categoryId: catTehPelancar.id,
      variants: {
        create: [
          { name: "Rasa", value: "Strawberry", imageUrl: "Teh Strawberry 1.png", stock: 100, isActive: true },
          { name: "Rasa", value: "Blueberry",  imageUrl: "Teh Blueberry 1.png",  stock: 100, isActive: true },
        ],
      },
      // ✅ TAMBAHAN: ProductImage
      images: {
        create: [
          { imageUrl: "Teh Strawberry 1.png", altText: "Teh Pelancar ASI rasa Strawberry", sortOrder: 0, isFeatured: true  },
          { imageUrl: "Teh Blueberry 1.png",  altText: "Teh Pelancar ASI rasa Blueberry",  sortOrder: 1, isFeatured: false },
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
      basePrice: 80000,
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
            priceAdjustment: 14000,
            stock: 100,
            isActive: true,
          },
          {
            name: "Rasa",
            value: "Cookies & Cream",
            imageUrl: "kukis almond oat C&C front.png",
            priceAdjustment: 14000,
            stock: 100,
            isActive: true,
          },
        ],
      },
      // ✅ TAMBAHAN: ProductImage
      images: {
        create: [
          { imageUrl: "Kookite Bites - Choco Nut (Less Sugar).png", altText: "Kukis Almond Oat Choco Nut",      sortOrder: 0, isFeatured: true  },
          { imageUrl: "kukis almond oat CC front.png",               altText: "Kukis Almond Oat Choco Chip",     sortOrder: 1, isFeatured: false },
          { imageUrl: "kukis almond oat C&C front.png",              altText: "Kukis Almond Oat Cookies & Cream", sortOrder: 2, isFeatured: false },
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
      basePrice: 100000,
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
      // ✅ TAMBAHAN: ProductImage
      images: {
        create: [
          { imageUrl: "Kapsul ASI Booster 1 (1).png", altText: "Kapsul ASI Booster 30 kapsul", sortOrder: 0, isFeatured: true },
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

  // ───────────────────────────────────────────────
  // ✅ FAQ (dari dokumen FAQ resmi Mamabear)
  // ───────────────────────────────────────────────
  const faqs = [
    // --- Produk ---
    {
      question: "Apa itu Mamabear?",
      answer:
        "Mamabear adalah penyedia produk-produk pelancar ASI dengan bahan-bahan alami. Founder Agnes Susanti Widjaja adalah ibu menyusui sekaligus Bachelor degree in Science in Food Technology & Nutrition lulusan Royal Melbourne Institute of Technology. Melalui riset, pengalaman dan dedikasinya, Mamabear hadir sebagai solusi ASI terbaik bagi Anda.",
    },
    {
      question: "Apa saja produk-produk Mamabear?",
      answer:
        "Mamabear menyediakan produk-produk pelancar ASI yaitu: Teh Pelancar ASI, Minuman Bubuk (ZoyaMix dan AlmonMix), dan Almond Oat Cookies. Kami juga menawarkan Kantong ASI dan produk menarik lainnya. ZoyaMix dan Almond Oat Cookies juga bisa dikonsumsi oleh semua usia, termasuk anak-anak sebagai camilan atau sarapan sehat.",
    },
    {
      question: "Apa keunggulan produk Mamabear?",
      answer:
        "Kami hanya menggunakan bahan-bahan alami berkualitas yang diproduksi dengan teknologi dan proses terbaik. Seluruh produk kami aman dan efektif, serta praktis untuk ibu menyusui. Seluruh produk Mamabear juga telah lulus uji BPOM dan tersertifikasi Halal.",
    },
    {
      question: "Produk pelancar ASI yang paling cocok untuk saya?",
      answer:
        "Setiap produk Mamabear dibuat untuk ibu menyusui. Namun, setiap hasil yang dirasakan akan berbeda-beda pada setiap individu. Sesuai pengalaman kami, Teh Pelancar ASI dan ZoyaMix efektif untuk meningkatkan produksi ASI, sedangkan AlmonMix dan Almond Oat Cookies bisa memperkaya kualitas ASI. Jika dikombinasikan secara bersamaan, hasilnya juga akan lebih maksimal.",
    },
    {
      question: "Apa perbedaan antara ZoyaMix dan AlmonMix?",
      answer:
        "ZoyaMix dan AlmonMix adalah produk minuman bubuk dari bahan-bahan tumbuhan yang didesain untuk meningkatkan produksi ASI. Keduanya punya rasa lezat dan praktis digunakan. Perbedaannya lebih ke bahan-bahan yang digunakan dan rasa yang tersedia. Silahkan pilih sesuai selera Anda!",
    },
    {
      question: "Apakah ada peringatan kesehatan sebelum pemakaian produk Mamabear?",
      answer:
        "Seluruh produk kami terbuat dari bahan-bahan alami dan pilihan yang aman untuk ibu menyusui. ZoyaMix dan Almond Oat Cookies juga cocok untuk segala usia, termasuk untuk ibu hamil. Konsumsi Almond Oat Cookies sangat baik untuk persiapan menyusui bagi ibu hamil, yaitu untuk stimulasi kelenjar payudara untuk produksi ASI. Konsumsi seluruh produk Mamabear sesuai petunjuk di kemasan.",
    },
    {
      question: "Apakah ada efek samping dari produk Mamabear?",
      answer:
        "Jika dikonsumsi secara tepat dan sesuai dengan porsi yang direkomendasikan di kemasan, produk Mamabear tidak memiliki efek samping atau ketergantungan. Anda boleh berkonsultasi dengan dokter Anda sebelum mengkonsumsi produk kami.",
    },
    {
      question: "Apakah ibu hamil boleh mengkonsumsi produk Mamabear?",
      answer:
        "Teh Pelancar ASI Mamabear boleh dikonsumsi setelah melahirkan atau pasca bersalin. Ibu hamil juga boleh mengkonsumsi teh setelah minggu ke-38 kehamilan. Selain itu, ZoyaMix dan Almond Oat Cookies aman dan cocok untuk segala usia.",
    },
    {
      question: "Bagaimana cara konsumsi produk Mamabear agar cepat mendapatkan hasil?",
      answer:
        "Ikuti anjuran pemakaian yang tersedia untuk masing-masing produk. Jika ingin mengombinasikan beberapa produk Mamabear sekaligus, Anda bisa menggunakannya secara bergantian, misalnya: sarapan dengan ZoyaMix, minum Teh Pelancar ASI di siang hari, camilan sore dengan Almond Oat Cookies, dan minum ZoyaMix sebelum tidur. Almond Oat Cookies bisa digunakan sebagai snack kapan saja.",
    },
    {
      question: "Apakah produk Mamabear bisa digunakan secara bersamaan?",
      answer:
        "Ya, kombinasi produk-produk Mamabear dapat saling melengkapi dan mendukung produksi ASI yang semakin maksimal. Seluruh bahan-bahan kami bersifat alami dan tidak mengandung bahan kimia berbahaya, sehingga Anda tidak perlu khawatir akan overdosis.",
    },
    {
      question: "Apakah produk Mamabear aman untuk yang alergi susu?",
      answer:
        "Hampir seluruh produk kami tidak mengandung susu dan produk turunannya, KECUALI Almond Oat Cookies varian Chocolate Chip dan Cookies and Cream. Untuk Almond Oat Cookies rasa Choco Nut tidak mengandung susu.",
    },
    // --- Order ---
    {
      question: "Bagaimana cara pesan produk Mamabear?",
      answer:
        "Buat akun dengan cara mendaftarkan email Anda. Login dan tambahkan produk ke keranjang, lalu lengkapi pembayaran untuk menyelesaikan pesanan. Produk Mamabear juga tersedia di mitra resmi kami di Tokopedia, Shopee, JD.ID, Blibli, dan Bukalapak.",
    },
    {
      question: "Apa saja sistem pembayaran yang tersedia?",
      answer:
        "Kami menerima berbagai bentuk pembayaran, antara lain transfer bank (BCA & Mandiri), kartu kredit, GoPay, dan Alfamart.",
    },
    {
      question: "Berapa lama untuk proses pengiriman?",
      answer:
        "Pesanan Anda akan diproses dalam 3-4 hari kerja. Lama pengiriman tergantung pada lokasi tujuan.",
    },
    {
      question: "Apakah saya bisa mengganti pesanan atau alamat jika pembayaran sudah terkonfirmasi?",
      answer:
        "Untuk mengubah pesanan, langsung WhatsApp untuk menghubungi tim kami. Untuk mengubah alamat, silahkan batalkan pesanan untuk membuat pesanan baru.",
    },
    {
      question: "Apakah ada diskon belanja?",
      answer:
        "Silahkan subscribe ke newsletter kami untuk mendapatkan info penawaran dan update menarik lainnya!",
    },
    // --- Lain-lain ---
    {
      question: "Apakah Mamabear punya program reseller?",
      answer:
        "Ya, Mamabear memiliki program reseller. Silahkan hubungi kami via WhatsApp untuk informasi lebih lanjut.",
    },
  ];

  for (const faq of faqs) {
    await prisma.faq.upsert({
      // Faq tidak punya unique field selain id, jadi kita cek berdasarkan question
      // Karena tidak ada @unique di question, kita pakai create saja dengan deleteMany dulu
      where: { id: "placeholder" }, // tidak akan match, akan selalu create
      update: {},
      create: {
        question: faq.question,
        answer: faq.answer,
        isActive: true,
      },
    });
  }

  // Catatan: karena Faq tidak memiliki unique constraint selain id,
  // pendekatan yang lebih aman adalah deleteMany + createMany agar tidak duplikat saat re-seed
  // Gunakan pendekatan ini jika seed dijalankan berulang kali:
  //
  // await prisma.faq.deleteMany({});
  // await prisma.faq.createMany({ data: faqs.map(f => ({ ...f, isActive: true })) });

  console.log(`✅ FAQ seeded: ${faqs.length} item`);

  // ───────────────────────────────────────────────
  // ✅ BLOG POSTS (contoh artikel)
  // ───────────────────────────────────────────────
  const blogPosts = [
    {
      title: "Manfaat Daun Katuk untuk Produksi ASI",
      slug: "manfaat-daun-katuk-untuk-produksi-asi",
      content: `Daun katuk (Sauropus androgynus) sudah lama dikenal sebagai galaktagog alami yang efektif meningkatkan produksi ASI. Kandungan fitosterol dan steroid pada daun katuk dipercaya dapat merangsang hormon prolaktin yang berperan dalam produksi ASI.

Penelitian menunjukkan bahwa ibu menyusui yang mengonsumsi ekstrak daun katuk secara rutin mengalami peningkatan volume ASI yang signifikan. Selain itu, daun katuk juga kaya akan vitamin A, C, dan zat besi yang penting untuk kesehatan ibu dan bayi.

Mamabear menggunakan ekstrak daun katuk berkualitas tinggi dalam seluruh lini produknya, mulai dari AlmonMix, ZoyaMix, Teh Pelancar ASI, hingga Kapsul ASI Booster.`,
      status: BlogStatus.published,
      publishedAt: new Date("2024-01-15"),
    },
    {
      title: "Tips Menyusui untuk Ibu Baru: Panduan Lengkap",
      slug: "tips-menyusui-untuk-ibu-baru",
      content: `Menyusui adalah perjalanan yang indah sekaligus penuh tantangan bagi ibu baru. Berikut beberapa tips yang dapat membantu Anda menjalani masa menyusui dengan lebih lancar.

1. Susui sesering mungkin di awal kelahiran untuk merangsang produksi ASI.
2. Pastikan posisi menyusui yang benar agar bayi dapat mengisap dengan optimal.
3. Jaga asupan nutrisi ibu dengan makanan bergizi dan suplemen pendukung ASI.
4. Istirahat yang cukup karena stres dan kelelahan dapat menghambat produksi ASI.
5. Tetap terhidrasi dengan minum air putih minimal 8 gelas per hari.

Produk-produk Mamabear dapat membantu melengkapi nutrisi Anda selama masa menyusui sehingga produksi ASI tetap optimal.`,
      status: BlogStatus.published,
      publishedAt: new Date("2024-02-01"),
    },
    {
      title: "Mengenal Mastitis: Penyebab, Gejala, dan Cara Mengatasinya",
      slug: "mengenal-mastitis-penyebab-gejala-cara-mengatasi",
      content: `Mastitis adalah peradangan pada jaringan payudara yang sering dialami ibu menyusui. Kondisi ini dapat menyebabkan rasa nyeri, pembengkakan, dan kemerahan pada payudara.

Penyebab utama mastitis adalah penyumbatan saluran ASI atau infeksi bakteri. Beberapa faktor risiko meliputi teknik menyusui yang tidak tepat, jadwal menyusui yang tidak teratur, atau penggunaan bra yang terlalu ketat.

Cara mengatasi mastitis antara lain terus menyusui atau memompa ASI secara rutin, kompres hangat pada area yang nyeri, dan konsultasi dengan dokter jika gejala tidak membaik.

MamaBear Kapsul ASI Booster diformulasikan dengan ekstrak jahe merah yang memiliki sifat anti-inflamasi untuk membantu meredakan peradangan pada penyumbatan kelenjar ASI.`,
      status: BlogStatus.draft,
      publishedAt: null,
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    });
  }

  console.log(`✅ Blog posts seeded: ${blogPosts.length} artikel`);

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