import { GuestCartService } from './guest-cart.service';
import { CreateGuestCartDto, GuestAddToCartDto, GuestUpdateCartItemDto } from './dto/guest-cart.dto';
export declare class GuestCartController {
    private readonly guestCartService;
    constructor(guestCartService: GuestCartService);
    createCart(dto: CreateGuestCartDto): Promise<any>;
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
