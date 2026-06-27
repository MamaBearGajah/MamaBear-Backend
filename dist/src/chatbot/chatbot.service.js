"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatbotService = void 0;
const common_1 = require("@nestjs/common");
const faq_service_1 = require("../faq/faq.service");
const DEFAULT_MESSAGE = 'Maaf, saya tidak menemukan jawaban yang sesuai. Silakan hubungi tim kami melalui WhatsApp untuk bantuan lebih lanjut.';
const STOPWORDS = new Set([
    'apa', 'saja', 'yang', 'ada', 'bisa', 'untuk', 'dari', 'dengan',
    'atau', 'dan', 'ini', 'itu', 'juga', 'sudah', 'belum', 'apakah',
    'bagaimana', 'berapa', 'siapa', 'kapan', 'dimana', 'kenapa', 'mengapa',
    'halo', 'hello', 'hai', 'selamat', 'tolong', 'mohon', 'tanya', 'tanyakan',
    'boleh', 'mau', 'ingin', 'saya', 'kami', 'kamu', 'anda', 'kita',
    'tidak', 'bukan', 'jangan', 'punya', 'dapat', 'mana', 'dong', 'yuk',
    'ya', 'iya', 'okay', 'oke', 'yah', 'lama', 'lagi', 'mana', 'sama',
]);
function extractKeywords(text) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .split(/\s+/)
        .filter((word) => word.length > 2 && !STOPWORDS.has(word));
}
function scoreFaq(faq, keywords) {
    const q = faq.question.toLowerCase();
    const a = faq.answer.toLowerCase();
    let score = 0;
    for (const kw of keywords) {
        if (q.includes(kw))
            score += 3;
        else if (a.includes(kw))
            score += 1;
    }
    return score;
}
let ChatbotService = class ChatbotService {
    faqService;
    constructor(faqService) {
        this.faqService = faqService;
    }
    async query(dto) {
        const { message } = dto;
        const keywords = extractKeywords(message);
        if (keywords.length === 0) {
            const topFaqs = await this.faqService.findTopFaqs();
            return {
                answer: 'Halo! Ada yang bisa saya bantu? Silakan tanyakan seputar produk, pengiriman, atau pembayaran Mamabear.',
                suggestedFaqIds: topFaqs.map((f) => f.id),
            };
        }
        const allFaqs = await this.faqService.findAll();
        const scored = allFaqs
            .map((faq) => ({ faq, score: scoreFaq(faq, keywords) }))
            .filter(({ score }) => score > 0)
            .sort((a, b) => b.score - a.score);
        if (scored.length > 0) {
            const topMatch = scored[0].faq;
            const suggestedFaqs = scored.slice(0, 3).map(({ faq }) => faq);
            return {
                answer: topMatch.answer,
                suggestedFaqIds: suggestedFaqs.map((f) => f.id),
            };
        }
        const topFaqs = await this.faqService.findTopFaqs();
        return {
            answer: DEFAULT_MESSAGE,
            suggestedFaqIds: topFaqs.map((f) => f.id),
        };
    }
};
exports.ChatbotService = ChatbotService;
exports.ChatbotService = ChatbotService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [faq_service_1.FaqService])
], ChatbotService);
//# sourceMappingURL=chatbot.service.js.map