import { ChatbotService } from './chatbot.service';
import { ChatbotQueryDto } from './dto/chatbot-query.dto';
export declare class ChatbotController {
    private readonly chatbotService;
    constructor(chatbotService: ChatbotService);
    query(dto: ChatbotQueryDto): Promise<{
        reply: any;
        suggestedFaqIds: any[];
    }>;
}
