import { AdminProductsService } from './admin-products.service';
import type { Response } from 'express';
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
}
