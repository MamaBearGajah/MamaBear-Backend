import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateVariantDto } from '../dto/create-variant.dto';
import { UpdateVariantDto } from '../dto/update-variant.dto';
import { UpdateVariantImagesBatchDto } from '../dto/update-batch-variant-images.dto';

@Injectable()
export class VariantsService {
  constructor(private readonly prisma: PrismaService) {}

  // ─── GET ALL VARIANTS ────────────────────────────────────────────────────────

  async findVariants(productId: string) {
    return this.prisma.productVariant.findMany({
      where: { productId },
      orderBy: { createdAt: 'asc' },
    });
  }

  // ─── GET ONE VARIANT ─────────────────────────────────────────────────────────

  /**
   * Dipakai admin dashboard untuk pre-fill form edit variant.
   * Include product.name dan category.name.
   */
  async findOneVariant(productId: string, variantId: string) {
    const variant = await this.prisma.productVariant.findFirst({
      where: { id: variantId, productId },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
            category: {
              select: { id: true, name: true, slug: true },
            },
          },
        },
      },
    });

    if (!variant) throw new NotFoundException('Varian tidak ditemukan di produk ini');

    return variant;  // ✅ tidak ada reservedStock, jadi tidak hitung availableStock
  }

  // ─── ADD VARIANT ─────────────────────────────────────────────────────────────

  async addVariant(productId: string, dto: CreateVariantDto) {
    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new NotFoundException('Produk tidak ditemukan');

    return this.prisma.productVariant.create({
      data: { ...dto, productId },
    });
  }

  // ─── UPDATE VARIANT ──────────────────────────────────────────────────────────

  async updateVariant(productId: string, variantId: string, dto: UpdateVariantDto) {
    const existing = await this.prisma.productVariant.findFirst({
      where: { id: variantId, productId },
    });
    if (!existing) throw new NotFoundException('Varian tidak ditemukan di produk ini');

    return this.prisma.productVariant.update({
      where: { id: variantId },
      data: dto,
    });
  }

  // ─── DELETE VARIANT ──────────────────────────────────────────────────────────

  async removeVariant(productId: string, variantId: string) {
    const existing = await this.prisma.productVariant.findFirst({
      where: { id: variantId, productId },
    });
    if (!existing) throw new NotFoundException('Varian tidak ditemukan di produk ini');

    return this.prisma.productVariant.delete({ where: { id: variantId } });
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