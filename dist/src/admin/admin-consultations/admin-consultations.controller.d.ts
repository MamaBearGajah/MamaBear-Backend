import { AdminConsultationsService } from '../admin-consultations/admin-consultations.service';
import { AdminConsultationQueryDto, UpdateConsultationStatusDto } from '../dto/admin-consultation-query.dto';
export declare class AdminConsultationsController {
    private readonly adminConsultationsService;
    constructor(adminConsultationsService: AdminConsultationsService);
    getAll(query: AdminConsultationQueryDto): Promise<{
        data: {
            id: string;
            name: string;
            email: string;
            phone: string | null;
            createdAt: Date;
            updatedAt: Date;
            status: import("../../../generated/prisma/enums").ConsultationStatus;
            message: string;
            respondedBy: string | null;
            response: string | null;
            respondedAt: Date | null;
        }[];
        meta: {
            totalItems: number;
            itemsPerPage: number;
            totalPages: number;
            currentPage: number;
        };
    }>;
    updateStatus(id: string, dto: UpdateConsultationStatusDto, req: any): Promise<{
        id: string;
        name: string;
        email: string;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../../generated/prisma/enums").ConsultationStatus;
        message: string;
        respondedBy: string | null;
        response: string | null;
        respondedAt: Date | null;
    }>;
}
