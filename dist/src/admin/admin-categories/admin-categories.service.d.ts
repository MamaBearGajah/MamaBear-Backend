import { PrismaService } from '../../prisma/prisma.service';
import { AdminBaseQueryDto } from '../dto/admin-query.dto';
export declare class AdminCategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(query: AdminBaseQueryDto): Promise<{
        data: {
            id: string;
            imageUrl: string | null;
            isActive: boolean;
            sortOrder: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            slug: string;
            parentId: string | null;
            description: string | null;
        }[];
        meta: {
            totalItems: number;
            itemsPerPage: number;
            totalPages: number;
            currentPage: number;
        };
    }>;
}
