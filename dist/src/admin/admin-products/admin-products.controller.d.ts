import type { Response } from 'express';
import { ProductStatus } from '../../../generated/prisma/enums';
import { AdminProductsService } from './admin-products.service';
declare class BulkUpdateDataDto {
    status?: ProductStatus;
    basePrice?: number;
}
declare class BulkUpdateDto {
    ids: string[];
    data: BulkUpdateDataDto;
}
export declare class AdminProductsController {
    private readonly adminProductsService;
    constructor(adminProductsService: AdminProductsService);
    exportCsv(res: Response): Promise<Response<any, Record<string, any>>>;
    importCsv(file: Express.Multer.File): Promise<{
        imported: number;
        failed: number;
        errors: {
            row: number;
            reason: string;
        }[];
    }>;
    bulkUpdate(dto: BulkUpdateDto): Promise<{
        updated: number;
        notFound: string[] | undefined;
    }>;
    duplicate(id: string): Promise<{
        message: string;
        data: {
            id: string;
            slug: string;
            sku: string;
        };
    }>;
}
export {};
