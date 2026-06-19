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
    findOne(id: string): Promise<{
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
    findBySlug(slug: string): Promise<{
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
export {};
