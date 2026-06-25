import { PrismaService } from '../prisma/prisma.service';
import { CreatePromotionDto, UpdatePromotionDto } from './dto/create-promotion.dto';
export declare class PromotionService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private readonly include;
    findBySlug(slug: string): Promise<{
        bundles: {
            heroBundle: ({
                items: ({
                    product: {
                        id: string;
                        name: string;
                        slug: string;
                    };
                } & {
                    id: string;
                    productId: string;
                    bundleId: string;
                    quantity: number;
                })[];
            } & {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                imageUrl: string | null;
                isActive: boolean;
                sortOrder: number;
                startDate: Date | null;
                endDate: Date | null;
                slug: string;
                description: string | null;
                discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
                stock: number;
                soldCount: number;
                publicId: string | null;
                bundlePrice: import("@prisma/client-runtime-utils").Decimal;
            }) | null;
            collectionBundles: ({
                items: ({
                    product: {
                        id: string;
                        name: string;
                        slug: string;
                    };
                } & {
                    id: string;
                    productId: string;
                    bundleId: string;
                    quantity: number;
                })[];
            } & {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                imageUrl: string | null;
                isActive: boolean;
                sortOrder: number;
                startDate: Date | null;
                endDate: Date | null;
                slug: string;
                description: string | null;
                discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
                stock: number;
                soldCount: number;
                publicId: string | null;
                bundlePrice: import("@prisma/client-runtime-utils").Decimal;
            })[];
            allBundles: ({
                items: ({
                    product: {
                        id: string;
                        name: string;
                        slug: string;
                    };
                } & {
                    id: string;
                    productId: string;
                    bundleId: string;
                    quantity: number;
                })[];
            } & {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                imageUrl: string | null;
                isActive: boolean;
                sortOrder: number;
                startDate: Date | null;
                endDate: Date | null;
                slug: string;
                description: string | null;
                discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
                stock: number;
                soldCount: number;
                publicId: string | null;
                bundlePrice: import("@prisma/client-runtime-utils").Decimal;
            })[];
        };
        sections: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            isActive: boolean;
            sortOrder: number;
            subtitle: string | null;
            promotionId: string;
        }[];
        benefits: {
            id: string;
            title: string;
            sortOrder: number;
            description: string;
            promotionId: string;
            icon: string | null;
        }[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        startDate: Date | null;
        endDate: Date | null;
        slug: string;
        description: string | null;
        status: import("../../generated/prisma/enums").PromotionStatus;
        subtitle: string | null;
        badgeText: string | null;
        heroBundleId: string | null;
    }>;
    findActive(): Promise<{
        bundles: {
            heroBundle: ({
                items: ({
                    product: {
                        id: string;
                        name: string;
                        slug: string;
                    };
                } & {
                    id: string;
                    productId: string;
                    bundleId: string;
                    quantity: number;
                })[];
            } & {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                imageUrl: string | null;
                isActive: boolean;
                sortOrder: number;
                startDate: Date | null;
                endDate: Date | null;
                slug: string;
                description: string | null;
                discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
                stock: number;
                soldCount: number;
                publicId: string | null;
                bundlePrice: import("@prisma/client-runtime-utils").Decimal;
            }) | null;
            collectionBundles: ({
                items: ({
                    product: {
                        id: string;
                        name: string;
                        slug: string;
                    };
                } & {
                    id: string;
                    productId: string;
                    bundleId: string;
                    quantity: number;
                })[];
            } & {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                imageUrl: string | null;
                isActive: boolean;
                sortOrder: number;
                startDate: Date | null;
                endDate: Date | null;
                slug: string;
                description: string | null;
                discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
                stock: number;
                soldCount: number;
                publicId: string | null;
                bundlePrice: import("@prisma/client-runtime-utils").Decimal;
            })[];
            allBundles: ({
                items: ({
                    product: {
                        id: string;
                        name: string;
                        slug: string;
                    };
                } & {
                    id: string;
                    productId: string;
                    bundleId: string;
                    quantity: number;
                })[];
            } & {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                imageUrl: string | null;
                isActive: boolean;
                sortOrder: number;
                startDate: Date | null;
                endDate: Date | null;
                slug: string;
                description: string | null;
                discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
                stock: number;
                soldCount: number;
                publicId: string | null;
                bundlePrice: import("@prisma/client-runtime-utils").Decimal;
            })[];
        };
        sections: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            isActive: boolean;
            sortOrder: number;
            subtitle: string | null;
            promotionId: string;
        }[];
        benefits: {
            id: string;
            title: string;
            sortOrder: number;
            description: string;
            promotionId: string;
            icon: string | null;
        }[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        startDate: Date | null;
        endDate: Date | null;
        slug: string;
        description: string | null;
        status: import("../../generated/prisma/enums").PromotionStatus;
        subtitle: string | null;
        badgeText: string | null;
        heroBundleId: string | null;
    } | null>;
    findAll(): Promise<({
        sections: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            isActive: boolean;
            sortOrder: number;
            subtitle: string | null;
            promotionId: string;
        }[];
        benefits: {
            id: string;
            title: string;
            sortOrder: number;
            description: string;
            promotionId: string;
            icon: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        startDate: Date | null;
        endDate: Date | null;
        slug: string;
        description: string | null;
        status: import("../../generated/prisma/enums").PromotionStatus;
        subtitle: string | null;
        badgeText: string | null;
        heroBundleId: string | null;
    })[]>;
    findOne(id: string): Promise<{
        sections: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            isActive: boolean;
            sortOrder: number;
            subtitle: string | null;
            promotionId: string;
        }[];
        benefits: {
            id: string;
            title: string;
            sortOrder: number;
            description: string;
            promotionId: string;
            icon: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        startDate: Date | null;
        endDate: Date | null;
        slug: string;
        description: string | null;
        status: import("../../generated/prisma/enums").PromotionStatus;
        subtitle: string | null;
        badgeText: string | null;
        heroBundleId: string | null;
    }>;
    create(dto: CreatePromotionDto): Promise<{
        sections: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            isActive: boolean;
            sortOrder: number;
            subtitle: string | null;
            promotionId: string;
        }[];
        benefits: {
            id: string;
            title: string;
            sortOrder: number;
            description: string;
            promotionId: string;
            icon: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        startDate: Date | null;
        endDate: Date | null;
        slug: string;
        description: string | null;
        status: import("../../generated/prisma/enums").PromotionStatus;
        subtitle: string | null;
        badgeText: string | null;
        heroBundleId: string | null;
    }>;
    update(id: string, dto: UpdatePromotionDto): Promise<{
        sections: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            isActive: boolean;
            sortOrder: number;
            subtitle: string | null;
            promotionId: string;
        }[];
        benefits: {
            id: string;
            title: string;
            sortOrder: number;
            description: string;
            promotionId: string;
            icon: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        startDate: Date | null;
        endDate: Date | null;
        slug: string;
        description: string | null;
        status: import("../../generated/prisma/enums").PromotionStatus;
        subtitle: string | null;
        badgeText: string | null;
        heroBundleId: string | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    private getActiveBundlesForPromo;
}
