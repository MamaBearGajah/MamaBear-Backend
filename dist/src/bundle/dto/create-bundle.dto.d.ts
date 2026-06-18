export declare class BundleItemDto {
    productId: string;
    quantity: number;
}
export declare class CreateBundleDto {
    name: string;
    slug: string;
    description?: string;
    imageUrl?: string;
    publicId?: string;
    bundlePrice: number;
    discountPrice?: number;
    isActive?: boolean;
    stock?: number;
    sortOrder?: number;
    startDate?: string;
    endDate?: string;
    items: BundleItemDto[];
}
