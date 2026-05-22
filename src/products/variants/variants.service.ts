import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateVariantDto } from '../dto/create-variant.dto';
import { UpdateVariantDto } from '../dto/update-variant.dto';
import { UpdateVariantImagesBatchDto } from '../dto/update-batch-variant-images.dto';

@Injectable()
export class VariantsService {
  constructor(private readonly prisma: PrismaService) {}

  // ─── STOCK HELPER ────────────────────────────────────────────────────────────

  /**
   * Sync stock produk induk dari total stock semua variant aktif.
   * Dipanggil setiap kali variant ditambah/diupdate/dihapus.
   */
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
            name: true,   // ✅ nama produk
            stock: true,  // ✅ stok produk induk
            category: { select: { id: true, name: true, slug: true } },  // ✅ nama kategori
          },
        },
      },
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
            name: true,   // ✅ nama produk
            slug: true,
            stock: true,  // ✅ stok produk induk
            category: { select: { id: true, name: true, slug: true } },  // ✅ nama kategori
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

    await this.syncProductStock(productId);  // ✅ sync stok produk induk
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

    await this.syncProductStock(productId);  // ✅ sync stok produk induk
    return variant;
  }

  // ─── DELETE VARIANT ──────────────────────────────────────────────────────────

  async removeVariant(productId: string, variantId: string) {
    const existing = await this.prisma.productVariant.findFirst({
      where: { id: variantId, productId },
    });
    if (!existing) throw new NotFoundException('Varian tidak ditemukan di produk ini');

    const variant = await this.prisma.productVariant.delete({ where: { id: variantId } });

    await this.syncProductStock(productId);  // ✅ sync stok produk induk
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