import { OrderStatus } from '../../../generated/prisma/enums';
export declare class UpdateOrderDto {
    status: OrderStatus;
    trackingNumber?: string;
    note?: string;
}
