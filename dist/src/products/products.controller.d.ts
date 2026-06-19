import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(query: ProductQueryDto): Promise<{}>;
    findBestSellers(limit?: string): Promise<{}>;
    findBySlug(slug: string): Promise<any>;
    findAllNameAndId(query: ProductQueryDto): Promise<{}>;
    findAllVariants(page?: string, limit?: string, productId?: string): Promise<{
        data: ({
            product: {
                id: string;
                name: string;
                slug: string;
                category: {
                    id: string;
                    name: string;
                    slug: string;
                } | null;
                stock: number;
                images: {
                    imageUrl: string;
                }[];
            };
        } & {
            id: string;
            imageUrl: string | null;
            altText: string | null;
            isActive: boolean;
            sortOrder: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            productId: string;
            value: string;
            basePrice: import("@prisma/client-runtime-utils").Decimal;
            discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
            priceAdjustment: import("@prisma/client-runtime-utils").Decimal;
            stock: number;
            reservedStock: number;
            weight: number | null;
            sku: string | null;
        })[];
        meta: {
            page: number;
            limit: number;
            totalItems: number;
            totalPages: number;
        };
    }>;
    create(dto: CreateProductDto): Promise<{
        category: {
            id: string;
            imageUrl: string | null;
            isActive: boolean;
            sortOrder: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            slug: string;
            parentId: string | null;
            description: string | null;
        } | null;
        images: {
            id: string;
            imageUrl: string;
            altText: string | null;
            sortOrder: number;
            createdAt: Date;
            updatedAt: Date;
            productId: string;
            publicId: string | null;
            imageType: import("generated/prisma/enums").ImageType;
            isFeatured: boolean;
        }[];
        variants: {
            id: string;
            imageUrl: string | null;
            altText: string | null;
            isActive: boolean;
            sortOrder: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            productId: string;
            value: string;
            basePrice: import("@prisma/client-runtime-utils").Decimal;
            discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
            priceAdjustment: import("@prisma/client-runtime-utils").Decimal;
            stock: number;
            reservedStock: number;
            weight: number | null;
            sku: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        status: import("generated/prisma/enums").ProductStatus;
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
    }>;
    bulkUpdate(body: {
        productIds: string[];
        status?: string;
        price?: number;
    }): Promise<{
        success: boolean;
        updated: number;
    }>;
    findOne(id: string): Promise<any>;
    update(id: string, dto: UpdateProductDto): Promise<{
        category: {
            id: string;
            imageUrl: string | null;
            isActive: boolean;
            sortOrder: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            slug: string;
            parentId: string | null;
            description: string | null;
        } | null;
        images: {
            id: string;
            imageUrl: string;
            altText: string | null;
            sortOrder: number;
            createdAt: Date;
            updatedAt: Date;
            productId: string;
            publicId: string | null;
            imageType: import("generated/prisma/enums").ImageType;
            isFeatured: boolean;
        }[];
        variants: {
            id: string;
            imageUrl: string | null;
            altText: string | null;
            isActive: boolean;
            sortOrder: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            productId: string;
            value: string;
            basePrice: import("@prisma/client-runtime-utils").Decimal;
            discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
            priceAdjustment: import("@prisma/client-runtime-utils").Decimal;
            stock: number;
            reservedStock: number;
            weight: number | null;
            sku: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        status: import("generated/prisma/enums").ProductStatus;
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
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        status: import("generated/prisma/enums").ProductStatus;
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
    }>;
}
