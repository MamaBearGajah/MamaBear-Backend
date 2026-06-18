"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedBlog = seedBlog;
const client_1 = require("../../generated/prisma/client");
async function seedBlog(prisma) {
    const posts = [
        {
            title: "Manfaat Daun Katuk untuk Produksi ASI",
            slug: "manfaat-daun-katuk-untuk-produksi-asi",
            content: `Daun katuk (Sauropus androgynus) sudah lama dikenal sebagai galaktagog alami yang efektif meningkatkan produksi ASI. Kandungan fitosterol dan steroid pada daun katuk dipercaya dapat merangsang hormon prolaktin yang berperan dalam produksi ASI.\n\nMamabear menggunakan ekstrak daun katuk berkualitas tinggi dalam seluruh lini produknya.`,
            status: client_1.BlogStatus.published,
            publishedAt: new Date("2024-01-15"),
        },
        {
            title: "Tips Menyusui untuk Ibu Baru: Panduan Lengkap",
            slug: "tips-menyusui-untuk-ibu-baru",
            content: `Menyusui adalah perjalanan yang indah sekaligus penuh tantangan. Beberapa tips:\n1. Susui sesering mungkin di awal kelahiran.\n2. Pastikan posisi menyusui yang benar.\n3. Jaga asupan nutrisi dengan makanan bergizi.\n4. Istirahat yang cukup.\n5. Minum air putih minimal 8 gelas per hari.`,
            status: client_1.BlogStatus.published,
            publishedAt: new Date("2024-02-01"),
        },
        {
            title: "Mengenal Mastitis: Penyebab, Gejala, dan Cara Mengatasinya",
            slug: "mengenal-mastitis-penyebab-gejala-cara-mengatasi",
            content: `Mastitis adalah peradangan pada jaringan payudara yang sering dialami ibu menyusui. Penyebab utamanya adalah penyumbatan saluran ASI atau infeksi bakteri.\n\nMamaBear Kapsul ASI Booster diformulasikan dengan ekstrak jahe merah yang bersifat anti-inflamasi untuk membantu meredakan peradangan.`,
            status: client_1.BlogStatus.draft,
            publishedAt: null,
        },
    ];
    for (const post of posts) {
        await prisma.blogPost.upsert({
            where: { slug: post.slug },
            update: {},
            create: post,
        });
    }
    console.log(`✅ Blog posts seeded: ${posts.length} artikel`);
}
//# sourceMappingURL=blog.js.map