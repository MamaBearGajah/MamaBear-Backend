import { PrismaService } from '../../prisma/prisma.service';
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
}
