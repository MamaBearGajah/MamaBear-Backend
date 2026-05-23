import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { ShippingCostDto } from './dto/shipping-cost.dto';

@Injectable()
export class ShippingService {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private provincesCache: any[] | null = null;
  private citiesCache: Map<string, any[]> = new Map();

  constructor(private config: ConfigService) {
    this.apiKey = this.config.getOrThrow<string>('RAJAONGKIR_API_KEY');
    this.baseUrl = this.config.getOrThrow<string>('RAJAONGKIR_BASE_URL');
  }

  private get headers() {
    return { Key: this.apiKey };
  }

  async getProvinces() {
    if (this.provincesCache) return this.provincesCache;

    try {
      const { data } = await axios.get(`${this.baseUrl}/destination/province`, {
        headers: this.headers,
      });
      this.provincesCache = data.data.map((p: any) => ({
        id: p.id,
        name: p.name,
      }));
      return this.provincesCache;
    } catch {
      throw new InternalServerErrorException({
        code: 'EXTERNAL_SERVICE_ERROR',
        message: 'Gagal mengambil data provinsi dari RajaOngkir',
      });
    }
  }

  async getCities(provinceId?: string) {
    const cacheKey = provinceId ?? 'all';
    if (this.citiesCache.has(cacheKey)) return this.citiesCache.get(cacheKey);

    try {
      // V2: province_id sebagai path param, bukan query
      const url = provinceId
        ? `${this.baseUrl}/destination/city/${provinceId}`
        : `${this.baseUrl}/destination/city`;

      const { data } = await axios.get(url, { headers: this.headers });

      const result = data.data.map((c: any) => ({
        id: c.id,
        name: c.name,
        zipCode: c.zip_code,
      }));
      this.citiesCache.set(cacheKey, result);
      return result;
    } catch {
      throw new InternalServerErrorException({
        code: 'EXTERNAL_SERVICE_ERROR',
        message: 'Gagal mengambil data kota dari RajaOngkir',
      });
    }
  }

  async calculateCost(dto: ShippingCostDto) {
    try {
      // V2: pakai x-www-form-urlencoded, bukan JSON
      const params = new URLSearchParams();
      params.append('origin', dto.originCityId);
      params.append('destination', dto.destinationCityId);
      params.append('weight', dto.weight.toString());
      params.append('courier', dto.courier);

      const { data } = await axios.post(
        `${this.baseUrl}/calculate/district/domestic-cost`,
        params,
        {
          headers: {
            ...this.headers,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      return data.data.map((c: any) => ({
        service: c.service,
        cost: c.cost,
        etd: c.etd,
      }));
    } catch {
      throw new InternalServerErrorException({
        code: 'EXTERNAL_SERVICE_ERROR',
        message: 'Gagal menghitung ongkos kirim dari RajaOngkir',
      });
    }
  }
}