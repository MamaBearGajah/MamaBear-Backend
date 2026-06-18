import { PrismaService } from '../prisma/prisma.service';
import { GuestAddToCartDto, GuestUpdateCartItemDto } from './dto/guest-cart.dto';
export declare class GuestCartService {
    private prisma;
    constructor(prisma: PrismaService);
    private computeSubtotal;
    private withSubtotal;
    private getOrCreate;
    createCart(sessionId: string): Promise<any>;
    getCart(sessionId: string): Promise<any>;
    addItem(dto: GuestAddToCartDto): Promise<any>;
    updateItem(sessionId: string, itemId: string, dto: GuestUpdateCartItemDto): Promise<any>;
    removeItem(sessionId: string, itemId: string): Promise<{
        message: string;
    }>;
    clearCart(sessionId: string): Promise<{
        message: string;
    }>;
    deleteCart(sessionId: string): Promise<{
        message: string;
    }>;
}
