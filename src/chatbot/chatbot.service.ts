import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

export interface QuickReply {
  id: string;
  label: string;
  payload: string;
}

export interface ChatbotResponse {
  type: 'menu' | 'answer' | 'faq' | 'fallback';
  message: string;
  quickReplies: QuickReply[];
}

// ── Reusable back-navigation buttons ──────────────────────────────────────────
const BTN_MAIN:    QuickReply = { id: 'MAIN',    label: '🏠 Menu Utama',            payload: 'MAIN'    };
const BTN_PRODUCT: QuickReply = { id: 'PRODUCT', label: '← Pilih Produk Lain',      payload: 'PRODUCT' };
const BTN_ORDER:   QuickReply = { id: 'ORDER',   label: '← Pesanan & Pengiriman',   payload: 'ORDER'   };
const BTN_PAYMENT: QuickReply = { id: 'PAYMENT', label: '← Pembayaran',             payload: 'PAYMENT' };
const BTN_SAFETY:  QuickReply = { id: 'SAFETY',  label: '← Keamanan Produk',        payload: 'SAFETY'  };
const BTN_CS:      QuickReply = { id: 'CS',      label: '📞 Hubungi CS',            payload: 'CS'      };

// ── Static conversation nodes ─────────────────────────────────────────────────
const NODES: Record<string, Omit<ChatbotResponse, 'type'> & { type: ChatbotResponse['type'] }> = {

  MAIN: {
    type: 'menu',
    message: 'Halo! 👋 Saya asisten virtual Mamabear. Pilih topik yang ingin kamu tanyakan:',
    quickReplies: [
      { id: 'PRODUCT', label: '🛍️ Produk & Manfaat',        payload: 'PRODUCT' },
      { id: 'ORDER',   label: '📦 Pesanan & Pengiriman',     payload: 'ORDER'   },
      { id: 'PAYMENT', label: '💳 Pembayaran',               payload: 'PAYMENT' },
      { id: 'SAFETY',  label: '🌿 Keamanan & Efek Samping',  payload: 'SAFETY'  },
      { id: 'FAQ',     label: '📋 FAQ Lengkap',              payload: 'FAQ'     },
      BTN_CS,
    ],
  },

  // ── PRODUK ────────────────────────────────────────────────────────────────────
  PRODUCT: {
    type: 'menu',
    message: 'Produk mana yang ingin kamu ketahui lebih lanjut?',
    quickReplies: [
      { id: 'ALMONMIX', label: '🥛 AlmonMix',          payload: 'ALMONMIX' },
      { id: 'ZOYAMIX',  label: '🌾 ZoyaMix',           payload: 'ZOYAMIX'  },
      { id: 'TEH',      label: '🍵 Teh Pelancar ASI',  payload: 'TEH'      },
      { id: 'KUKIS',    label: '🍪 Kukis Almond Oat',  payload: 'KUKIS'    },
      { id: 'KAPSUL',   label: '💊 Kapsul ASI Booster',payload: 'KAPSUL'   },
      BTN_MAIN,
    ],
  },

  ALMONMIX: {
    type: 'answer',
    message: '🥛 *MamaBear AlmonMix* — 6 sachet\n\nMinuman serbuk almond kaya nutrisi untuk ibu menyusui.\n\n✅ Lactose Free\n✅ Tinggi Vitamin A, B1, B2, B6, B9 (Folat), B12\n✅ Tinggi Vitamin C & Zat Besi\n✅ 7 varian: Cokelat, Matcha, Vanilla, Caramel, Coffee Latte, Strawberry, Choco Hazelnut\n✅ BPOM & Halal\n\n💰 Rp 40.000 / 6 sachet',
    quickReplies: [
      { id: 'ALMONMIX_HOW',     label: '📋 Cara Konsumsi',     payload: 'ALMONMIX_HOW'     },
      { id: 'ALMONMIX_COMBINE', label: '🔄 Bisa Dikombinasi?', payload: 'ALMONMIX_COMBINE' },
      BTN_PRODUCT, BTN_MAIN,
    ],
  },
  ALMONMIX_HOW: {
    type: 'answer',
    message: '📋 *Cara Konsumsi AlmonMix*\n\nLarutkan 1 sachet ke dalam 200ml air hangat/dingin. Aduk hingga larut.\n\n• Rekomendasi: 1–2 sachet per hari (pagi & sore)\n• Bisa dicampur ke smoothie atau oatmeal',
    quickReplies: [{ id: 'ALMONMIX', label: '← Info AlmonMix', payload: 'ALMONMIX' }, BTN_PRODUCT, BTN_MAIN],
  },
  ALMONMIX_COMBINE: {
    type: 'answer',
    message: '🔄 *Kombinasi dengan AlmonMix*\n\nSemua produk Mamabear bisa dikombinasikan karena berbahan alami.\n\nKombinasi populer:\n• AlmonMix + Teh → volume & kualitas ASI naik\n• AlmonMix + ZoyaMix → nutrisi lengkap (gantian pagi/sore)\n• AlmonMix + Kapsul → hasil maksimal',
    quickReplies: [BTN_PRODUCT, BTN_MAIN],
  },

  ZOYAMIX: {
    type: 'answer',
    message: '🌾 *MamaBear ZoyaMix* — 10 sachet\n\nSereal kaya nutrisi berbasis biji-bijian untuk ibu menyusui.\n\n✅ Tinggi Kalsium & Protein\n✅ Sumber Zat Besi\n✅ Makro & Mikro nutrisi lengkap\n✅ Rasa Cokelat\n✅ BPOM & Halal\n\n💰 Rp 38.000 / 10 sachet',
    quickReplies: [
      { id: 'ZOYAMIX_HOW', label: '📋 Cara Konsumsi', payload: 'ZOYAMIX_HOW' },
      BTN_PRODUCT, BTN_MAIN,
    ],
  },
  ZOYAMIX_HOW: {
    type: 'answer',
    message: '📋 *Cara Konsumsi ZoyaMix*\n\nLarutkan 1 sachet ke dalam 150–200ml air hangat. Aduk rata.\n\n• Cocok untuk sarapan atau camilan sore\n• Bisa ditambah susu untuk rasa lebih creamy',
    quickReplies: [{ id: 'ZOYAMIX', label: '← Info ZoyaMix', payload: 'ZOYAMIX' }, BTN_PRODUCT, BTN_MAIN],
  },

  TEH: {
    type: 'answer',
    message: '🍵 *MamaBear Teh Pelancar ASI* — 20 sachet\n\nTeh herbal ASI Booster & Immunity.\n\n✅ Tanpa pengawet\n✅ Rasa manis alami, kaya antioksidan\n✅ 2 varian: Strawberry & Blueberry\n✅ BPOM & Halal\n\n💰 Rp 40.000 / 20 sachet',
    quickReplies: [
      { id: 'TEH_HOW',  label: '📋 Cara Seduh',      payload: 'TEH_HOW'  },
      { id: 'TEH_WHEN', label: '⏰ Kapan Diminum?',  payload: 'TEH_WHEN' },
      BTN_PRODUCT, BTN_MAIN,
    ],
  },
  TEH_HOW: {
    type: 'answer',
    message: '📋 *Cara Seduh Teh Pelancar ASI*\n\nSeduh 1 sachet dengan 200ml air panas (90–95°C), diamkan 3–5 menit.\n\n• Bisa disajikan hangat atau dingin (tambah es)\n• Bisa ditambah madu sesuai selera',
    quickReplies: [{ id: 'TEH', label: '← Info Teh', payload: 'TEH' }, BTN_PRODUCT, BTN_MAIN],
  },
  TEH_WHEN: {
    type: 'answer',
    message: '⏰ *Waktu Minum Teh Pelancar ASI*\n\nRekomendasi:\n• Pagi setelah sarapan\n• Sore antara jam 15.00–17.00\n\n1–2 sachet per hari. Manfaat mulai terasa setelah 3–5 hari konsumsi rutin.',
    quickReplies: [{ id: 'TEH', label: '← Info Teh', payload: 'TEH' }, BTN_PRODUCT, BTN_MAIN],
  },

  KUKIS: {
    type: 'answer',
    message: '🍪 *MamaBear Kukis Almond Oat*\n\nCamilan sehat & lezat dengan superfood untuk ibu menyusui.\n\n✅ Tinggi nutrisi, membantu produksi & kualitas ASI\n✅ 3 varian rasa\n✅ BPOM & Halal\n\n💰 Choco Nut: Rp 40.000\n💰 Choco Chip / Cookies & Cream: Rp 54.000',
    quickReplies: [
      { id: 'KUKIS_VARIANTS', label: '🎨 Lihat Varian Rasa',    payload: 'KUKIS_VARIANTS' },
      { id: 'SAFETY_ALLERGY', label: '⚠️ Info Alergi Susu',    payload: 'SAFETY_ALLERGY' },
      BTN_PRODUCT, BTN_MAIN,
    ],
  },
  KUKIS_VARIANTS: {
    type: 'answer',
    message: '🎨 *Varian Kukis Almond Oat*\n\n🟤 Choco Nut (Less Sugar) — Rp 40.000\n   ✅ Bebas susu, cocok yang lactose intolerant\n\n🍫 Choco Chip — Rp 54.000\n   ⚠️ Mengandung produk susu\n\n🥛 Cookies & Cream — Rp 54.000\n   ⚠️ Mengandung produk susu',
    quickReplies: [{ id: 'KUKIS', label: '← Info Kukis', payload: 'KUKIS' }, BTN_PRODUCT, BTN_MAIN],
  },

  KAPSUL: {
    type: 'answer',
    message: '💊 *MamaBear Kapsul ASI Booster* — 30 kapsul\n\nKapsul pelancar ASI dengan triple benefit:\n\n✅ Meningkatkan produksi & nutrisi ASI\n✅ Membantu meredakan peradangan Mastitis\n✅ Membantu meredakan nyeri pasca melahirkan\n✅ Fenugreek Free — BPOM & Halal\n\n💰 Rp 61.900 / 30 kapsul',
    quickReplies: [
      { id: 'KAPSUL_HOW',      label: '📋 Cara Konsumsi',   payload: 'KAPSUL_HOW'      },
      { id: 'KAPSUL_MASTITIS', label: '🩺 Untuk Mastitis',  payload: 'KAPSUL_MASTITIS' },
      BTN_PRODUCT, BTN_MAIN,
    ],
  },
  KAPSUL_HOW: {
    type: 'answer',
    message: '📋 *Cara Konsumsi Kapsul ASI Booster*\n\n2 kapsul, 2–3× sehari dengan air putih.\n\n• Sebaiknya sesudah makan untuk menghindari mual\n• Konsumsi rutin minimal 2 minggu untuk hasil optimal',
    quickReplies: [{ id: 'KAPSUL', label: '← Info Kapsul', payload: 'KAPSUL' }, BTN_PRODUCT, BTN_MAIN],
  },
  KAPSUL_MASTITIS: {
    type: 'answer',
    message: '🩺 *Kapsul untuk Mastitis*\n\nKandungan ekstrak jahe merah & anti-inflamasi alami membantu:\n• Meredakan pembengkakan kelenjar ASI\n• Mengurangi rasa nyeri\n• Melancarkan aliran ASI yang tersumbat\n\n⚠️ Untuk gejala berat, tetap konsultasi ke dokter/bidan.',
    quickReplies: [{ id: 'KAPSUL', label: '← Info Kapsul', payload: 'KAPSUL' }, BTN_PRODUCT, BTN_MAIN],
  },

  // ── PESANAN ──────────────────────────────────────────────────────────────────
  ORDER: {
    type: 'menu',
    message: '📦 Ada yang bisa saya bantu seputar pesanan dan pengiriman?',
    quickReplies: [
      { id: 'ORDER_TRACK',    label: '🔍 Cara Lacak Pesanan',   payload: 'ORDER_TRACK'    },
      { id: 'ORDER_ESTIMATE', label: '⏱️ Estimasi Pengiriman',  payload: 'ORDER_ESTIMATE' },
      { id: 'ORDER_COURIER',  label: '🚚 Kurir Tersedia',       payload: 'ORDER_COURIER'  },
      { id: 'ORDER_CANCEL',   label: '❌ Batalkan Pesanan',     payload: 'ORDER_CANCEL'   },
      BTN_MAIN,
    ],
  },
  ORDER_TRACK: {
    type: 'answer',
    message: '🔍 *Cara Melacak Pesanan*\n\n1. Login ke akun Mamabear\n2. Buka menu "Pesanan Saya"\n3. Pilih pesanan yang ingin dilacak\n4. Klik tombol "Lacak Pesanan"\n\nNomor resi muncul setelah pesanan diproses dan dikirim.',
    quickReplies: [BTN_ORDER, BTN_MAIN],
  },
  ORDER_ESTIMATE: {
    type: 'answer',
    message: '⏱️ *Estimasi Pengiriman*\n\nProses setelah pembayaran: 1–2 hari kerja\n\nEstimasi pengiriman:\n• JNE REG: 2–3 hari kerja\n• TIKI ONS: 1–2 hari kerja\n• SiCepat BEST: 1–2 hari kerja\n\nEstimasi bisa berubah tergantung lokasi & kondisi.',
    quickReplies: [BTN_ORDER, BTN_MAIN],
  },
  ORDER_COURIER: {
    type: 'answer',
    message: '🚚 *Kurir yang Tersedia*\n\n• JNE (REG, YES, OKE)\n• TIKI (REG, ONS, ECO)\n• SiCepat (REG, BEST)\n• J&T Express\n• AnterAja\n\nPilih kurir saat checkout.',
    quickReplies: [BTN_ORDER, BTN_MAIN],
  },
  ORDER_CANCEL: {
    type: 'answer',
    message: '❌ *Cara Membatalkan Pesanan*\n\nPesanan hanya bisa dibatalkan saat status masih "Pending".\n\n1. Buka "Pesanan Saya"\n2. Pilih pesanan\n3. Klik "Batalkan Pesanan"\n\nJika sudah diproses, segera hubungi CS kami.',
    quickReplies: [BTN_ORDER, BTN_MAIN, BTN_CS],
  },

  // ── PEMBAYARAN ────────────────────────────────────────────────────────────────
  PAYMENT: {
    type: 'menu',
    message: '💳 Ada yang bisa saya bantu seputar pembayaran?',
    quickReplies: [
      { id: 'PAYMENT_METHODS', label: '💳 Metode Pembayaran',  payload: 'PAYMENT_METHODS' },
      { id: 'PAYMENT_STATUS',  label: '🔄 Cek Status Bayar',  payload: 'PAYMENT_STATUS'  },
      { id: 'PAYMENT_REFUND',  label: '↩️ Retur & Refund',    payload: 'PAYMENT_REFUND'  },
      BTN_MAIN,
    ],
  },
  PAYMENT_METHODS: {
    type: 'answer',
    message: '💳 *Metode Pembayaran*\n\n🏦 Transfer Bank: BCA, Mandiri, BNI, BRI\n📱 E-Wallet: GoPay, OVO, DANA, ShopeePay\n🏪 Minimarket: Indomaret, Alfamart\n💳 Kartu Kredit/Debit Visa & Mastercard\n📲 QRIS\n\nSemua aman melalui Midtrans & Xendit.',
    quickReplies: [BTN_PAYMENT, BTN_MAIN],
  },
  PAYMENT_STATUS: {
    type: 'answer',
    message: '🔄 *Cek Status Pembayaran*\n\n1. Login ke akun\n2. Buka "Pesanan Saya"\n3. Klik detail pesanan\n4. Status pembayaran tertera di bagian atas\n\nJika sudah bayar tapi masih "pending" > 1 jam, hubungi CS.',
    quickReplies: [BTN_PAYMENT, BTN_MAIN, BTN_CS],
  },
  PAYMENT_REFUND: {
    type: 'answer',
    message: '↩️ *Kebijakan Retur & Refund*\n\n• Retur: 7 hari sejak barang diterima\n• Produk harus tersegel / belum dibuka\n• Refund diproses 3–7 hari kerja\n\nCara mengajukan retur:\n1. Hubungi CS via WhatsApp\n2. Kirim foto produk + nomor pesanan\n3. Tim kami akan memandu proses selanjutnya',
    quickReplies: [BTN_PAYMENT, BTN_MAIN, BTN_CS],
  },

  // ── KEAMANAN ─────────────────────────────────────────────────────────────────
  SAFETY: {
    type: 'menu',
    message: '🌿 Informasi keamanan dan efek samping produk Mamabear:',
    quickReplies: [
      { id: 'SAFETY_SIDEEFFECT', label: '⚠️ Efek Samping',         payload: 'SAFETY_SIDEEFFECT' },
      { id: 'SAFETY_PREGNANT',   label: '🤰 Untuk Ibu Hamil',      payload: 'SAFETY_PREGNANT'   },
      { id: 'SAFETY_ALLERGY',    label: '🥛 Alergi Susu',          payload: 'SAFETY_ALLERGY'    },
      { id: 'SAFETY_COMBINE',    label: '💊 Kombinasi Obat Lain',  payload: 'SAFETY_COMBINE'    },
      BTN_MAIN,
    ],
  },
  SAFETY_SIDEEFFECT: {
    type: 'answer',
    message: '⚠️ *Efek Samping Produk Mamabear*\n\nSeluruh produk berbahan alami pilihan & lulus BPOM. Jika dikonsumsi sesuai anjuran, tidak ada efek samping yang diketahui.\n\nHentikan konsumsi & konsultasi dokter jika:\n• Muncul reaksi alergi (gatal, ruam, sesak napas)\n• Gangguan pencernaan yang berlanjut',
    quickReplies: [BTN_SAFETY, BTN_MAIN],
  },
  SAFETY_PREGNANT: {
    type: 'answer',
    message: '🤰 *Produk Mamabear untuk Ibu Hamil*\n\n✅ Aman untuk bumil:\n• ZoyaMix — aman segala usia & kondisi\n• Kukis Almond Oat — camilan sehat bumil\n• Teh Pelancar ASI — boleh mulai minggu ke-38\n\n⏳ Tunggu setelah melahirkan:\n• AlmonMix\n• Kapsul ASI Booster',
    quickReplies: [BTN_SAFETY, BTN_MAIN],
  },
  SAFETY_ALLERGY: {
    type: 'answer',
    message: '🥛 *Info Alergi Susu / Lactose Intolerant*\n\n✅ Bebas susu & lactose free:\n• AlmonMix ✅\n• ZoyaMix ✅\n• Teh Pelancar ASI ✅\n• Kapsul ASI Booster ✅\n• Kukis Choco Nut ✅\n\n⚠️ Mengandung susu (hindari jika alergi):\n• Kukis Choco Chip ❌\n• Kukis Cookies & Cream ❌',
    quickReplies: [BTN_SAFETY, BTN_MAIN],
  },
  SAFETY_COMBINE: {
    type: 'answer',
    message: '💊 *Kombinasi dengan Obat / Suplemen Lain*\n\nProduk Mamabear berbahan alami, umumnya aman dikombinasikan dengan vitamin/suplemen dari dokter.\n\nSaran:\n• Beri jarak 1–2 jam dari obat resep\n• Konsultasikan ke dokter/bidan jika konsumsi obat rutin',
    quickReplies: [BTN_SAFETY, BTN_MAIN],
  },

  // ── CS ────────────────────────────────────────────────────────────────────────
  CS: {
    type: 'answer',
    message: '📞 *Kontak Customer Service Mamabear*\n\n📱 WhatsApp: +62 812-3456-7890\n📧 Email: cs@mamabear.id\n🕐 Jam Layanan: Senin–Sabtu, 08.00–17.00 WIB\n\nTim kami siap membantu!',
    quickReplies: [BTN_MAIN],
  },
};

