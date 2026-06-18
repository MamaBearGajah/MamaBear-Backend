declare class GuestCartProductBriefDto {
    id: string;
    name: string;
    basePrice: number;
    mainImage: string | null;
}
export declare class GuestCartItemDto {
    id: string;
    guestCartId: string;
    productId: string;
    variantId: string | null;
    quantity: number;
    price: number;
    notes: string | null;
    product: GuestCartProductBriefDto;
    createdAt: Date;
}
export declare class GuestCartDto {
    id: string;
    sessionId: string;
    items: GuestCartItemDto[];
    updatedAt: Date;
}
export {};
