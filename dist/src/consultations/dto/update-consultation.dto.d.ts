declare enum ConsultationStatus {
    new = "new",
    in_progress = "in_progress",
    closed = "closed"
}
export declare class UpdateConsultationDto {
    status: ConsultationStatus;
}
export {};
