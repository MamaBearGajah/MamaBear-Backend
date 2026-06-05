import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { ShippingCostDto } from './dto/shipping-cost.dto';
import { CacheService } from '../cache/cache.service';

const CACHE_TTL = {
  provinces: 60 * 60 * 24, // 24 jam — jarang berubah
  cities:    60 * 60 * 24, // 24 jam
  cost:      60 * 5,       // 5 menit — harga bisa berubah
};

const CACHE_KEY = {
  provinces: () => 'shipping:provinces',
  cities: (provinceId: string) => `shipping:cities:${provinceId}`,
  cost: (dto: ShippingCostDto) =>
    `shipping:cost:${dto.originCityId}:${dto.destinationCityId}:${dto.weight}:${dto.courier}`,
};

@Injectable()
export class ShippingService {
  private readonly http: AxiosInstance;

  constructor(
    private readonly config: ConfigService,
    private readonly cache: CacheService,
  ) {
    this.http = axios.create({
      baseURL: this.config.getOrThrow<string>('RAJAONGKIR_BASE_URL'),
      headers: { key: this.config.getOrThrow<string>('RAJAONGKIR_API_KEY') },
    });
  }

  // ─── Provinces ────────────────────────────────────────────────────────────

  async getProvinces() {
    const cacheKey = CACHE_KEY.provinces();
    const cached = await this.cache.get(cacheKey);
    if (cached) return cached;

    try {
      const { data } = await this.http.get('/destination/province');
      const provinces = data.data.map((p: any) => ({ id: p.id, name: p.name }));
      await this.cache.set(cacheKey, provinces, CACHE_TTL.provinces);
      return provinces;
    } catch (error) {
      this.handleError(error, 'Gagal mengambil data provinsi dari RajaOngkir');
    }
  }

  // ─── Cities ───────────────────────────────────────────────────────────────

  async getCities(provinceId?: string) {
    const cacheKey = CACHE_KEY.cities(provinceId ?? 'all');
    const cached = await this.cache.get(cacheKey);
    if (cached) return cached;

    try {
      const endpoint = provinceId
        ? `/destination/city/${provinceId}`
        : '/destination/city';

      const { data } = await this.http.get(endpoint);
      const cities = data.data.map((c: any) => ({
        id: c.id,
        name: c.name,
        zipCode: c.zip_code,
      }));
      await this.cache.set(cacheKey, cities, CACHE_TTL.cities);
      return cities;
    } catch (error) {
      this.handleError(error, 'Gagal mengambil data kota dari RajaOngkir');
    }
  }

  // ─── Calculate Cost ───────────────────────────────────────────────────────

  async calculateCost(dto: ShippingCostDto) {
    const cacheKey = CACHE_KEY.cost(dto);
    const cached = await this.cache.get(cacheKey);
    if (cached) return cached;

    try {
      const payload = new URLSearchParams({
        origin: dto.originCityId,
        destination: dto.destinationCityId,
        weight: dto.weight.toString(),
        courier: dto.courier,
      });

      const { data } = await this.http.post(
        '/calculate/district/domestic-cost',
        payload,
        { headers: { 'content-type': 'application/x-www-form-urlencoded' } },
      );

      const result = data.data.map((item: any) => ({
        service: item.service,
        cost: item.cost,
        etd: item.etd,
      }));

      await this.cache.set(cacheKey, result, CACHE_TTL.cost);
      return result;
    } catch (error) {
      this.handleError(error, 'Gagal menghitung ongkos kirim dari RajaOngkir');
    }
  }

  // ─── Error Handler ────────────────────────────────────────────────────────

  private handleError(error: any, message: string): never {
    console.error('RAJAONGKIR ERROR:', error?.response?.data || error.message);
    throw new InternalServerErrorException({
      code: 'EXTERNAL_SERVICE_ERROR',
      message,
      details: error?.response?.data || null,
    });
  }
}