import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { ShippingCostDto } from './dto/shipping-cost.dto';

@Injectable()
export class ShippingService {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly http: AxiosInstance;

  private provincesCache: any[] | null = null;
  private citiesCache: Map<string, any[]> = new Map();

  constructor(private readonly config: ConfigService) {
    this.apiKey =
      this.config.getOrThrow<string>('RAJAONGKIR_API_KEY');

    this.baseUrl =
      this.config.getOrThrow<string>('RAJAONGKIR_BASE_URL');

    this.http = axios.create({
      baseURL: this.baseUrl,
      headers: {
        key: this.apiKey,
      },
    });
  }

  async getProvinces() {
    if (this.provincesCache) {
      return this.provincesCache;
    }

    try {
      const { data } = await this.http.get(
        '/destination/province',
      );

      const provinces = data.data.map((province: any) => ({
        id: province.id,
        name: province.name,
      }));

      this.provincesCache = provinces;

      return provinces;
    } catch (error) {
      this.handleError(
        error,
        'Gagal mengambil data provinsi dari RajaOngkir',
      );
    }
  }

  async getCities(provinceId?: string) {
    const cacheKey = provinceId ?? 'all';

    if (this.citiesCache.has(cacheKey)) {
      return this.citiesCache.get(cacheKey);
    }

    try {
      const endpoint = provinceId
        ? `/destination/city/${provinceId}`
        : '/destination/city';

      const { data } = await this.http.get(endpoint);

      const cities = data.data.map((city: any) => ({
        id: city.id,
        name: city.name,
        zipCode: city.zip_code,
      }));

      this.citiesCache.set(cacheKey, cities);

      return cities;
    } catch (error) {
      this.handleError(
        error,
        'Gagal mengambil data kota dari RajaOngkir',
      );
    }
  }

  async calculateCost(dto: ShippingCostDto) {
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
        {
          headers: {
            'content-type':
              'application/x-www-form-urlencoded',
          },
        },
      );

      return data.data.map((item: any) => ({
        service: item.service,
        cost: item.cost,
        etd: item.etd,
      }));
    } catch (error) {
      this.handleError(
        error,
        'Gagal menghitung ongkos kirim dari RajaOngkir',
      );
    }
  }

  private handleError(error: any, message: string): never {
    console.error(
      'RAJAONGKIR ERROR:',
      error?.response?.data || error.message,
    );

    throw new InternalServerErrorException({
      code: 'EXTERNAL_SERVICE_ERROR',
      message,
      details: error?.response?.data || null,
    });
  }
}