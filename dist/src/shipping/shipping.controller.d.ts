import { ShippingService } from './shipping.service';
import { ShippingCostDto } from './dto/shipping-cost.dto';
export declare class ShippingController {
    private readonly shippingService;
    constructor(shippingService: ShippingService);
    getProvinces(): Promise<any>;
    getCities(provinceId?: string): Promise<any>;
    calculateCost(dto: ShippingCostDto): Promise<any>;
}
