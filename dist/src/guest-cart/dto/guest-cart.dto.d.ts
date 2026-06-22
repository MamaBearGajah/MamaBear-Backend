export declare class CreateGuestCartDto {
    sessionId: string;
}
export declare class GuestAddToCartDto {
    sessionId: string;
    productId: string;
    variantId?: string;
    quantity: number;
    notes?: string;
}
export declare class GuestUpdateCartItemDto {
    quantity: number;
    notes?: string;
}
