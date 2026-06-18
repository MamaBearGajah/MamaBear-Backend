import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
export declare class ConsultationsService {
    create(createConsultationDto: CreateConsultationDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateConsultationDto: UpdateConsultationDto): string;
    remove(id: number): string;
}
