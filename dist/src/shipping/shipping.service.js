"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = __importDefault(require("axios"));
const cache_service_1 = require("../cache/cache.service");
const CACHE_TTL = {
    provinces: 60 * 60 * 24,
    cities: 60 * 60 * 24,
    cost: 60 * 5,
};
const CACHE_KEY = {
    provinces: () => 'shipping:provinces',
    cities: (provinceId) => `shipping:cities:${provinceId}`,
    cost: (dto) => `shipping:cost:${dto.originCityId}:${dto.destinationCityId}:${dto.weight}:${dto.courier}`,
};
let ShippingService = class ShippingService {
    config;
    cache;
    http;
    constructor(config, cache) {
        this.config = config;
        this.cache = cache;
        this.http = axios_1.default.create({
            baseURL: this.config.getOrThrow('RAJAONGKIR_BASE_URL'),
            headers: { key: this.config.getOrThrow('RAJAONGKIR_API_KEY') },
        });
    }
    async getProvinces() {
        const cacheKey = CACHE_KEY.provinces();
        const cached = await this.cache.get(cacheKey);
        if (cached)
            return cached;
        try {
            const { data } = await this.http.get('/destination/province');
            const provinces = data.data.map((p) => ({ id: p.id, name: p.name }));
            await this.cache.set(cacheKey, provinces, CACHE_TTL.provinces);
            return provinces;
        }
        catch (error) {
            this.handleError(error, 'Gagal mengambil data provinsi dari RajaOngkir');
        }
    }
    async getCities(provinceId) {
        const cacheKey = CACHE_KEY.cities(provinceId ?? 'all');
        const cached = await this.cache.get(cacheKey);
        if (cached)
            return cached;
        try {
            const endpoint = provinceId
                ? `/destination/city/${provinceId}`
                : '/destination/city';
            const { data } = await this.http.get(endpoint);
            const cities = data.data.map((c) => ({
                id: c.id,
                name: c.name,
                zipCode: c.zip_code,
            }));
            await this.cache.set(cacheKey, cities, CACHE_TTL.cities);
            return cities;
        }
        catch (error) {
            this.handleError(error, 'Gagal mengambil data kota dari RajaOngkir');
        }
    }
    async calculateCost(dto) {
        const cacheKey = CACHE_KEY.cost(dto);
        const cached = await this.cache.get(cacheKey);
        if (cached)
            return cached;
        try {
            const payload = new URLSearchParams({
                origin: dto.originCityId,
                destination: dto.destinationCityId,
                weight: dto.weight.toString(),
                courier: dto.courier,
            });
            const { data } = await this.http.post('/calculate/district/domestic-cost', payload, { headers: { 'content-type': 'application/x-www-form-urlencoded' } });
            const result = data.data.map((item) => ({
                service: item.service,
                cost: item.cost,
                etd: item.etd,
            }));
            await this.cache.set(cacheKey, result, CACHE_TTL.cost);
            return result;
        }
        catch (error) {
            this.handleError(error, 'Gagal menghitung ongkos kirim dari RajaOngkir');
        }
    }
    handleError(error, message) {
        console.error('RAJAONGKIR ERROR:', error?.response?.data || error.message);
        throw new common_1.InternalServerErrorException({
            code: 'EXTERNAL_SERVICE_ERROR',
            message,
            details: error?.response?.data || null,
        });
    }
};
exports.ShippingService = ShippingService;
exports.ShippingService = ShippingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        cache_service_1.CacheService])
], ShippingService);
//# sourceMappingURL=shipping.service.js.map