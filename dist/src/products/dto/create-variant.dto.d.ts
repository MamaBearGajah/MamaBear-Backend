export declare class CreateVariantDto {
    name: string;
    value: string;
    basePrice: number;
    discountPrice?: number;
    priceAdjustment?: number;
    stock: number;
    imageUrl?: string;
    sku?: string;
    isActive?: boolean;
}
