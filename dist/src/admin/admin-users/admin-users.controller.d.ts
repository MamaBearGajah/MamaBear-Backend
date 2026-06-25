import { Role } from '../../../generated/prisma/enums';
import { AdminUsersService } from './admin-users.service';
import { CreateAdminUserDto, UpdateAdminUserRoleDto } from './admin-users.dto';
export declare class AdminUsersController {
    private readonly adminUsersService;
    constructor(adminUsersService: AdminUsersService);
    findAll(): Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string;
            phone: string | null;
            role: Role;
            isVerified: boolean;
            bannedAt: Date | null;
        }[];
        total: number;
    }>;
    create(dto: CreateAdminUserDto): Promise<{
        message: string;
        data: {
            id: string;
            createdAt: Date;
            name: string;
            email: string;
            role: Role;
            isVerified: boolean;
        };
    }>;
    updateRole(targetId: string, dto: UpdateAdminUserRoleDto, requesterId: string): Promise<{
        message: string;
        data: {
            id: string;
            name: string;
            email: string;
            role: Role;
        };
    }>;
    deactivate(targetId: string, requesterId: string): Promise<{
        message: string;
    }>;
    reactivate(targetId: string): Promise<{
        message: string;
    }>;
}
