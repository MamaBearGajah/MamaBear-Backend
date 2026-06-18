import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CacheService } from '../cache/cache.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';

const CACHE_KEY = 'banners:active';
const CACHE_TTL = 300; // 5 menit

@Injectable()
export class BannerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheService,
  ) {}

  // ─── Public: Get Active Banners ──────────────────────────────────────────
  async getActiveBanners() {
    const cached = await this.cache.get<any[]>(CACHE_KEY);
    if (cached) return cached;

    const now = new Date();
    const banners = await this.prisma.banner.findMany({
      where: {
        isActive: true,
        OR: [{ startDate: null }, { startDate: { lte: now } }],
        AND: [{ OR: [{ endDate: null }, { endDate: { gte: now } }] }],
      },
      orderBy: { sortOrder: 'asc' },
    });

    await this.cache.set(CACHE_KEY, banners, CACHE_TTL);
    return banners;
  }

  // ─── Admin: CRUD ─────────────────────────────────────────────────────────
  async create(dto: CreateBannerDto) {
    const banner = await this.prisma.banner.create({
      data: {
        imageUrl: dto.imageUrl,
        altText: dto.altText,
        label: dto.label,
        title: dto.title,
        desc: dto.desc,
        path: dto.path,
        isActive: dto.isActive ?? true,
        sortOrder: dto.sortOrder ?? 0,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
      },
    });
    await this.cache.del(CACHE_KEY);
    return banner;
  }

  async findAll() {
    return this.prisma.banner.findMany({ orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }] });
  }

  async findOne(id: string) {
    const banner = await this.prisma.banner.findUnique({ where: { id } });
    if (!banner) throw new NotFoundException('Banner tidak ditemukan');
    return banner;
  }

  async update(id: string, dto: UpdateBannerDto) {
    await this.findOne(id);
    const banner = await this.prisma.banner.update({
      where: { id },
      data: {
        ...(dto.imageUrl && { imageUrl: dto.imageUrl }),
        ...(dto.altText !== undefined && { altText: dto.altText }),
        ...(dto.label !== undefined && { label: dto.label }),
        ...(dto.title !== undefined && { title: dto.title }),
        ...(dto.desc !== undefined && { desc: dto.desc }),
        ...(dto.path !== undefined && { path: dto.path }),
        ...(dto.isActive !== undefined && { isActive: dto.isActive }),
        ...(dto.sortOrder !== undefined && { sortOrder: dto.sortOrder }),
        ...(dto.startDate !== undefined && { startDate: dto.startDate ? new Date(dto.startDate) : null }),
        ...(dto.endDate !== undefined && { endDate: dto.endDate ? new Date(dto.endDate) : null }),
      },
    });
    await this.cache.del(CACHE_KEY);
    return banner;
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.banner.delete({ where: { id } });
    await this.cache.del(CACHE_KEY);
    return { message: 'Banner berhasil dihapus' };
  }
}
