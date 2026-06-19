import { PrismaService } from '../prisma/prisma.service';
export declare class WishlistService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getWishlist(userId: string): Promise<{
        count: number;
        items: {
            id: string;
            productId: string;
            addedAt: Date;
            product: {
                id: string;
                name: string;
                slug: string;
                status: import("../../generated/prisma/enums").ProductStatus;
                basePrice: import("@prisma/client-runtime-utils").Decimal;
                discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
                images: {
                    imageUrl: string;
                    altText: string | null;
                }[];
            };
        }[];
    }>;
    addToWishlist(userId: string, productId: string): Promise<{
        id: string;
        productId: string;
        addedAt: Date;
        product: {
            id: string;
            name: string;
            slug: string;
            status: import("../../generated/prisma/enums").ProductStatus;
            basePrice: import("@prisma/client-runtime-utils").Decimal;
            discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
            images: {
                imageUrl: string;
                altText: string | null;
            }[];
        };
    }>;
    removeFromWishlist(userId: string, productId: string): Promise<{
        message: string;
        productId: string;
    }>;
    checkWishlist(userId: string, productId: string): Promise<{
        inWishlist: boolean;
    }>;
}
