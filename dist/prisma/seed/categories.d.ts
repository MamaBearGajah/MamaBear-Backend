import { PrismaClient } from "../../generated/prisma/client";
export declare function seedCategories(prisma: PrismaClient): Promise<{
    momsAndBaby: {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string | null;
        isActive: boolean;
        sortOrder: number;
        parentId: string | null;
        slug: string;
        description: string | null;
    };
    maternitySupplies: {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string | null;
        isActive: boolean;
        sortOrder: number;
        parentId: string | null;
        slug: string;
        description: string | null;
    };
    asiBooster: {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string | null;
        isActive: boolean;
        sortOrder: number;
        parentId: string | null;
        slug: string;
        description: string | null;
    };
    catAlmonMix: {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string | null;
        isActive: boolean;
        sortOrder: number;
        parentId: string | null;
        slug: string;
        description: string | null;
    };
    catZoyaMix: {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string | null;
        isActive: boolean;
        sortOrder: number;
        parentId: string | null;
        slug: string;
        description: string | null;
    };
    catTehPelancar: {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string | null;
        isActive: boolean;
        sortOrder: number;
        parentId: string | null;
        slug: string;
        description: string | null;
    };
    catKookie: {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string | null;
        isActive: boolean;
        sortOrder: number;
        parentId: string | null;
        slug: string;
        description: string | null;
    };
    catKapsul: {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string | null;
        isActive: boolean;
        sortOrder: number;
        parentId: string | null;
        slug: string;
        description: string | null;
    };
}>;
