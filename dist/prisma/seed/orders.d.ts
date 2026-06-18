import { PrismaClient } from "../../generated/prisma/client";
type User = {
    id: string;
};
type Address = {
    id: string;
};
type Product = {
    id: string;
};
export declare function seedOrders(prisma: PrismaClient, { customers, addresses, products }: {
    customers: User[];
    addresses: Address[];
    products: {
        almonMix: Product;
        zoyaMix: Product;
        tehPelancar: Product;
        kukis: Product;
        kapsul: Product;
    };
}): Promise<void>;
export {};
