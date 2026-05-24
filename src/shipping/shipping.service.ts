import { Injectable, BadGatewayException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GetCityDto, GetShippingCostDto } from './dto/create-shipping.dto.js';

@Injectable()
export class ShippingService {
  private readonly apiKey: string;
  private readonly baseUrl = 'https://api.rajaongkir.com/starter';

  constructor(private config: ConfigService) {
    this.apiKey = this.config.getOrThrow<string>('RAJAONGKIR_API_KEY');
  }

  private async rajaOngkirGet(path: string, params?: Record<string, string>) {
    const url = new URL(`${this.baseUrl}${path}`);
    if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

    const res = await fetch(url.toString(), {
      headers: { key: this.apiKey },
    });

    if (!res.ok) throw new BadGatewayException('Gagal mengambil data ongkir');
    const data = (await res.json()) as { rajaongkir: { results: unknown } };
    return data.rajaongkir.results;
  }

  private async rajaOngkirPost(path: string, body: Record<string, string>) {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: { key: this.apiKey, 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(body).toString(),
    });

    if (!res.ok) throw new BadGatewayException('Gagal menghitung ongkir');
    const data = (await res.json()) as { rajaongkir: { results: unknown } };
    return data.rajaongkir.results;
  }

  async getProvinces() {
    return this.rajaOngkirGet('/province');
  }

  async getCities(dto: GetCityDto) {
    const params: Record<string, string> = {};
    if (dto.provinceId) params['province'] = dto.provinceId;
    return this.rajaOngkirGet('/city', params);
  }

  async calculateCost(dto: GetShippingCostDto) {
    return this.rajaOngkirPost('/cost', {
      origin: dto.origin,
      destination: dto.destination,
      weight: String(dto.weight),
      courier: dto.courier,
    });
  }
}
