import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { ShippingCostDto } from './dto/shipping-cost.dto';

@Injectable()
export class ShippingService {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(private config: ConfigService) {
    this.apiKey = this.config.getOrThrow<string>('RAJAONGKIR_API_KEY');
    this.baseUrl = this.config.getOrThrow<string>('RAJAONGKIR_BASE_URL');
  }

  private get headers() {
    return { key: this.apiKey };
  }

  async getProvinces() {
    try {
      const { data } = await axios.get(`${this.baseUrl}/province`, {
        headers: this.headers,
      });
      return data.rajaongkir.results.map((p: any) => ({
        id: p.province_id,
        name: p.province,
      }));
    } catch {
      throw new InternalServerErrorException({
        code: 'EXTERNAL_SERVICE_ERROR',
        message: 'Gagal mengambil data provinsi dari RajaOngkir',
      });
    }
  }

  async getCities(provinceId?: string) {
    try {
      const params = provinceId ? { province: provinceId } : {};
      const { data } = await axios.get(`${this.baseUrl}/city`, {
        headers: this.headers,
        params,
      });
      return data.rajaongkir.results.map((c: any) => ({
        id: c.city_id,
        name: c.city_name,
        provinceId: c.province_id,
        province: c.province,
        type: c.type,
        postalCode: c.postal_code,
      }));
    } catch {
      throw new InternalServerErrorException({
        code: 'EXTERNAL_SERVICE_ERROR',
        message: 'Gagal mengambil data kota dari RajaOngkir',
      });
    }
  }

  async calculateCost(dto: ShippingCostDto) {
    try {
      const { data } = await axios.post(
        `${this.baseUrl}/cost`,
        {
          origin: dto.originCityId,
          destination: dto.destinationCityId,
          weight: dto.weight,
          courier: dto.courier,
        },
        { headers: this.headers },
      );

      const results = data.rajaongkir.results?.[0]?.costs ?? [];
      return results.map((c: any) => ({
        service: c.service,
        cost: c.cost?.[0]?.value ?? 0,
        etd: c.cost?.[0]?.etd ?? '-',
      }));
    } catch {
      throw new InternalServerErrorException({
        code: 'EXTERNAL_SERVICE_ERROR',
        message: 'Gagal menghitung ongkos kirim dari RajaOngkir',
      });
    }
  }
}