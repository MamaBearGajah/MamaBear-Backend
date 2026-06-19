import { ConsultationStatus } from '../../../generated/prisma/enums';
import { PrismaService } from '../../prisma/prisma.service';
import { AdminConsultationQueryDto, UpdateConsultationStatusDto } from '../dto/admin-consultation-query.dto';
export declare class AdminConsultationsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(query: AdminConsultationQueryDto): Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            status: ConsultationStatus;
            email: string;
            phone: string | null;
            message: string;
            response: string | null;
            respondedBy: string | null;
            respondedAt: Date | null;
        }[];
        meta: {
            totalItems: number;
            itemsPerPage: number;
            totalPages: number;
            currentPage: number;
        };
    }>;
    updateStatus(id: string, adminId: string, dto: UpdateConsultationStatusDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        status: ConsultationStatus;
        email: string;
        phone: string | null;
        message: string;
        response: string | null;
        respondedBy: string | null;
        respondedAt: Date | null;
    }>;
}
