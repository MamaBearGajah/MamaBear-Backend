declare class CartProductBriefDto {
    id: string;
    name: string;
    slug: string;
    basePrice: number;
    mainImage: string | null;
}
declare class CartVariantBriefDto {
    id: string;
    name: string;
    value: string;
    priceAdjustment: number;
}
export declare class CartItemDto {
    id: string;
    cartId: string;
    productId: string;
    variantId: string | null;
    quantity: number;
    price: number;
    notes: string | null;
    product: CartProductBriefDto;
    variant: CartVariantBriefDto | null;
    createdAt: Date;
}
export declare class CartDto {
    id: string;
    userId: string;
    items: CartItemDto[];
    updatedAt: Date;
}
export {};