// ── Keyword → payload map untuk input teks bebas ──────────────────────────────
const KEYWORD_MAP: [RegExp, string][] = [
  [/almonmix|almon\s?mix/,               'ALMONMIX'         ],
  [/zoyamix|zoya\s?mix/,                 'ZOYAMIX'          ],
  [/\bteh\b|pelancar\s?asi|herbal/,      'TEH'              ],
  [/kukis|kuki\b|cookies|biskuit/,       'KUKIS'            ],
  [/kapsul|capsule|mastitis/,            'KAPSUL'           ],
  [/produk|product|manfaat|benefit/,     'PRODUCT'          ],
  [/pesanan|lacak|tracking|track/,       'ORDER'            ],
  [/kirim|pengiriman|ongkir|kurir|shipping/, 'ORDER'        ],
  [/refund|retur|return\b/,              'PAYMENT_REFUND'   ],
  [/bayar|payment|pembayaran|transfer/,  'PAYMENT'          ],
  [/efek\s?samping|side\s?effect|bahaya/, 'SAFETY_SIDEEFFECT'],
  [/hamil|pregnant|bumil/,               'SAFETY_PREGNANT'  ],
  [/alergi|allergy|lactose/,             'SAFETY_ALLERGY'   ],
  [/\bfaq\b|pertanyaan\s+umum/,          'FAQ'              ],
  [/\bcs\b|whatsapp|\bwa\b|kontak|hubungi|contact/, 'CS'   ],
  [/halo|hai\b|\bhi\b|hello|selamat|mulai|start|\bmenu\b/, 'MAIN'],
];

