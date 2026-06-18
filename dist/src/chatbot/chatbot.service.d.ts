import { FaqService } from '../faq/faq.service';
import { ChatbotQueryDto } from './dto/chatbot-query.dto';
export declare class ChatbotService {
    private readonly faqService;
    constructor(faqService: FaqService);
    query(dto: ChatbotQueryDto): Promise<{
        reply: any;
        suggestedFaqIds: any[];
    }>;
}
