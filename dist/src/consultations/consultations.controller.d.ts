import { ConsultationsService } from './consultations.service';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
export declare class ConsultationsController {
    private readonly consultationsService;
    constructor(consultationsService: ConsultationsService);
    create(createConsultationDto: CreateConsultationDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateConsultationDto: UpdateConsultationDto): string;
    remove(id: string): string;
}
