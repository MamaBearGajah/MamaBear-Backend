import { PrismaClient } from "../../generated/prisma/client";
export declare function seedUsers(prisma: PrismaClient): Promise<{
    customers: {
        id: string;
        name: string;
        email: string;
        phone: string | null;
        password: string;
        role: import("generated/prisma/client").Role;
        isVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
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
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        label: string | null;
        receiverName: string;
        address: string;
        notes: string | null;
        cityId: string;
        provinceId: string;
        postalCode: string;
        isDefault: boolean;
    }[];
}>;
