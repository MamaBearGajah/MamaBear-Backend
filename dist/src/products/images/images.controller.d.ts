import { ImagesService } from './images.service';
import { CreateImageDto } from '../dto/create-image.dto';
import { UpdateImageDto } from '../dto/update-image.dto';
import { ReorderImagesDto } from '../dto/reorder-images.dto';
export declare class ImagesController {
    private readonly imagesService;
    constructor(imagesService: ImagesService);
    findAll(productId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string;
        altText: string | null;
        sortOrder: number;
        productId: string;
        publicId: string | null;
        imageType: import("generated/prisma/enums").ImageType;
        isFeatured: boolean;
    }[]>;
    addImage(productId: string, dto: CreateImageDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string;
        altText: string | null;
        sortOrder: number;
        productId: string;
        publicId: string | null;
        imageType: import("generated/prisma/enums").ImageType;
        isFeatured: boolean;
    }>;
    reorder(productId: string, dto: ReorderImagesDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string;
        altText: string | null;
        sortOrder: number;
        productId: string;
        publicId: string | null;
        imageType: import("generated/prisma/enums").ImageType;
        isFeatured: boolean;
    }[]>;
    setFeatured(productId: string, imageId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string;
        altText: string | null;
        sortOrder: number;
        productId: string;
        publicId: string | null;
        imageType: import("generated/prisma/enums").ImageType;
        isFeatured: boolean;
    }>;
    updateImage(productId: string, imageId: string, dto: UpdateImageDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string;
        altText: string | null;
        sortOrder: number;
        productId: string;
        publicId: string | null;
        imageType: import("generated/prisma/enums").ImageType;
        isFeatured: boolean;
    }>;
    removeImage(productId: string, imageId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string;
        altText: string | null;
        sortOrder: number;
        productId: string;
        publicId: string | null;
        imageType: import("generated/prisma/enums").ImageType;
        isFeatured: boolean;
    }>;
}
