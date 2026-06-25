import { AdminCategoriesService } from './admin-categories.service';
import { AdminBaseQueryDto } from '../dto/admin-query.dto';
export declare class AdminCategoriesController {
    private readonly adminCategoriesService;
    constructor(adminCategoriesService: AdminCategoriesService);
    getAll(query: AdminBaseQueryDto): Promise<{
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
