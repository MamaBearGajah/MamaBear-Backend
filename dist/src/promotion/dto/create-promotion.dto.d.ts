export declare enum PromotionStatus {
    draft = "draft",
    active = "active",
    ended = "ended"
}
export declare class CreatePromotionSectionDto {
    title: string;
    subtitle?: string;
    sortOrder?: number;
    isActive?: boolean;
}
export declare class CreatePromotionBenefitDto {
    icon?: string;
    title: string;
    description: string;
    sortOrder?: number;
}
export declare class CreatePromotionDto {
    title: string;
    slug: string;
    subtitle?: string;
    description?: string;
    badgeText?: string;
    startDate?: string;
    endDate?: string;
    status?: PromotionStatus;
    heroBundleId?: string;
    sections?: CreatePromotionSectionDto[];
    benefits?: CreatePromotionBenefitDto[];
}
declare const UpdatePromotionDto_base: import("@nestjs/common").Type<Partial<CreatePromotionDto>>;
export declare class UpdatePromotionDto extends UpdatePromotionDto_base {
}
export {};
