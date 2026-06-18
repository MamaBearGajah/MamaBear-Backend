declare class SalesPeriodDto {
    period: string;
    revenue: number;
    orders: number;
}
export declare class SalesReportResponseDto {
    totalSales: number;
    orderCount: number;
    avgOrderValue: number;
    groupBy: string;
    data: SalesPeriodDto[];
}
declare class TopProductInfoDto {
    id: string;
    name: string;
    slug: string;
    mainImage: string | null;
    sku: string;
}
export declare class TopProductItemDto {
    product: TopProductInfoDto | null;
    totalSold: number;
    totalRevenue: number;
}
declare class TopCategoryInfoDto {
    id: string;
    name: string;
    slug: string;
}
export declare class TopCategoryItemDto {
    category: TopCategoryInfoDto | null;
    totalSold: number;
    totalRevenue: number;
}
export {};
