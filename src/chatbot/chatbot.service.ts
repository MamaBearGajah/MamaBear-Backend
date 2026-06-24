import { Injectable } from '@nestjs/common';
import { FaqService } from '../faq/faq.service';
import { ChatbotQueryDto } from './dto/chatbot-query.dto';

const DEFAULT_MESSAGE =
  'Maaf, saya tidak menemukan jawaban yang sesuai. Silakan hubungi tim kami melalui WhatsApp untuk bantuan lebih lanjut.';

/**
 * Stopwords Indonesia yang tidak berkontribusi ke matching.
 * Kata-kata ini terlalu umum dan menyebabkan false positive.
 */
const STOPWORDS = new Set([
  'apa', 'saja', 'yang', 'ada', 'bisa', 'untuk', 'dari', 'dengan',
  'atau', 'dan', 'ini', 'itu', 'juga', 'sudah', 'belum', 'apakah',
  'bagaimana', 'berapa', 'siapa', 'kapan', 'dimana', 'kenapa', 'mengapa',
  'halo', 'hello', 'hai', 'selamat', 'tolong', 'mohon', 'tanya', 'tanyakan',
  'boleh', 'mau', 'ingin', 'saya', 'kami', 'kamu', 'anda', 'kita',
  'tidak', 'bukan', 'jangan', 'punya', 'dapat', 'mana', 'dong', 'yuk',
  'ya', 'iya', 'okay', 'oke', 'yah', 'lama', 'lagi', 'mana', 'sama',
]);

function extractKeywords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter((word) => word.length > 2 && !STOPWORDS.has(word));
}

/**
 * Hitung skor relevansi sebuah FAQ terhadap daftar keyword.
 * - Match di question → bobot 3x
 * - Match di answer → bobot 1x
 * Skor total = jumlah keyword yang match × bobot
 */
function scoreFaq(
  faq: { question: string; answer: string },
  keywords: string[],
): number {
  const q = faq.question.toLowerCase();
  const a = faq.answer.toLowerCase();
  let score = 0;

  for (const kw of keywords) {
    if (q.includes(kw)) score += 3; // match di question lebih penting
    else if (a.includes(kw)) score += 1;
  }

  return score;
}

@Injectable()
export class ChatbotService {
  constructor(private readonly faqService: FaqService) {}

  async query(dto: ChatbotQueryDto) {
    const { message } = dto;
    const keywords = extractKeywords(message);

    // Kalau tidak ada keyword bermakna (misal: "halo", "oke", dll)
    if (keywords.length === 0) {
      const topFaqs = await this.faqService.findTopFaqs();
      return {
        reply: 'Halo! Ada yang bisa saya bantu? Silakan tanyakan seputar produk, pengiriman, atau pembayaran Mamabear.',
        suggestedFaqIds: topFaqs.map((f) => f.id),
      };
    }

    // Ambil semua FAQ aktif sekali saja (lebih efisien daripada N query)
    const allFaqs = await this.faqService.findAll();

    // Scoring semua FAQ
    const scored = allFaqs
      .map((faq) => ({ faq, score: scoreFaq(faq, keywords) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score);

    if (scored.length > 0) {
      const topMatch = scored[0].faq;
      const suggestedFaqs = scored.slice(0, 3).map(({ faq }) => faq);

      return {
        reply: topMatch.answer,
        suggestedFaqIds: suggestedFaqs.map((f) => f.id),
      };
    }

    // Tidak ada yang match → fallback dengan pesan default + top FAQ
    const topFaqs = await this.faqService.findTopFaqs();
    return {
      reply: DEFAULT_MESSAGE,
      suggestedFaqIds: topFaqs.map((f) => f.id),
    };
  }
}