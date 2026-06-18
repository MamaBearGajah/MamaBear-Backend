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
const DEFAULT_MESSAGE = 'Maaf, saya tidak menemukan jawaban yang sesuai. Silakan hubungi tim kami untuk bantuan lebih lanjut.';
let ChatbotService = class ChatbotService {
    faqService;
    constructor(faqService) {
        this.faqService = faqService;
    }
    async query(dto) {
        const { message } = dto;
        const keywords = message
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .split(' ')
            .filter((word) => word.length > 3);
        let matchedFaqs = [];
        for (const keyword of keywords) {
            const results = await this.faqService.findByKeyword(keyword);
            if (results.length > 0) {
                matchedFaqs = results;
                break;
            }
        }
        if (matchedFaqs.length > 0) {
            const topMatch = matchedFaqs[0];
            return {
                reply: topMatch.answer,
                suggestedFaqIds: matchedFaqs.map((f) => f.id),
            };
        }
        const topFaqs = await this.faqService.findTopFaqs();
        return {
            reply: DEFAULT_MESSAGE,
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