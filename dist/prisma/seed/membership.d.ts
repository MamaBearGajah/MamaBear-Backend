import { PrismaClient } from "../../generated/prisma/client";
export declare function seedMembership(prisma: PrismaClient, customers: {
    id: string;
}[]): Promise<void>;
