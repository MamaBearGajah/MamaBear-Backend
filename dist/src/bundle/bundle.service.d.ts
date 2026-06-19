import { PrismaService } from '../prisma/prisma.service';
import { CreateBundleDto } from './dto/create-bundle.dto';
declare const UpdateBundleDto_base: import("@nestjs/common").Type<Partial<CreateBundleDto>>;
export declare class UpdateBundleDto extends UpdateBundleDto_base {
}
export declare class BundleService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private readonly include;
    findAll(onlyActive?: boolean): Promise<({
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
                mainImage: string;
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
    findOne(id: string): Promise<{
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
                mainImage: string;
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
    findBySlug(slug: string): Promise<{
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
                mainImage: string;
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
                mainImage: string;
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
                mainImage: string;
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
export {};
