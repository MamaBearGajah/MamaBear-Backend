import { PrismaService } from '../prisma/prisma.service';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { ConsultationQueryDto } from './dto/consultation-query.dto';
export declare class ConsultationsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateConsultationDto): Promise<{
        id: string;
        name: string;
        email: string;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        status: import("generated/prisma/client").ConsultationStatus;
        message: string;
        respondedBy: string | null;
        response: string | null;
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
            name: string;
            email: string;
            phone: string | null;
            createdAt: Date;
            updatedAt: Date;
            status: import("generated/prisma/client").ConsultationStatus;
            message: string;
            respondedBy: string | null;
            response: string | null;
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
        name: string;
        email: string;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        status: import("generated/prisma/client").ConsultationStatus;
        message: string;
        respondedBy: string | null;
        response: string | null;
        respondedAt: Date | null;
    }>;
    updateStatus(id: string, dto: UpdateConsultationDto, adminId: string): Promise<{
        admin: {
            id: string;
            name: string;
            email: string;
        } | null;
    } & {
        id: string;
        name: string;
        email: string;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        status: import("generated/prisma/client").ConsultationStatus;
        message: string;
        respondedBy: string | null;
        response: string | null;
        respondedAt: Date | null;
    }>;
}
