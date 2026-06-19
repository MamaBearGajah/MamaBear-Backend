import { BundleService, UpdateBundleDto } from './bundle.service';
import { CreateBundleDto } from './dto/create-bundle.dto';
export declare class BundleController {
    private readonly bundleService;
    constructor(bundleService: BundleService);
    getActive(): Promise<({
        items: ({
            product: {
                images: {
                    id: string;
                    imageUrl: string;
                    altText: string | null;
                    sortOrder: number;
                    createdAt: Date;
                    updatedAt: Date;
                    productId: string;
                    publicId: string | null;
                    imageType: import("../../generated/prisma/enums").ImageType;
                    isFeatured: boolean;
                }[];
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                slug: string;
                status: import("../../generated/prisma/enums").ProductStatus;
                description: string | null;
                deletedAt: Date | null;
                notes: string | null;
                basePrice: import("@prisma/client-runtime-utils").Decimal;
                discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
                stock: number;
                reservedStock: number;
                weight: number;
                sku: string;
                categoryId: string | null;
                mainImage: string;
                soldCount: number;
                avgRating: import("@prisma/client-runtime-utils").Decimal | null;
                reviewCount: number;
            };
        } & {
            id: string;
            productId: string;
            bundleId: string;
            quantity: number;
        })[];
    } & {
        id: string;
        imageUrl: string | null;
        isActive: boolean;
        sortOrder: number;
        startDate: Date | null;
        endDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        description: string | null;
        discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
        stock: number;
        publicId: string | null;
        soldCount: number;
        bundlePrice: import("@prisma/client-runtime-utils").Decimal;
    })[]>;
    getBySlug(slug: string): Promise<{
        items: ({
            product: {
                images: {
                    id: string;
                    imageUrl: string;
                    altText: string | null;
                    sortOrder: number;
                    createdAt: Date;
                    updatedAt: Date;
                    productId: string;
                    publicId: string | null;
                    imageType: import("../../generated/prisma/enums").ImageType;
                    isFeatured: boolean;
                }[];
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                slug: string;
                status: import("../../generated/prisma/enums").ProductStatus;
                description: string | null;
                deletedAt: Date | null;
                notes: string | null;
                basePrice: import("@prisma/client-runtime-utils").Decimal;
                discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
                stock: number;
                reservedStock: number;
                weight: number;
                sku: string;
                categoryId: string | null;
                mainImage: string;
                soldCount: number;
                avgRating: import("@prisma/client-runtime-utils").Decimal | null;
                reviewCount: number;
            };
        } & {
            id: string;
            productId: string;
            bundleId: string;
            quantity: number;
        })[];
    } & {
        id: string;
        imageUrl: string | null;
        isActive: boolean;
        sortOrder: number;
        startDate: Date | null;
        endDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        description: string | null;
        discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
        stock: number;
        publicId: string | null;
        soldCount: number;
        bundlePrice: import("@prisma/client-runtime-utils").Decimal;
    }>;
    findAll(): Promise<({
        items: ({
            product: {
                images: {
                    id: string;
                    imageUrl: string;
                    altText: string | null;
                    sortOrder: number;
                    createdAt: Date;
                    updatedAt: Date;
                    productId: string;
                    publicId: string | null;
                    imageType: import("../../generated/prisma/enums").ImageType;
                    isFeatured: boolean;
                }[];
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                slug: string;
                status: import("../../generated/prisma/enums").ProductStatus;
                description: string | null;
                deletedAt: Date | null;
                notes: string | null;
                basePrice: import("@prisma/client-runtime-utils").Decimal;
                discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
                stock: number;
                reservedStock: number;
                weight: number;
                sku: string;
                categoryId: string | null;
                mainImage: string;
                soldCount: number;
                avgRating: import("@prisma/client-runtime-utils").Decimal | null;
                reviewCount: number;
            };
        } & {
            id: string;
            productId: string;
            bundleId: string;
            quantity: number;
        })[];
    } & {
        id: string;
        imageUrl: string | null;
        isActive: boolean;
        sortOrder: number;
        startDate: Date | null;
        endDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        description: string | null;
        discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
        stock: number;
        publicId: string | null;
        soldCount: number;
        bundlePrice: import("@prisma/client-runtime-utils").Decimal;
    })[]>;
    create(dto: CreateBundleDto): Promise<{
        items: ({
            product: {
                images: {
                    id: string;
                    imageUrl: string;
                    altText: string | null;
                    sortOrder: number;
                    createdAt: Date;
                    updatedAt: Date;
                    productId: string;
                    publicId: string | null;
                    imageType: import("../../generated/prisma/enums").ImageType;
                    isFeatured: boolean;
                }[];
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                slug: string;
                status: import("../../generated/prisma/enums").ProductStatus;
                description: string | null;
                deletedAt: Date | null;
                notes: string | null;
                basePrice: import("@prisma/client-runtime-utils").Decimal;
                discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
                stock: number;
                reservedStock: number;
                weight: number;
                sku: string;
                categoryId: string | null;
                mainImage: string;
                soldCount: number;
                avgRating: import("@prisma/client-runtime-utils").Decimal | null;
                reviewCount: number;
            };
        } & {
            id: string;
            productId: string;
            bundleId: string;
            quantity: number;
        })[];
    } & {
        id: string;
        imageUrl: string | null;
        isActive: boolean;
        sortOrder: number;
        startDate: Date | null;
        endDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        description: string | null;
        discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
        stock: number;
        publicId: string | null;
        soldCount: number;
        bundlePrice: import("@prisma/client-runtime-utils").Decimal;
    }>;
    update(id: string, dto: UpdateBundleDto): Promise<{
        items: ({
            product: {
                images: {
                    id: string;
                    imageUrl: string;
                    altText: string | null;
                    sortOrder: number;
                    createdAt: Date;
                    updatedAt: Date;
                    productId: string;
                    publicId: string | null;
                    imageType: import("../../generated/prisma/enums").ImageType;
                    isFeatured: boolean;
                }[];
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                slug: string;
                status: import("../../generated/prisma/enums").ProductStatus;
                description: string | null;
                deletedAt: Date | null;
                notes: string | null;
                basePrice: import("@prisma/client-runtime-utils").Decimal;
                discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
                stock: number;
                reservedStock: number;
                weight: number;
                sku: string;
                categoryId: string | null;
                mainImage: string;
                soldCount: number;
                avgRating: import("@prisma/client-runtime-utils").Decimal | null;
                reviewCount: number;
            };
        } & {
            id: string;
            productId: string;
            bundleId: string;
            quantity: number;
        })[];
    } & {
        id: string;
        imageUrl: string | null;
        isActive: boolean;
        sortOrder: number;
        startDate: Date | null;
        endDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        description: string | null;
        discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
        stock: number;
        publicId: string | null;
        soldCount: number;
        bundlePrice: import("@prisma/client-runtime-utils").Decimal;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
