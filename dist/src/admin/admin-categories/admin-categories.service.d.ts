import { PrismaService } from '../../prisma/prisma.service';
import { AdminBaseQueryDto } from '../dto/admin-query.dto';
export declare class AdminCategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(query: AdminBaseQueryDto): Promise<{
        data: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            imageUrl: string | null;
            isActive: boolean;
            sortOrder: number;
            parentId: string | null;
            slug: string;
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
