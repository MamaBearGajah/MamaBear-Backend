import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBundleDto } from './dto/create-bundle.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateBundleDto extends PartialType(CreateBundleDto) {}

@Injectable()
export class BundleService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly include = {
    items: {
      include: {
        product: {
          include: { images: { where: { isFeatured: true }, take: 1 } },
        },
      },
    },
  };

  async findAll(onlyActive = false) {
    const now = new Date();
    return this.prisma.bundle.findMany({
      where: onlyActive
        ? {
            isActive: true,
            OR: [{ startDate: null }, { startDate: { lte: now } }],
            AND: [{ OR: [{ endDate: null }, { endDate: { gte: now } }] }],
          }
        : {},
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
      include: this.include,
    });
  }

  async findOne(id: string) {
    const bundle = await this.prisma.bundle.findUnique({ where: { id }, include: this.include });
    if (!bundle) throw new NotFoundException('Bundle tidak ditemukan');
    return bundle;
  }

  async findBySlug(slug: string) {
    const bundle = await this.prisma.bundle.findUnique({ where: { slug }, include: this.include });
    if (!bundle) throw new NotFoundException('Bundle tidak ditemukan');
    return bundle;
  }

  async create(dto: CreateBundleDto) {
    const existing = await this.prisma.bundle.findUnique({ where: { slug: dto.slug } });
    if (existing) throw new BadRequestException(`Slug "${dto.slug}" sudah digunakan`);

    return this.prisma.bundle.create({
      data: {
        name: dto.name,
        slug: dto.slug,
        description: dto.description,
        imageUrl: dto.imageUrl,
        publicId: dto.publicId,
        bundlePrice: dto.bundlePrice,
        discountPrice: dto.discountPrice,
        isActive: dto.isActive ?? true,
        stock: dto.stock ?? 0,
        sortOrder: dto.sortOrder ?? 0,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
        items: {
          create: dto.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
      include: this.include,
    });
  }

  async update(id: string, dto: UpdateBundleDto) {
    await this.findOne(id);
    return this.prisma.$transaction(async (tx) => {
      if (dto.items) {
        await tx.bundleItem.deleteMany({ where: { bundleId: id } });
        await tx.bundleItem.createMany({
          data: dto.items.map((item) => ({ bundleId: id, productId: item.productId, quantity: item.quantity })),
        });
      }
      return tx.bundle.update({
        where: { id },
        data: {
          ...(dto.name && { name: dto.name }),
          ...(dto.slug && { slug: dto.slug }),
          ...(dto.description !== undefined && { description: dto.description }),
          ...(dto.imageUrl && { imageUrl: dto.imageUrl }),
          ...(dto.publicId !== undefined && { publicId: dto.publicId }),
          ...(dto.bundlePrice !== undefined && { bundlePrice: dto.bundlePrice }),
          ...(dto.discountPrice !== undefined && { discountPrice: dto.discountPrice }),
          ...(dto.isActive !== undefined && { isActive: dto.isActive }),
          ...(dto.stock !== undefined && { stock: dto.stock }),
          ...(dto.sortOrder !== undefined && { sortOrder: dto.sortOrder }),
          ...(dto.startDate !== undefined && { startDate: dto.startDate ? new Date(dto.startDate) : null }),
          ...(dto.endDate !== undefined && { endDate: dto.endDate ? new Date(dto.endDate) : null }),
        },
        include: this.include,
      });
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.bundle.delete({ where: { id } });
    return { message: 'Bundle berhasil dihapus' };
  }
}
