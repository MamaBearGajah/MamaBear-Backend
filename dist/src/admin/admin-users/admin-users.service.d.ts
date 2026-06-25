import { PrismaService } from '../../prisma/prisma.service';
import { CreateAdminUserDto, UpdateAdminUserRoleDto } from './admin-users.dto';
export declare class AdminUsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        data: {
            id: string;
            name: string;
            email: string;
            phone: string | null;
            role: import("../../../generated/prisma/enums").Role;
            isVerified: boolean;
            createdAt: Date;
            updatedAt: Date;
            bannedAt: Date | null;
        }[];
        total: number;
    }>;
    create(dto: CreateAdminUserDto): Promise<{
        message: string;
        data: {
            id: string;
            name: string;
            email: string;
            role: import("../../../generated/prisma/enums").Role;
            isVerified: boolean;
            createdAt: Date;
        };
    }>;
    updateRole(targetId: string, dto: UpdateAdminUserRoleDto, requesterId: string): Promise<{
        message: string;
        data: {
            id: string;
            name: string;
            email: string;
            role: import("../../../generated/prisma/enums").Role;
        };
    }>;
    deactivate(targetId: string, requesterId: string): Promise<{
        message: string;
    }>;
    reactivate(targetId: string): Promise<{
        message: string;
    }>;
}
