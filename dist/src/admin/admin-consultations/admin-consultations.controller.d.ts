import { AdminConsultationsService } from '../admin-consultations/admin-consultations.service';
import { AdminConsultationQueryDto, UpdateConsultationStatusDto } from '../dto/admin-consultation-query.dto';
export declare class AdminConsultationsController {
    private readonly adminConsultationsService;
    constructor(adminConsultationsService: AdminConsultationsService);
    getAll(query: AdminConsultationQueryDto): Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            status: import("../../../generated/prisma/enums").ConsultationStatus;
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
    updateStatus(id: string, dto: UpdateConsultationStatusDto, req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        status: import("../../../generated/prisma/enums").ConsultationStatus;
        email: string;
        phone: string | null;
        message: string;
        response: string | null;
        respondedBy: string | null;
        respondedAt: Date | null;
    }>;
}
