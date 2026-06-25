import { ConsultationsService } from './consultations.service';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { ConsultationQueryDto } from './dto/consultation-query.dto';
export declare class ConsultationsController {
    private readonly consultationsService;
    constructor(consultationsService: ConsultationsService);
    create(dto: CreateConsultationDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        status: import("generated/prisma/enums").ConsultationStatus;
        email: string;
        phone: string | null;
        message: string;
        response: string | null;
        respondedBy: string | null;
        respondedAt: Date | null;
    }>;
    findAll(query: ConsultationQueryDto): Promise<{
        data: ({
            admin: {
                id: string;
                name: string;
                email: string;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            status: import("generated/prisma/enums").ConsultationStatus;
            email: string;
            phone: string | null;
            message: string;
            response: string | null;
            respondedBy: string | null;
            respondedAt: Date | null;
        })[];
        meta: {
            page: number;
            limit: number;
            totalItems: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        admin: {
            id: string;
            name: string;
            email: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        status: import("generated/prisma/enums").ConsultationStatus;
        email: string;
        phone: string | null;
        message: string;
        response: string | null;
        respondedBy: string | null;
        respondedAt: Date | null;
    }>;
    update(id: string, dto: UpdateConsultationDto, adminId: string, { id: string }: {
        id: any;
    }): Promise<{
        admin: {
            id: string;
            name: string;
            email: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        status: import("generated/prisma/enums").ConsultationStatus;
        email: string;
        phone: string | null;
        message: string;
        response: string | null;
        respondedBy: string | null;
        respondedAt: Date | null;
    }>;
}
