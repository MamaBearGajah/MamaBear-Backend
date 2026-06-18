export declare class SearchQueryDto {
    q?: string;
    minPrice?: number;
    maxPrice?: number;
    categoryId?: string;
    inStock?: boolean;
    variantName?: string;
    variantValue?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    page?: number;
    limit?: number;
}
