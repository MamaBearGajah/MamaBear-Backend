import { ImageType } from "../../../generated/prisma/enums";
export declare class CreateImageDto {
    imageUrl: string;
    imageType: ImageType;
    altText?: string;
    sortOrder?: number;
    isFeatured?: boolean;
}
