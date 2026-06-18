import { PrismaService } from '../prisma/prisma.service';
import { CacheService } from '../cache/cache.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
export declare class ProductsService {
    private prisma;
    private cache;
    constructor(prisma: PrismaService, cache: CacheService);
    private slugify;
    private withAvailableStock;
    syncProductStock(productId: string): Promise<void>;
    reserveStock(items: {
        productId: string;
        variantId?: string;
        quantity: number;
    }[]): Promise<void>;
    confirmStockDeduction(items: {
        productId: string;
        variantId?: string;
        quantity: number;
    }[]): Promise<void>;
    releaseReservation(items: {
        productId: string;
        variantId?: string;
        quantity: number;
    }[]): Promise<void>;
    findAll(query: ProductQueryDto): Promise<{}>;
    findBestSellers(limit?: number): Promise<{}>;
    create(dto: CreateProductDto): Promise<{
        category: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            imageUrl: string | null;
            isActive: boolean;
            sortOrder: number;
            parentId: string | null;
            slug: string;
            description: string | null;
        } | null;
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
        variants: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            imageUrl: string | null;
            altText: string | null;
            isActive: boolean;
            sortOrder: number;
            basePrice: import("@prisma/client-runtime-utils").Decimal;
            discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
            weight: number | null;
            sku: string | null;
            stock: number;
            reservedStock: number;
            productId: string;
            value: string;
            priceAdjustment: import("@prisma/client-runtime-utils").Decimal;
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
    }>;
    findOne(id: string): Promise<any>;
    findBySlug(slug: string): Promise<any>;
    update(id: string, dto: UpdateProductDto): Promise<{
        category: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            imageUrl: string | null;
            isActive: boolean;
            sortOrder: number;
            parentId: string | null;
            slug: string;
            description: string | null;
        } | null;
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
        variants: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            imageUrl: string | null;
            altText: string | null;
            isActive: boolean;
            sortOrder: number;
            basePrice: import("@prisma/client-runtime-utils").Decimal;
            discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
            weight: number | null;
            sku: string | null;
            stock: number;
            reservedStock: number;
            productId: string;
            value: string;
            priceAdjustment: import("@prisma/client-runtime-utils").Decimal;
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
    }>;
    remove(id: string): Promise<{
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
    }>;
    findAllVariants(query: {
        page?: number;
        limit?: number;
        productId?: string;
    }): Promise<{
        data: ({
            product: {
                id: string;
                name: string;
                slug: string;
                stock: number;
                category: {
                    id: string;
                    name: string;
                    slug: string;
                } | null;
                images: {
                    imageUrl: string;
                }[];
            };
        } & {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            imageUrl: string | null;
            altText: string | null;
            isActive: boolean;
            sortOrder: number;
            basePrice: import("@prisma/client-runtime-utils").Decimal;
            discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
            weight: number | null;
            sku: string | null;
            stock: number;
            reservedStock: number;
            productId: string;
            value: string;
            priceAdjustment: import("@prisma/client-runtime-utils").Decimal;
        })[];
        meta: {
            page: number;
            limit: number;
            totalItems: number;
            totalPages: number;
        };
    }>;
    findAllNameAndId(query: ProductQueryDto): Promise<{}>;
    private invalidateProductCache;
}
