import { PrismaClient } from "../../generated/prisma/client";
export declare function seedCategories(prisma: PrismaClient): Promise<{
    momsAndBaby: {
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
    };
    maternitySupplies: {
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
    };
    asiBooster: {
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
    };
    catAlmonMix: {
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
    };
    catZoyaMix: {
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
    };
    catTehPelancar: {
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
    };
    catKookie: {
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
    };
    catKapsul: {
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
    };
}>;
