import { FaqService } from './faq.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
export declare class FaqController {
    private readonly faqService;
    constructor(faqService: FaqService);
    findAll(): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        question: string;
        answer: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        question: string;
        answer: string;
    }>;
    create(dto: CreateFaqDto): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        question: string;
        answer: string;
    }>;
    update(id: string, dto: UpdateFaqDto): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        question: string;
        answer: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        question: string;
        answer: string;
    }>;
}
