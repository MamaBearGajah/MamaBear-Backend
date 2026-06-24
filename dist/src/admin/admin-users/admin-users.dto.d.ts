type AdminRole = 'admin' | 'super_admin';
export declare class CreateAdminUserDto {
    name: string;
    email: string;
    password: string;
    role?: AdminRole;
}
export declare class UpdateAdminUserRoleDto {
    role: AdminRole;
}
export {};
