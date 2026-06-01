import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CacheService } from '../../cache/cache.service';
import { CreateVariantDto } from '../dto/create-variant.dto';
import { UpdateVariantDto } from '../dto/update-variant.dto';
import { UpdateVariantImagesBatchDto } from '../dto/update-batch-variant-images.dto';

@Injectable()
export class VariantsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheService,
  ) {}

  // ─── STOCK HELPER ────────────────────────────────────────────────────────────

  private async syncProductStock(productId: string) {
    const result = await this.prisma.productVariant.aggregate({
      where: { productId, isActive: true },
      _sum: { stock: true },
    });

    const hasVariants = await this.prisma.productVariant.count({ where: { productId } });

    if (hasVariants > 0) {
      await this.prisma.product.update({
        where: { id: productId },
        data: { stock: result._sum.stock ?? 0 },
      });
    }

    // FIX: Invalidate cache setelah stock berubah
    await this.cache.del(CacheService.keys.product(productId));
    await this.cache.delByPattern('products:list:*');
    await this.cache.delByPattern('products:best-sellers:*');
  }

  // ─── GET ALL VARIANTS ────────────────────────────────────────────────────────

  async findVariants(productId: string) {
    return this.prisma.productVariant.findMany({
      where: { productId },
      orderBy: { createdAt: 'asc' },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            stock: true,
            category: { select: { id: true, name: true, slug: true } },
          },
        },
      },
    });
  }

  // ─── GET ONE VARIANT ─────────────────────────────────────────────────────────

  async findOneVariant(productId: string, variantId: string) {
    const variant = await this.prisma.productVariant.findFirst({
      where: { id: variantId, productId },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
            stock: true,
            category: { select: { id: true, name: true, slug: true } },
          },
        },
      },
    });

    if (!variant) throw new NotFoundException('Varian tidak ditemukan di produk ini');
    return variant;
  }

  // ─── ADD VARIANT ─────────────────────────────────────────────────────────────

  async addVariant(productId: string, dto: CreateVariantDto) {
    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new NotFoundException('Produk tidak ditemukan');

    const variant = await this.prisma.productVariant.create({
      data: { ...dto, productId },
    });

    await this.syncProductStock(productId);
    return variant;
  }

  // ─── UPDATE VARIANT ──────────────────────────────────────────────────────────

  async updateVariant(productId: string, variantId: string, dto: UpdateVariantDto) {
    const existing = await this.prisma.productVariant.findFirst({
      where: { id: variantId, productId },
    });
    if (!existing) throw new NotFoundException('Varian tidak ditemukan di produk ini');

    const variant = await this.prisma.productVariant.update({
      where: { id: variantId },
      data: dto,
    });

    await this.syncProductStock(productId);
    return variant;
  }

  // ─── DELETE VARIANT ──────────────────────────────────────────────────────────

  async removeVariant(productId: string, variantId: string) {
    const existing = await this.prisma.productVariant.findFirst({
      where: { id: variantId, productId },
    });
    if (!existing) throw new NotFoundException('Varian tidak ditemukan di produk ini');

    const variant = await this.prisma.productVariant.delete({ where: { id: variantId } });

    await this.syncProductStock(productId);
    return variant;
  }

  // ─── SET VARIANT IMAGE ───────────────────────────────────────────────────────

  async setVariantImage(productId: string, variantId: string, imageUrl: string) {
    const variant = await this.prisma.productVariant.findFirst({
      where: { id: variantId, productId },
    });
    if (!variant) throw new NotFoundException('Varian tidak ditemukan di produk ini');

    return this.prisma.productVariant.update({
      where: { id: variantId },
      data: { imageUrl },
    });
  }

  // ─── DELETE VARIANT IMAGE ────────────────────────────────────────────────────

  async deleteVariantImage(productId: string, variantId: string) {
    const variant = await this.prisma.productVariant.findFirst({
      where: { id: variantId, productId },
    });
    if (!variant) throw new NotFoundException('Varian tidak ditemukan di produk ini');

    return this.prisma.productVariant.update({
      where: { id: variantId },
      data: { imageUrl: null },
    });
  }

  // ─── BATCH UPDATE VARIANT IMAGES ─────────────────────────────────────────────

  async batchUpdateVariantImages(productId: string, dto: UpdateVariantImagesBatchDto) {
    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new NotFoundException('Produk tidak ditemukan');

    return this.prisma.$transaction(
      dto.variants.map((item) =>
        this.prisma.productVariant.updateMany({
          where: { id: item.variantId, productId },
          data: { imageUrl: item.imageUrl },
        }),
      ),
    );
  }
}