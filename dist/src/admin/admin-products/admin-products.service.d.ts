import { PrismaService } from '../../prisma/prisma.service';
import { ProductStatus } from '../../../generated/prisma/enums';
export declare class AdminProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    exportProductsToCsv(): Promise<string>;
    importProductsFromCsv(fileBuffer: Buffer): Promise<{
        imported: number;
        failed: number;
        errors: {
            row: number;
            reason: string;
        }[];
    }>;
    bulkUpdateProducts(dto: {
        ids: string[];
        data: {
            status?: ProductStatus;
            basePrice?: number;
        };
    }): Promise<{
        updated: number;
        notFound: string[] | undefined;
    }>;
    duplicateProduct(productId: string): Promise<{
        message: string;
        data: {
            id: string;
            slug: string;
            sku: string;
        };
    }>;
}
