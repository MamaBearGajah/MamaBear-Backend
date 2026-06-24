"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedOrders = seedOrders;
const client_1 = require("../../generated/prisma/client");
function daysAgo(n) {
    const d = new Date();
    d.setDate(d.getDate() - n);
    return d;
}
function generateOrderNumber(createdAt, index) {
    const y = createdAt.getFullYear();
    const m = String(createdAt.getMonth() + 1).padStart(2, "0");
    const d = String(createdAt.getDate()).padStart(2, "0");
    const seq = String(index).padStart(4, "0");
    return `ORB-${y}${m}${d}-${seq}`;
}
async function seedOrders(prisma, { customers, addresses, products }) {
    const { almonMix, zoyaMix, tehPelancar, kukis, kapsul } = products;
    await prisma.payment.deleteMany({});
    await prisma.productReviewHelpful.deleteMany({});
    await prisma.productReviewImage.deleteMany({});
    await prisma.productReview.deleteMany({});
    await prisma.order.deleteMany({});
    const reviewsAlmonMix = [
        { rating: 5, review: "Suka banget sama AlmonMix rasa Cokelat! ASI langsung berasa lebih deras setelah rutin minum 3 hari. Recommended banget buat busui!" },
        { rating: 5, review: "Rasa Choco Hazelnut favoritnya, apalagi dicampur es batu. ASI makin lancar, mood juga ikut membaik." },
        { rating: 4, review: "Bahan-bahannya alami, rasanya enak nggak amis, dan efeknya kerasa dalam seminggu." },
        { rating: 5, review: "Rasa Matcha enak banget dan nggak terlalu manis. ASI jadi lebih kental dan banyak." },
        { rating: 5, review: "Produksi ASI meningkat drastis. Anak saya yang awalnya rewel sekarang lebih tenang. Terima kasih Mamabear!" },
        { rating: 4, review: "Rasanya enak, mudah larut, dan praktis dibawa ke mana-mana. Efeknya konsisten diminum seminggu." },
        { rating: 5, review: "AlmonMix Coffee Latte jadi pengganti kopi saya selama menyusui. ASI makin deras, worth it!" },
        { rating: 3, review: "Rasa Vanilla agak terlalu manis. Tapi efek ke ASI memang ada. Mungkin akan coba rasa lain." },
        { rating: 5, review: "Rasa Strawberry segar diminum pagi hari. ASI lebih lancar dan stok pumping jadi banyak." },
        { rating: 4, review: "AlmonMix Caramel enak banget diminum dingin. Dikombinasikan dengan Teh hasilnya luar biasa!" },
    ];
    const reviewsTeh = [
        { rating: 5, review: "Aromanya harum banget, bikin relaks. Setelah minum 3 hari, ASI yang tadinya seret jadi lancar!" },
        { rating: 5, review: "Rasa Blueberry segar dan efektif meningkatkan produksi ASI. Sudah repeat order 3x!" },
        { rating: 4, review: "Rasanya enak, nggak pahit, manis alami. Dalam 4 hari sudah terasa bedanya." },
        { rating: 5, review: "Sachetnya praktis dibawa ke kantor. ASI makin deras dan bayi happy!" },
        { rating: 4, review: "Teh pelancar ASI yang paling enak yang pernah saya coba. Efeknya lumayan signifikan." },
        { rating: 5, review: "ASI langsung keluar lebih banyak dalam 2 hari pertama. Highly recommended!" },
        { rating: 5, review: "Rasa Strawberry cocok diminum dingin. Produksi ASI meningkat dan bayi lebih gemuk." },
        { rating: 4, review: "Bulan ke-2 konsumsi. Konsisten diminum 3-4x sehari dan hasilnya stabil." },
        { rating: 5, review: "Beneran kerja! Setelah rutin 5 hari, koleksi ASIP di freezer bertambah signifikan." },
        { rating: 3, review: "Efek ke ASI ada. Tapi rasa Blueberry kurang kuat, lebih ke rasa buah samar." },
    ];
    const reviewsZoyaMix = [
        { rating: 5, review: "Jadi sarapan wajib saya! Enak, mengenyangkan, dan ASI terasa lebih banyak dan kental." },
        { rating: 4, review: "Praktis, enak, dan bergizi. Efek ke ASI cukup terasa setelah seminggu konsumsi rutin." },
        { rating: 5, review: "ZoyaMix rasa Cokelat mirip minuman sereal mewah. Stok ASIP terus bertambah." },
        { rating: 4, review: "Pengganti susu formula yang jauh lebih baik. Kaya nutrisi dan cocok untuk ibu menyusui aktif." },
        { rating: 5, review: "2 bulan rutin konsumsi. Produksi ASI stabil meski saya mulai bekerja lagi." },
    ];
    const reviewsKukis = [
        { rating: 5, review: "Rasa Choco Nut pas di lidah, nggak terlalu manis. Camilan sehat guilt-free untuk busui!" },
        { rating: 4, review: "Cookies & Cream enak, mirip oreo tapi lebih sehat. Cocok sebagai pendamping booster." },
        { rating: 5, review: "Anti snack sehat akhirnya menemukan camilan sehat yang beneran enak. ASI juga makin lancar." },
        { rating: 4, review: "Choco Chip renyah dan potongannya pas. Dikombinasikan dengan AlmonMix hasilnya signifikan." },
        { rating: 5, review: "Camilan favorit saya dan suami! Varian Choco Nut bebas susu, aman untuk lactose intolerant." },
    ];
    const reviewsKapsul = [
        { rating: 5, review: "ASI yang sempat drop karena stres langsung membaik setelah 3 hari. Praktis untuk ibu sibuk!" },
        { rating: 5, review: "Membantu meredakan nyeri mastitis ringan sekaligus melancarkan ASI. Luar biasa!" },
        { rating: 4, review: "Efek ke ASI signifikan dalam seminggu. Suka karena fenugreek-free. Akan repeat order." },
        { rating: 5, review: "Kapsul paling praktis! Minum 2-3x sehari tanpa repot menyeduh. Bayi lebih puas menyusu." },
    ];
    const productNameMap = new Map();
    const allProductIds = [almonMix.id, zoyaMix.id, tehPelancar.id, kukis.id, kapsul.id];
    const productRecords = await prisma.product.findMany({
        where: { id: { in: allProductIds } },
        select: { id: true, name: true },
    });
    for (const p of productRecords) {
        productNameMap.set(p.id, p.name);
    }
    let orderIndex = 1;
    const createdReviews = [];
    async function createMockOrder(opts) {
        const shippingCost = 15_000;
        const subtotal = opts.lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
        const total = subtotal + shippingCost;
        const orderNumber = generateOrderNumber(opts.createdAt, orderIndex++);
        const order = await prisma.order.create({
            data: {
                orderNumber,
                userId: opts.userId,
                addressId: opts.addressId,
                status: client_1.OrderStatus.delivered,
                paymentStatus: client_1.PaymentStatus.paid,
                subtotal, total, shippingCost,
                courier: "JNE", service: "REG",
                trackingNumber: opts.trackingNumber,
                createdAt: opts.createdAt,
                updatedAt: opts.createdAt,
                items: {
                    create: opts.lines.map((l) => ({
                        productId: l.productId,
                        productName: productNameMap.get(l.productId) ?? "",
                        quantity: l.quantity,
                        price: l.price,
                        createdAt: opts.createdAt,
                        updatedAt: opts.createdAt,
                    })),
                },
                payment: {
                    create: {
                        provider: client_1.PaymentProvider.xendit,
                        status: client_1.PaymentStatus.paid,
                        amount: total,
                        paidAt: opts.createdAt,
                        createdAt: opts.createdAt,
                        updatedAt: opts.createdAt,
                    },
                },
            },
        });
        for (let i = 0; i < opts.lines.length; i++) {
            const rd = opts.reviewData[i];
            if (!rd)
                continue;
            const reviewDate = new Date(opts.createdAt.getTime() + 3 * 24 * 60 * 60 * 1000);
            const review = await prisma.productReview.create({
                data: {
                    productId: opts.lines[i].productId,
                    userId: opts.userId,
                    orderId: order.id,
                    rating: rd.rating,
                    review: rd.review,
                    isVerifiedPurchase: true,
                    helpfulCount: 0,
                    createdAt: reviewDate,
                    updatedAt: reviewDate,
                },
            });
            createdReviews.push({ reviewId: review.id, authorUserId: opts.userId });
        }
        return order;
    }
    const c = customers;
    const a = addresses;
    await createMockOrder({ userId: c[0].id, addressId: a[0].id, createdAt: daysAgo(60), trackingNumber: "JNE0001234560", lines: [{ productId: almonMix.id, price: 40000, quantity: 3 }, { productId: tehPelancar.id, price: 40000, quantity: 2 }], reviewData: [reviewsAlmonMix[0], reviewsTeh[0]] });
    await createMockOrder({ userId: c[1].id, addressId: a[1].id, createdAt: daysAgo(55), trackingNumber: "JNE0001234561", lines: [{ productId: almonMix.id, price: 40000, quantity: 5 }], reviewData: [reviewsAlmonMix[1]] });
    await createMockOrder({ userId: c[2].id, addressId: a[2].id, createdAt: daysAgo(50), trackingNumber: "JNE0001234562", lines: [{ productId: tehPelancar.id, price: 40000, quantity: 4 }, { productId: zoyaMix.id, price: 38000, quantity: 2 }], reviewData: [reviewsTeh[1], reviewsZoyaMix[0]] });
    await createMockOrder({ userId: c[3].id, addressId: a[3].id, createdAt: daysAgo(45), trackingNumber: "JNE0001234563", lines: [{ productId: almonMix.id, price: 40000, quantity: 4 }, { productId: kukis.id, price: 40000, quantity: 2 }], reviewData: [reviewsAlmonMix[2], reviewsKukis[0]] });
    await createMockOrder({ userId: c[4].id, addressId: a[4].id, createdAt: daysAgo(42), trackingNumber: "JNE0001234564", lines: [{ productId: tehPelancar.id, price: 40000, quantity: 3 }, { productId: kapsul.id, price: 61900, quantity: 1 }], reviewData: [reviewsTeh[2], reviewsKapsul[0]] });
    await createMockOrder({ userId: c[5].id, addressId: a[5].id, createdAt: daysAgo(38), trackingNumber: "JNE0001234565", lines: [{ productId: almonMix.id, price: 40000, quantity: 6 }, { productId: zoyaMix.id, price: 38000, quantity: 3 }], reviewData: [reviewsAlmonMix[3], reviewsZoyaMix[1]] });
    await createMockOrder({ userId: c[6].id, addressId: a[6].id, createdAt: daysAgo(35), trackingNumber: "JNE0001234566", lines: [{ productId: tehPelancar.id, price: 40000, quantity: 5 }, { productId: kukis.id, price: 40000, quantity: 2 }, { productId: kapsul.id, price: 61900, quantity: 1 }], reviewData: [reviewsTeh[3], reviewsKukis[1], reviewsKapsul[1]] });
    await createMockOrder({ userId: c[7].id, addressId: a[7].id, createdAt: daysAgo(30), trackingNumber: "JNE0001234567", lines: [{ productId: almonMix.id, price: 40000, quantity: 8 }], reviewData: [reviewsAlmonMix[4]] });
    await createMockOrder({ userId: c[8].id, addressId: a[8].id, createdAt: daysAgo(28), trackingNumber: "JNE0001234568", lines: [{ productId: zoyaMix.id, price: 38000, quantity: 4 }, { productId: kukis.id, price: 40000, quantity: 3 }], reviewData: [reviewsZoyaMix[2], reviewsKukis[2]] });
    await createMockOrder({ userId: c[9].id, addressId: a[9].id, createdAt: daysAgo(25), trackingNumber: "JNE0001234569", lines: [{ productId: tehPelancar.id, price: 40000, quantity: 4 }, { productId: almonMix.id, price: 40000, quantity: 3 }, { productId: kapsul.id, price: 61900, quantity: 2 }], reviewData: [reviewsTeh[4], reviewsAlmonMix[5], reviewsKapsul[2]] });
    await createMockOrder({ userId: c[0].id, addressId: a[0].id, createdAt: daysAgo(20), trackingNumber: "JNE0001234570", lines: [{ productId: tehPelancar.id, price: 40000, quantity: 6 }], reviewData: [reviewsTeh[5]] });
    await createMockOrder({ userId: c[1].id, addressId: a[1].id, createdAt: daysAgo(18), trackingNumber: "JNE0001234571", lines: [{ productId: tehPelancar.id, price: 40000, quantity: 5 }, { productId: zoyaMix.id, price: 38000, quantity: 3 }], reviewData: [reviewsTeh[6], reviewsZoyaMix[3]] });
    await createMockOrder({ userId: c[2].id, addressId: a[2].id, createdAt: daysAgo(15), trackingNumber: "JNE0001234572", lines: [{ productId: almonMix.id, price: 40000, quantity: 7 }], reviewData: [reviewsAlmonMix[6]] });
    await createMockOrder({ userId: c[3].id, addressId: a[3].id, createdAt: daysAgo(14), trackingNumber: "JNE0001234573", lines: [{ productId: kapsul.id, price: 61900, quantity: 1 }, { productId: tehPelancar.id, price: 40000, quantity: 3 }], reviewData: [reviewsKapsul[3], reviewsTeh[7]] });
    await createMockOrder({ userId: c[4].id, addressId: a[4].id, createdAt: daysAgo(12), trackingNumber: "JNE0001234574", lines: [{ productId: almonMix.id, price: 40000, quantity: 6 }, { productId: kukis.id, price: 40000, quantity: 2 }], reviewData: [reviewsAlmonMix[7], reviewsKukis[3]] });
    await createMockOrder({ userId: c[5].id, addressId: a[5].id, createdAt: daysAgo(10), trackingNumber: "JNE0001234575", lines: [{ productId: tehPelancar.id, price: 40000, quantity: 6 }, { productId: zoyaMix.id, price: 38000, quantity: 4 }], reviewData: [reviewsTeh[8], reviewsZoyaMix[4]] });
    await createMockOrder({ userId: c[6].id, addressId: a[6].id, createdAt: daysAgo(8), trackingNumber: "JNE0001234576", lines: [{ productId: almonMix.id, price: 40000, quantity: 10 }], reviewData: [reviewsAlmonMix[8]] });
    await createMockOrder({ userId: c[7].id, addressId: a[7].id, createdAt: daysAgo(6), trackingNumber: "JNE0001234577", lines: [{ productId: tehPelancar.id, price: 40000, quantity: 4 }, { productId: kukis.id, price: 40000, quantity: 4 }], reviewData: [reviewsTeh[9], reviewsKukis[4]] });
    await createMockOrder({ userId: c[8].id, addressId: a[8].id, createdAt: daysAgo(4), trackingNumber: "JNE0001234578", lines: [{ productId: almonMix.id, price: 40000, quantity: 6 }], reviewData: [reviewsAlmonMix[9]] });
    await createMockOrder({ userId: c[9].id, addressId: a[9].id, createdAt: daysAgo(2), trackingNumber: "JNE0001234579", lines: [{ productId: zoyaMix.id, price: 38000, quantity: 5 }, { productId: almonMix.id, price: 40000, quantity: 4 }], reviewData: [null, null] });
    const allCustomerIds = customers.map((cu) => cu.id);
    const helpfulWeights = [8, 7, 6, 8, 9, 5, 7, 3, 8, 6];
    const tehWeights = [9, 8, 5, 7, 4, 8, 6, 4, 7, 2];
    const zoyaWeights = [6, 4, 7, 3, 5];
    const kukisWeights = [7, 4, 8, 3, 6];
    const kapsulWeights = [8, 7, 4, 6];
    const allWeights = [
        ...helpfulWeights,
        ...tehWeights,
        ...zoyaWeights,
        ...kukisWeights,
        ...kapsulWeights,
    ];
    for (let i = 0; i < createdReviews.length; i++) {
        const { reviewId, authorUserId } = createdReviews[i];
        const eligibleVoters = allCustomerIds.filter((id) => id !== authorUserId);
        const targetVotes = Math.min(allWeights[i] ?? 3, eligibleVoters.length);
        const shuffled = [...eligibleVoters].sort(() => Math.random() - 0.5);
        const voters = shuffled.slice(0, targetVotes);
        for (const voterId of voters) {
            await prisma.productReviewHelpful.create({
                data: { reviewId, userId: voterId, isHelpful: true },
            });
        }
        await prisma.productReview.update({
            where: { id: reviewId },
            data: { helpfulCount: voters.length },
        });
    }
    console.log(`✅ Helpful votes seeded untuk ${createdReviews.length} reviews`);
    for (const productId of allProductIds) {
        const result = await prisma.productReview.aggregate({
            where: { productId },
            _avg: { rating: true },
            _count: { rating: true },
        });
        await prisma.product.update({
            where: { id: productId },
            data: {
                avgRating: result._avg.rating ?? 0,
                reviewCount: result._count.rating,
            },
        });
    }
    console.log("✅ Orders, payments, reviews, helpful votes & avgRating seeded");
}
//# sourceMappingURL=orders.js.map