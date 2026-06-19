import { PrismaService } from '../../prisma/prisma.service';
import { CacheService } from '../../cache/cache.service';
import { CreateVariantDto } from '../dto/create-variant.dto';
import { UpdateVariantDto } from '../dto/update-variant.dto';
import { UpdateVariantImagesBatchDto } from '../dto/update-batch-variant-images.dto';
export declare class VariantsService {
    private readonly prisma;
    private readonly cache;
    constructor(prisma: PrismaService, cache: CacheService);
    private syncProductStock;
    private withComputedFields;
    findVariants(productId: string): Promise<unknown[]>;
    findOneVariant(productId: string, variantId: string): Promise<{
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
    } & {
        effectivePrice: any;
        availableStock: number;
    }>;
    addVariant(productId: string, dto: CreateVariantDto): Promise<{
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
    } & {
        effectivePrice: any;
        availableStock: number;
    }>;
    updateVariant(productId: string, variantId: string, dto: UpdateVariantDto): Promise<{
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
    } & {
        effectivePrice: any;
        availableStock: number;
    }>;
    removeVariant(productId: string, variantId: string): Promise<{
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
    }>;
    setVariantImage(productId: string, variantId: string, imageUrl: string): Promise<{
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
    }>;
    deleteVariantImage(productId: string, variantId: string): Promise<{
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
    }>;
    batchUpdateVariantImages(productId: string, dto: UpdateVariantImagesBatchDto): Promise<import("../../../generated/prisma/internal/prismaNamespace").BatchPayload[]>;
}
