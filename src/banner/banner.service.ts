import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CacheService } from '../cache/cache.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';

const CACHE_KEY = 'banners:active';
const CACHE_TTL = 60; // detik — diperpendek dari 300 agar banner time-based tidak stale

@Injectable()
export class BannerService {
  private readonly logger = new Logger(BannerService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheService,
  ) {}

  async getActiveBanners() {
    try {
      const cached = await this.cache.get<any[]>(CACHE_KEY);
      if (cached) return cached;
    } catch {
      // Redis down — lanjut query DB
    }

    const now = new Date();
    const banners = await this.prisma.banner.findMany({
      where: {
        isActive: true,
        OR: [{ startDate: null }, { startDate: { lte: now } }],
        AND: [{ OR: [{ endDate: null }, { endDate: { gte: now } }] }],
      },
      orderBy: { sortOrder: 'asc' },
    });

    try {
      await this.cache.set(CACHE_KEY, banners, CACHE_TTL);
    } catch {
      // Redis down — tidak masalah, next request akan query DB lagi
    }

    return banners;
  }

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
    await this.invalidateCache();
    return banner;
  }

  async findAll() {
    return this.prisma.banner.findMany({
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });
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
        ...(dto.startDate !== undefined && {
          startDate: dto.startDate ? new Date(dto.startDate) : null,
        }),
        ...(dto.endDate !== undefined && {
          endDate: dto.endDate ? new Date(dto.endDate) : null,
        }),
      },
    });
    await this.invalidateCache();
    return banner;
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.banner.delete({ where: { id } });
    await this.invalidateCache();
    return { message: 'Banner berhasil dihapus' };
  }

  private async invalidateCache() {
    try {
      await this.cache.del(CACHE_KEY);
    } catch (err) {
      this.logger.warn(`Gagal invalidate cache banner: ${err}`);
    }
  }
}