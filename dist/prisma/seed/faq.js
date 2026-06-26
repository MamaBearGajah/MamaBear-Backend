"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedFaq = seedFaq;
async function seedFaq(prisma) {
    await prisma.faq.deleteMany({});
    await prisma.faq.createMany({
        data: [
            {
                question: "Apa itu Mamabear?",
                answer: "Mamabear adalah penyedia produk-produk pelancar ASI dengan bahan-bahan alami. Founder Agnes Susanti Widjaja adalah ibu menyusui sekaligus Bachelor degree in Science in Food Technology & Nutrition lulusan Royal Melbourne Institute of Technology.",
                isActive: true,
            },
            {
                question: "Apa saja produk-produk Mamabear?",
                answer: "Mamabear menyediakan Teh Pelancar ASI, Minuman Bubuk (ZoyaMix dan AlmonMix), Almond Oat Cookies, dan Kapsul ASI Booster.",
                isActive: true,
            },
            {
                question: "Apa keunggulan produk Mamabear?",
                answer: "Kami hanya menggunakan bahan-bahan alami berkualitas. Seluruh produk telah lulus uji BPOM dan tersertifikasi Halal.",
                isActive: true,
            },
            {
                question: "Produk pelancar ASI yang paling cocok untuk saya?",
                answer: "Teh Pelancar ASI dan ZoyaMix efektif untuk meningkatkan produksi ASI, sedangkan AlmonMix dan Almond Oat Cookies memperkaya kualitas ASI. Dikombinasikan hasilnya lebih maksimal.",
                isActive: true,
            },
            {
                question: "Apa perbedaan antara ZoyaMix dan AlmonMix?",
                answer: "Keduanya minuman bubuk berbahan tumbuhan untuk meningkatkan produksi ASI. Perbedaannya ada di bahan-bahan yang digunakan dan varian rasa yang tersedia.",
                isActive: true,
            },
            {
                question: "Apakah ada efek samping dari produk Mamabear?",
                answer: "Jika dikonsumsi sesuai porsi yang direkomendasikan, produk Mamabear tidak memiliki efek samping atau ketergantungan.",
                isActive: true,
            },
            {
                question: "Apakah ibu hamil boleh mengkonsumsi produk Mamabear?",
                answer: "Teh Pelancar ASI boleh dikonsumsi setelah melahirkan atau setelah minggu ke-38 kehamilan. ZoyaMix dan Almond Oat Cookies aman untuk segala usia.",
                isActive: true,
            },
            {
                question: "Apakah produk Mamabear bisa digunakan secara bersamaan?",
                answer: "Ya, kombinasi produk-produk Mamabear saling melengkapi dan mendukung produksi ASI yang lebih maksimal.",
                isActive: true,
            },
            {
                question: "Apakah produk Mamabear aman untuk yang alergi susu?",
                answer: "Hampir seluruh produk tidak mengandung susu, KECUALI Almond Oat Cookies varian Chocolate Chip dan Cookies and Cream.",
                isActive: true,
            },
            {
                question: "Bagaimana cara pesan atau order produk Mamabear?",
                answer: "Daftarkan email Anda, login, tambahkan produk ke keranjang, lalu selesaikan pembayaran. Tersedia juga di Tokopedia, Shopee, JD.ID, Blibli, dan Bukalapak.",
                isActive: true,
            },
            {
                question: "Bagaimana cara melacak status pesanan saya?",
                answer: "Setelah login, buka menu 'Pesanan Saya' untuk melihat status dan riwayat pesanan. Notifikasi juga akan dikirimkan ke email yang terdaftar.",
                isActive: true,
            },
            {
                question: "Bisakah saya membatalkan pesanan?",
                answer: "Pembatalan pesanan dapat dilakukan sebelum pesanan diproses. Hubungi tim kami melalui WhatsApp sesegera mungkin jika ingin membatalkan.",
                isActive: true,
            },
            {
                question: "Apa saja metode pembayaran yang tersedia?",
                answer: "Transfer bank (BCA & Mandiri), kartu kredit, GoPay, OVO, DANA, dan Alfamart.",
                isActive: true,
            },
            {
                question: "Apakah ada diskon atau promo belanja?",
                answer: "Subscribe ke newsletter kami untuk mendapatkan info penawaran dan update menarik! Kami juga sering mengadakan promo di Tokopedia dan Shopee.",
                isActive: true,
            },
            {
                question: "Berapa ongkos kirim pengiriman ke seluruh Indonesia?",
                answer: "Ongkos kirim dihitung berdasarkan berat paket dan lokasi tujuan pengiriman. Biaya ongkir akan ditampilkan secara otomatis saat checkout setelah kamu memasukkan alamat pengiriman. Gratis ongkir berlaku untuk pembelian di atas Rp 200.000 (syarat & ketentuan berlaku).",
                isActive: true,
            },
            {
                question: "Berapa lama proses dan lama pengiriman pesanan?",
                answer: "Pesanan diproses dalam 1-2 hari kerja. Lama pengiriman tergantung lokasi tujuan: Jakarta & sekitarnya 1-2 hari, Jawa 2-3 hari, luar Jawa 3-7 hari kerja.",
                isActive: true,
            },
            {
                question: "Jasa ekspedisi apa yang digunakan Mamabear?",
                answer: "Mamabear menggunakan JNE, J&T Express, SiCepat, dan Anteraja. Kamu bisa memilih ekspedisi yang diinginkan saat checkout.",
                isActive: true,
            },
            {
                question: "Apakah ada layanan pengiriman same day atau instan?",
                answer: "Pengiriman same day tersedia untuk wilayah Jakarta dan sekitarnya melalui GoSend atau Grab Express. Pilih opsi ini saat checkout (tersedia jika muncul di daftar ekspedisi).",
                isActive: true,
            },
            {
                question: "Apakah Mamabear punya program reseller atau afiliasi?",
                answer: "Ya, silahkan hubungi kami via WhatsApp untuk informasi lebih lanjut mengenai program reseller dan keuntungannya.",
                isActive: true,
            },
            {
                question: "Bagaimana cara menghubungi customer service Mamabear?",
                answer: "Kamu bisa menghubungi tim kami melalui WhatsApp yang tertera di website, atau melalui fitur chatbot ini. Jam operasional: Senin–Jumat pukul 08.00–17.00 WIB.",
                isActive: true,
            },
        ],
    });
    console.log("✅ FAQ seeded (20 entries)");
}
//# sourceMappingURL=faq.js.map