@Injectable()
export class ChatbotService {
  constructor(private prisma: PrismaService) {}

  /** Initial greeting — call on chat open */
  getStart(): ChatbotResponse {
    return NODES['MAIN']!;
  }

  /** Process a payload (button click) or free-text message */
  async respond(message?: string, payload?: string): Promise<ChatbotResponse> {
    // 1. Explicit payload from button click
    const key = (payload ?? '').trim().toUpperCase();
    if (key) {
      // Dynamic FAQ list
      if (key === 'FAQ') return this.buildFaqMenu();
      // Specific FAQ item: "FAQ_<id>"
      if (key.startsWith('FAQ_')) return this.buildFaqAnswer(key.slice(4));
      // Static node
      if (NODES[key]) return NODES[key]!;
    }

    // 2. Free-text keyword matching
    if (message) {
      const q = message.toLowerCase().trim();

      // Special greet / short inputs → main menu
      if (q.length <= 3) return NODES['MAIN']!;

      for (const [regex, target] of KEYWORD_MAP) {
        if (regex.test(q)) {
          if (target === 'FAQ') return this.buildFaqMenu();
          return NODES[target] ?? this.fallback();
        }
      }

      // Try FAQ question matching
      const faqs = await this.prisma.faq.findMany({ where: { isActive: true } });
      const matched = faqs.find((f) =>
        f.question.toLowerCase().split(/\s+/).some((w) => w.length > 3 && q.includes(w)),
      );
      if (matched) {
        return {
          type: 'faq',
          message: `❓ *${matched.question}*\n\n${matched.answer}`,
          quickReplies: [
            { id: 'FAQ', label: '📋 Pertanyaan Lain', payload: 'FAQ' },
            BTN_MAIN,
          ],
        };
      }
    }

    return this.fallback();
  }

