import { ConsultationStatus } from "../../../generated/prisma/enums";
export declare class ConsultationQueryDto {
    page?: number;
    limit?: number;
    status?: ConsultationStatus;
    search?: string;
}
