export declare class AddToCartDto {
    productId: string;
    variantId?: string;
    quantity: number;
    notes?: string;
}
export declare class UpdateCartItemDto {
    quantity: number;
    notes?: string;
}
export declare class MergeGuestCartDto {
    sessionId: string;
}
