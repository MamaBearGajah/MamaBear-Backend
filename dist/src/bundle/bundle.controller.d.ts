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
                    createdAt: Date;
                    updatedAt: Date;
                    imageUrl: string;
                    altText: string | null;
                    sortOrder: number;
                    productId: string;
                    publicId: string | null;
                    imageType: import("../../generated/prisma/enums").ImageType;
                    isFeatured: boolean;
                }[];
            } & {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                notes: string | null;
                slug: string;
                description: string | null;
                categoryId: string | null;
                basePrice: import("@prisma/client-runtime-utils").Decimal;
                discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
                weight: number;
                sku: string;
                stock: number;
                reservedStock: number;
                soldCount: number;
                status: import("../../generated/prisma/enums").ProductStatus;
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
        name: string;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string | null;
        isActive: boolean;
        sortOrder: number;
        startDate: Date | null;
        endDate: Date | null;
        slug: string;
        description: string | null;
        discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
        stock: number;
        soldCount: number;
        publicId: string | null;
        bundlePrice: import("@prisma/client-runtime-utils").Decimal;
    })[]>;
    getBySlug(slug: string): Promise<{
        items: ({
            product: {
                images: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    imageUrl: string;
                    altText: string | null;
                    sortOrder: number;
                    productId: string;
                    publicId: string | null;
                    imageType: import("../../generated/prisma/enums").ImageType;
                    isFeatured: boolean;
                }[];
            } & {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                notes: string | null;
                slug: string;
                description: string | null;
                categoryId: string | null;
                basePrice: import("@prisma/client-runtime-utils").Decimal;
                discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
                weight: number;
                sku: string;
                stock: number;
                reservedStock: number;
                soldCount: number;
                status: import("../../generated/prisma/enums").ProductStatus;
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
        name: string;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string | null;
        isActive: boolean;
        sortOrder: number;
        startDate: Date | null;
        endDate: Date | null;
        slug: string;
        description: string | null;
        discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
        stock: number;
        soldCount: number;
        publicId: string | null;
        bundlePrice: import("@prisma/client-runtime-utils").Decimal;
    }>;
    findAll(): Promise<({
        items: ({
            product: {
                images: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    imageUrl: string;
                    altText: string | null;
                    sortOrder: number;
                    productId: string;
                    publicId: string | null;
                    imageType: import("../../generated/prisma/enums").ImageType;
                    isFeatured: boolean;
                }[];
            } & {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                notes: string | null;
                slug: string;
                description: string | null;
                categoryId: string | null;
                basePrice: import("@prisma/client-runtime-utils").Decimal;
                discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
                weight: number;
                sku: string;
                stock: number;
                reservedStock: number;
                soldCount: number;
                status: import("../../generated/prisma/enums").ProductStatus;
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
        name: string;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string | null;
        isActive: boolean;
        sortOrder: number;
        startDate: Date | null;
        endDate: Date | null;
        slug: string;
        description: string | null;
        discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
        stock: number;
        soldCount: number;
        publicId: string | null;
        bundlePrice: import("@prisma/client-runtime-utils").Decimal;
    })[]>;
    create(dto: CreateBundleDto): Promise<{
        items: ({
            product: {
                images: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    imageUrl: string;
                    altText: string | null;
                    sortOrder: number;
                    productId: string;
                    publicId: string | null;
                    imageType: import("../../generated/prisma/enums").ImageType;
                    isFeatured: boolean;
                }[];
            } & {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                notes: string | null;
                slug: string;
                description: string | null;
                categoryId: string | null;
                basePrice: import("@prisma/client-runtime-utils").Decimal;
                discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
                weight: number;
                sku: string;
                stock: number;
                reservedStock: number;
                soldCount: number;
                status: import("../../generated/prisma/enums").ProductStatus;
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
        name: string;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string | null;
        isActive: boolean;
        sortOrder: number;
        startDate: Date | null;
        endDate: Date | null;
        slug: string;
        description: string | null;
        discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
        stock: number;
        soldCount: number;
        publicId: string | null;
        bundlePrice: import("@prisma/client-runtime-utils").Decimal;
    }>;
    update(id: string, dto: UpdateBundleDto): Promise<{
        items: ({
            product: {
                images: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    imageUrl: string;
                    altText: string | null;
                    sortOrder: number;
                    productId: string;
                    publicId: string | null;
                    imageType: import("../../generated/prisma/enums").ImageType;
                    isFeatured: boolean;
                }[];
            } & {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                notes: string | null;
                slug: string;
                description: string | null;
                categoryId: string | null;
                basePrice: import("@prisma/client-runtime-utils").Decimal;
                discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
                weight: number;
                sku: string;
                stock: number;
                reservedStock: number;
                soldCount: number;
                status: import("../../generated/prisma/enums").ProductStatus;
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
        name: string;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string | null;
        isActive: boolean;
        sortOrder: number;
        startDate: Date | null;
        endDate: Date | null;
        slug: string;
        description: string | null;
        discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
        stock: number;
        soldCount: number;
        publicId: string | null;
        bundlePrice: import("@prisma/client-runtime-utils").Decimal;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
