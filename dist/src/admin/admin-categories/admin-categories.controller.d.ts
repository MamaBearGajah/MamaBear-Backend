import { AdminCategoriesService } from './admin-categories.service';
import { AdminBaseQueryDto } from '../dto/admin-query.dto';
export declare class AdminCategoriesController {
    private readonly adminCategoriesService;
    constructor(adminCategoriesService: AdminCategoriesService);
    getAll(query: AdminBaseQueryDto): Promise<{
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
