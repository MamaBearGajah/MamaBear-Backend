import { PrismaService } from '../../prisma/prisma.service';
import { AdminBaseQueryDto } from '../dto/admin-query.dto';
export declare class AdminCustomersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(query: AdminBaseQueryDto): Promise<{
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
