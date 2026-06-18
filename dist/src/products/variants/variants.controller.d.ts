import { VariantsService } from './variants.service';
import { CreateVariantDto } from '../dto/create-variant.dto';
import { UpdateVariantDto } from '../dto/update-variant.dto';
import { UpdateVariantImagesBatchDto } from '../dto/update-batch-variant-images.dto';
export declare class VariantsController {
    private readonly variantsService;
    constructor(variantsService: VariantsService);
    findVariants(productId: string): Promise<unknown[]>;
    findOneVariant(productId: string, variantId: string): Promise<{
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
    } & {
        effectivePrice: any;
        availableStock: number;
    }>;
    addVariant(productId: string, dto: CreateVariantDto): Promise<{
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
    } & {
        effectivePrice: any;
        availableStock: number;
    }>;
    updateVariant(productId: string, variantId: string, dto: UpdateVariantDto): Promise<{
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
    } & {
        effectivePrice: any;
        availableStock: number;
    }>;
    removeVariant(productId: string, variantId: string): Promise<{
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
    }>;
    setVariantImage(productId: string, variantId: string, imageUrl: string): Promise<{
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
    }>;
    deleteVariantImage(productId: string, variantId: string): Promise<{
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
    }>;
    batchUpdateVariantImages(productId: string, dto: UpdateVariantImagesBatchDto): Promise<import("../../../generated/prisma/internal/prismaNamespace").BatchPayload[]>;
}
