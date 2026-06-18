import { PrismaService } from '../prisma/prisma.service';
import { AddToCartDto, UpdateCartItemDto, MergeGuestCartDto } from './dto/create-cart.dto';
export declare class CartService {
    private prisma;
    constructor(prisma: PrismaService);
    private computeSubtotal;
    private withSubtotal;
    private getOrCreateCart;
    getCart(userId: string): Promise<any>;
    addItem(userId: string, dto: AddToCartDto): Promise<any>;
    updateItem(userId: string, itemId: string, dto: UpdateCartItemDto): Promise<any>;
    removeItem(userId: string, itemId: string): Promise<{
        message: string;
    }>;
    clearCart(userId: string): Promise<{
        message: string;
    }>;
    mergeGuest(userId: string, dto: MergeGuestCartDto): Promise<any>;
}
