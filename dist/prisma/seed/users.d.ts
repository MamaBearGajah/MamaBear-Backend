import { PrismaClient } from "../../generated/prisma/client";
export declare function seedUsers(prisma: PrismaClient): Promise<{
    customers: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        phone: string | null;
        password: string;
        role: import("generated/prisma/client").Role;
        isVerified: boolean;
        deletedAt: Date | null;
        bannedAt: Date | null;
        banReason: string | null;
        refreshToken: string | null;
        verifyToken: string | null;
        verifyTokenExp: Date | null;
        resetToken: string | null;
        resetTokenExp: Date | null;
    }[];
    addresses: {
        id: string;
        label: string | null;
        createdAt: Date;
        updatedAt: Date;
        phone: string;
        receiverName: string;
        address: string;
        notes: string | null;
        cityId: string;
        provinceId: string;
        postalCode: string;
        isDefault: boolean;
        userId: string;
    }[];
}>;
