"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedFaq = seedFaq;
async function seedFaq(prisma) {
    await prisma.faq.deleteMany({});
    await prisma.faq.createMany({
        data: [
            { question: "Apa itu Mamabear?", answer: "Mamabear adalah penyedia produk-produk pelancar ASI dengan bahan-bahan alami. Founder Agnes Susanti Widjaja adalah ibu menyusui sekaligus Bachelor degree in Science in Food Technology & Nutrition lulusan Royal Melbourne Institute of Technology.", isActive: true },
            { question: "Apa saja produk-produk Mamabear?", answer: "Mamabear menyediakan Teh Pelancar ASI, Minuman Bubuk (ZoyaMix dan AlmonMix), Almond Oat Cookies, dan Kapsul ASI Booster.", isActive: true },
            { question: "Apa keunggulan produk Mamabear?", answer: "Kami hanya menggunakan bahan-bahan alami berkualitas. Seluruh produk telah lulus uji BPOM dan tersertifikasi Halal.", isActive: true },
            { question: "Produk pelancar ASI yang paling cocok untuk saya?", answer: "Teh Pelancar ASI dan ZoyaMix efektif untuk meningkatkan produksi ASI, sedangkan AlmonMix dan Almond Oat Cookies memperkaya kualitas ASI. Dikombinasikan hasilnya lebih maksimal.", isActive: true },
            { question: "Apa perbedaan antara ZoyaMix dan AlmonMix?", answer: "Keduanya minuman bubuk berbahan tumbuhan untuk meningkatkan produksi ASI. Perbedaannya ada di bahan-bahan yang digunakan dan varian rasa yang tersedia.", isActive: true },
            { question: "Apakah ada efek samping dari produk Mamabear?", answer: "Jika dikonsumsi sesuai porsi yang direkomendasikan, produk Mamabear tidak memiliki efek samping atau ketergantungan.", isActive: true },
            { question: "Apakah ibu hamil boleh mengkonsumsi produk Mamabear?", answer: "Teh Pelancar ASI boleh dikonsumsi setelah melahirkan atau setelah minggu ke-38 kehamilan. ZoyaMix dan Almond Oat Cookies aman untuk segala usia.", isActive: true },
            { question: "Apakah produk Mamabear bisa digunakan secara bersamaan?", answer: "Ya, kombinasi produk-produk Mamabear saling melengkapi dan mendukung produksi ASI yang lebih maksimal.", isActive: true },
            { question: "Apakah produk Mamabear aman untuk yang alergi susu?", answer: "Hampir seluruh produk tidak mengandung susu, KECUALI Almond Oat Cookies varian Chocolate Chip dan Cookies and Cream.", isActive: true },
            { question: "Bagaimana cara pesan produk Mamabear?", answer: "Daftarkan email Anda, login, tambahkan produk ke keranjang, lalu selesaikan pembayaran. Tersedia juga di Tokopedia, Shopee, JD.ID, Blibli, dan Bukalapak.", isActive: true },
            { question: "Apa saja sistem pembayaran yang tersedia?", answer: "Transfer bank (BCA & Mandiri), kartu kredit, GoPay, dan Alfamart.", isActive: true },
            { question: "Berapa lama untuk proses pengiriman?", answer: "Pesanan diproses dalam 3-4 hari kerja. Lama pengiriman tergantung lokasi tujuan.", isActive: true },
            { question: "Apakah ada diskon belanja?", answer: "Subscribe ke newsletter kami untuk mendapatkan info penawaran dan update menarik!", isActive: true },
            { question: "Apakah Mamabear punya program reseller?", answer: "Ya, silahkan hubungi kami via WhatsApp untuk informasi lebih lanjut.", isActive: true },
        ],
    });
    console.log("✅ FAQ seeded");
}
//# sourceMappingURL=faq.js.map