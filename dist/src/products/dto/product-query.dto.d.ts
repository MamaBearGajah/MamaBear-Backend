export declare class ProductQueryDto {
    page?: number;
    limit?: number;
    q?: string;
    categoryId?: string;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
    variantName?: string;
    variantValue?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
