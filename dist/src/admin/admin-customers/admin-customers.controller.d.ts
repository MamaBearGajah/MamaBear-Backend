import { AdminCustomersService } from './admin-customers.service';
import { AdminBaseQueryDto } from '../dto/admin-query.dto';
export declare class AdminCustomersController {
    private readonly adminCustomersService;
    constructor(adminCustomersService: AdminCustomersService);
    getAll(query: AdminBaseQueryDto): Promise<{
        data: {
            id: string;
            name: string;
            email: string;
            createdAt: Date;
        }[];
        meta: {
            totalItems: number;
            itemsPerPage: number;
            totalPages: number;
            currentPage: number;
        };
    }>;
}
