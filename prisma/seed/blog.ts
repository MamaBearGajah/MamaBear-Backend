import { PrismaClient, BlogStatus } from "generated/prisma/client";

export async function seedBlog(prisma: PrismaClient) {
  const posts = [
    {
      slug:        "manfaat-daun-katuk-untuk-produksi-asi",
      title:       "Manfaat Daun Katuk untuk Produksi ASI",
      content:     `Daun katuk (Sauropus androgynus) sudah lama dikenal sebagai galaktagog alami yang efektif meningkatkan produksi ASI. Kandungan fitosterol dan steroid pada daun katuk dipercaya dapat merangsang hormon prolaktin yang berperan dalam produksi ASI.\n\nMamabear menggunakan ekstrak daun katuk berkualitas tinggi dalam seluruh lini produknya.`,
      excerpt:     "Daun katuk dikenal sebagai galaktagog alami yang efektif meningkatkan produksi ASI. Pelajari manfaat dan cara kerja kandungannya.",
      status:      BlogStatus.published,
      publishedAt: new Date("2024-01-15"),
    },
    {
      slug:        "tips-menyusui-untuk-ibu-baru",
      title:       "Tips Menyusui untuk Ibu Baru: Panduan Lengkap",
      content:     `Menyusui adalah perjalanan yang indah sekaligus penuh tantangan. Beberapa tips:\n1. Susui sesering mungkin di awal kelahiran.\n2. Pastikan posisi menyusui yang benar.\n3. Jaga asupan nutrisi dengan makanan bergizi.\n4. Istirahat yang cukup.\n5. Minum air putih minimal 8 gelas per hari.`,
      excerpt:     "Panduan lengkap menyusui untuk ibu baru: dari posisi yang benar, frekuensi menyusui, hingga tips menjaga produksi ASI tetap lancar.",
      status:      BlogStatus.published,
      publishedAt: new Date("2024-02-01"),
    },
    {
      slug:        "mengenal-mastitis-penyebab-gejala-cara-mengatasi",
      title:       "Mengenal Mastitis: Penyebab, Gejala, dan Cara Mengatasinya",
      content:     `Mastitis adalah peradangan pada jaringan payudara yang sering dialami ibu menyusui. Penyebab utamanya adalah penyumbatan saluran ASI atau infeksi bakteri.\n\nMamaBear Kapsul ASI Booster diformulasikan dengan ekstrak jahe merah yang bersifat anti-inflamasi untuk membantu meredakan peradangan.`,
      excerpt:     "Mastitis sering dialami ibu menyusui. Kenali penyebab, gejala, dan cara mengatasinya agar perjalanan menyusuimu tetap nyaman.",
      status:      BlogStatus.draft,
      publishedAt: null,
    },
  ];

  for (const post of posts) {
    await prisma.blogPost.upsert({
      where:  { slug: post.slug },
      update: {
        title:       post.title,
        content:     post.content,
        excerpt:     post.excerpt,
        status:      post.status,
        publishedAt: post.publishedAt,
      },
      create: post,
    });
  }

  console.log(`✅ Blog posts seeded: ${posts.length} artikel`);
}