import { ConfigService } from '@nestjs/config';
import { ShippingCostDto } from './dto/shipping-cost.dto';
import { CacheService } from '../cache/cache.service';
export declare class ShippingService {
    private readonly config;
    private readonly cache;
    private readonly http;
    constructor(config: ConfigService, cache: CacheService);
    getProvinces(): Promise<any>;
    getCities(provinceId?: string): Promise<any>;
    calculateCost(dto: ShippingCostDto): Promise<any>;
    private handleError;
}
