import { ReportsService } from './reports.service';
import { SalesQueryDto } from './dto/reports-query.dto';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    getSalesReport(query: SalesQueryDto): Promise<{
        totalSales: number;
        orderCount: number;
        avgOrderValue: number;
        groupBy: "week" | "day" | "month";
        data: {
            period: string;
            revenue: number;
            orders: number;
        }[];
    }>;
    getTopProducts(limit?: string, startDate?: string, endDate?: string): Promise<{
        product: {
            id: string;
            name: string;
            slug: string;
            sku: string;
            mainImage: string;
        } | null;
        totalSold: number;
        totalRevenue: number;
    }[]>;
    getTopCategories(limit?: string, startDate?: string, endDate?: string): Promise<{
        category: {
            id: string;
            name: string;
            slug: string;
        } | null;
        totalSold: number;
        totalRevenue: number;
    }[]>;
}
