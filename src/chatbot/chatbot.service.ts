import { Injectable } from '@nestjs/common';
import { FaqService } from '../faq/faq.service';
import { ChatbotQueryDto } from './dto/chatbot-query.dto';

const DEFAULT_MESSAGE = 'Maaf, saya tidak menemukan jawaban yang sesuai. Silakan hubungi tim kami untuk bantuan lebih lanjut.';

@Injectable()
export class ChatbotService {
  constructor(private readonly faqService: FaqService) {}

  async query(dto: ChatbotQueryDto) {
    const { message } = dto;

    const keywords = message
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(' ')
      .filter((word) => word.length > 3);

    let matchedFaqs: any[] = [];
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
}