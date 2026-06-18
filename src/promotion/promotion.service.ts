// src/promotion/promotion.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreatePromotionDto,
  UpdatePromotionDto,
  PromotionStatus,
} from './dto/create-promotion.dto';

@Injectable()
export class PromotionService {
  constructor(private readonly prisma: PrismaService) {}

  // ─── Include helper ────────────────────────────────────────────────────────

  private readonly include = {
    sections: {
      where:   { isActive: true },
      orderBy: { sortOrder: 'asc' as const },
    },
    benefits: {
      orderBy: { sortOrder: 'asc' as const },
    },
  };

  // ─── Public: Halaman promo aktif ───────────────────────────────────────────

  /**
   * Dipakai oleh frontend landing page:
   * - GET /promotions/:slug  → ambil promo by slug
   * - GET /promotions/active → ambil promo aktif saat ini (untuk homepage)
   */
  async findBySlug(slug: string) {
    const now = new Date();
    const promo = await this.prisma.promotionLanding.findUnique({
      where: { slug },
      include: this.include,
    });

    if (!promo) throw new NotFoundException('Halaman promosi tidak ditemukan');

    // Jika endDate sudah lewat → auto-update ke ended
    if (promo.endDate && promo.endDate < now && promo.status === 'active') {
      await this.prisma.promotionLanding.update({
        where: { id: promo.id },
        data: { status: 'ended' },
      });
      promo.status = 'ended' as any;
    }

    // Lampirkan hero bundle & semua bundle aktif dari BundleService
    const bundles = await this.getActiveBundlesForPromo(promo.heroBundleId);

    return { ...promo, bundles };
  }

  /**
   * Ambil satu promo aktif yang sedang berlangsung (untuk halaman /promotion).
   * Diurutkan dari yang paling baru startDate-nya.
   */
  async findActive() {
    const now = new Date();
    const promo = await this.prisma.promotionLanding.findFirst({
      where: {
        status: PromotionStatus.active,
        OR: [{ startDate: null }, { startDate: { lte: now } }],
        AND: [{ OR: [{ endDate: null }, { endDate: { gte: now } }] }],
      },
      orderBy: { startDate: 'desc' },
      include: this.include,
    });

    if (!promo) return null;

    const bundles = await this.getActiveBundlesForPromo(promo.heroBundleId);
    return { ...promo, bundles };
  }

  // ─── Admin: CRUD ───────────────────────────────────────────────────────────

  async findAll() {
    return this.prisma.promotionLanding.findMany({
      orderBy: { createdAt: 'desc' },
      include: this.include,
    });
  }

  async findOne(id: string) {
    const promo = await this.prisma.promotionLanding.findUnique({
      where: { id },
      include: this.include,
    });
    if (!promo) throw new NotFoundException('Promosi tidak ditemukan');
    return promo;
  }

  async create(dto: CreatePromotionDto) {
    const existing = await this.prisma.promotionLanding.findUnique({
      where: { slug: dto.slug },
    });
    if (existing) throw new BadRequestException(`Slug "${dto.slug}" sudah digunakan`);

    return this.prisma.promotionLanding.create({
      data: {
        title:        dto.title,
        slug:         dto.slug,
        subtitle:     dto.subtitle,
        description:  dto.description,
        badgeText:    dto.badgeText,
        startDate:    dto.startDate ? new Date(dto.startDate) : undefined,
        endDate:      dto.endDate   ? new Date(dto.endDate)   : undefined,
        status:       dto.status ?? 'draft',
        heroBundleId: dto.heroBundleId,
        sections: dto.sections?.length
          ? { create: dto.sections.map((s, i) => ({ ...s, sortOrder: s.sortOrder ?? i })) }
          : undefined,
        benefits: dto.benefits?.length
          ? { create: dto.benefits.map((b, i) => ({ ...b, sortOrder: b.sortOrder ?? i })) }
          : undefined,
      },
      include: this.include,
    });
  }

  async update(id: string, dto: UpdatePromotionDto) {
    await this.findOne(id);

    return this.prisma.$transaction(async (tx) => {
      // Ganti sections jika dikirim
      if (dto.sections !== undefined) {
        await tx.promotionSection.deleteMany({ where: { promotionId: id } });
        if (dto.sections.length > 0) {
          await tx.promotionSection.createMany({
            data: dto.sections.map((s, i) => ({
              promotionId: id,
              title:       s.title,
              subtitle:    s.subtitle,
              sortOrder:   s.sortOrder ?? i,
              isActive:    s.isActive ?? true,
            })),
          });
        }
      }

      // Ganti benefits jika dikirim
      if (dto.benefits !== undefined) {
        await tx.promotionBenefit.deleteMany({ where: { promotionId: id } });
        if (dto.benefits.length > 0) {
          await tx.promotionBenefit.createMany({
            data: dto.benefits.map((b, i) => ({
              promotionId: id,
              icon:        b.icon,
              title:       b.title,
              description: b.description,
              sortOrder:   b.sortOrder ?? i,
            })),
          });
        }
      }

      return tx.promotionLanding.update({
        where: { id },
        data: {
          ...(dto.title        !== undefined && { title:        dto.title }),
          ...(dto.slug         !== undefined && { slug:         dto.slug }),
          ...(dto.subtitle     !== undefined && { subtitle:     dto.subtitle }),
          ...(dto.description  !== undefined && { description:  dto.description }),
          ...(dto.badgeText    !== undefined && { badgeText:    dto.badgeText }),
          ...(dto.startDate    !== undefined && { startDate:    dto.startDate ? new Date(dto.startDate) : null }),
          ...(dto.endDate      !== undefined && { endDate:      dto.endDate   ? new Date(dto.endDate)   : null }),
          ...(dto.status       !== undefined && { status:       dto.status }),
          ...(dto.heroBundleId !== undefined && { heroBundleId: dto.heroBundleId }),
        },
        include: this.include,
      });
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.promotionLanding.delete({ where: { id } });
    return { message: 'Promosi berhasil dihapus' };
  }

  // ─── Helper: ambil bundle untuk promo ────────────────────────────────────

  private async getActiveBundlesForPromo(heroBundleId?: string | null) {
    const now = new Date();

    const bundles = await this.prisma.bundle.findMany({
      where: {
        isActive: true,
        OR: [{ startDate: null }, { startDate: { lte: now } }],
        AND: [{ OR: [{ endDate: null }, { endDate: { gte: now } }] }],
      },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
      include: {
        items: {
          include: {
            product: {
              select: {
                id:   true,
                name: true,
                slug: true,
              },
            },
          },
        },
      },
    });

    // Pisahkan hero bundle
    let heroBundle = heroBundleId
      ? bundles.find((b) => b.id === heroBundleId) ?? null
      : null;

    // Jika heroBundleId tidak di-set atau tidak ditemukan →
    // auto-pilih bundle dengan discountPrice tertinggi (sama seperti logika frontend)
    if (!heroBundle && bundles.length > 0) {
      heroBundle = [...bundles].sort(
        (a, b) => Number(b.discountPrice ?? b.bundlePrice) - Number(a.discountPrice ?? a.bundlePrice),
      )[0];
    }

    const collectionBundles = heroBundle
      ? bundles.filter((b) => b.id !== heroBundle!.id)
      : bundles;

    return { heroBundle, collectionBundles, allBundles: bundles };
  }
}