  private async buildFaqMenu(): Promise<ChatbotResponse> {
    const faqs = await this.prisma.faq.findMany({ where: { isActive: true }, take: 8, orderBy: { createdAt: 'asc' } });
    return {
      type: 'menu',
      message: '📋 Pilih pertanyaan yang ingin kamu lihat jawabannya:',
      quickReplies: [
        ...faqs.map((f) => ({ id: `FAQ_${f.id}`, label: f.question.substring(0, 40), payload: `FAQ_${f.id}` })),
        BTN_MAIN,
      ],
    };
  }

  private async buildFaqAnswer(faqId: string): Promise<ChatbotResponse> {
    const faq = await this.prisma.faq.findUnique({ where: { id: faqId } });
    if (!faq) return this.fallback();
    return {
      type: 'faq',
      message: `❓ *${faq.question}*\n\n${faq.answer}`,
      quickReplies: [
        { id: 'FAQ', label: '📋 Pertanyaan Lain', payload: 'FAQ' },
        BTN_MAIN,
      ],
    };
  }

  private fallback(): ChatbotResponse {
    return {
      type: 'fallback',
      message: 'Maaf, saya belum bisa menjawab pertanyaan tersebut. 🙏\n\nCoba pilih topik dari menu di bawah, atau hubungi CS kami untuk bantuan lebih lanjut.',
      quickReplies: [BTN_MAIN, BTN_CS],
    };
  }
}
