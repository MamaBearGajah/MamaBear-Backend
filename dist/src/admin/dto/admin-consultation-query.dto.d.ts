import { ConsultationStatus } from '../../../generated/prisma/client';
export declare class AdminConsultationQueryDto {
    page?: number;
    limit?: number;
    status?: ConsultationStatus;
}
export declare class UpdateConsultationStatusDto {
    status: ConsultationStatus;
    response?: string;
}
