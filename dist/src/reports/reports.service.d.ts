import { PrismaService } from '../prisma/prisma.service';
import { SalesQueryDto } from './dto/reports-query.dto';
interface DateRangeOpts {
    startDate?: string;
    endDate?: string;
}
interface TopOpts extends DateRangeOpts {
    limit?: number;
}
export declare class ReportsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private buildPaidOrderWhere;
    private groupByPeriod;
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
    getTopProducts(opts: TopOpts): Promise<{
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
    getTopCategories(opts: TopOpts): Promise<{
        category: {
            id: string;
            name: string;
            slug: string;
        } | null;
        totalSold: number;
        totalRevenue: number;
    }[]>;
}
export {};
