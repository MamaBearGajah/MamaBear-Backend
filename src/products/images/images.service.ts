import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { MediaService } from '../../media/media.service';
import { CreateImageDto } from '../dto/create-image.dto';
import { UpdateImageDto } from '../dto/update-image.dto';
import { ReorderImagesDto } from '../dto/reorder-images.dto';

@Injectable()
export class ImagesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mediaService: MediaService,
  ) {}

  // ─── GET ALL ──────────────────────────────────────────────────────────────

  async findAll(productId: string) {
    await this.validateProduct(productId);
    return this.prisma.productImage.findMany({
      where: { productId },
      orderBy: { sortOrder: 'asc' },
    });
  }

  // ─── ADD IMAGE ────────────────────────────────────────────────────────────

  async addImage(productId: string, dto: CreateImageDto) {
    await this.validateProduct(productId);

    // Jika isFeatured, unset featured yang sebelumnya
    if (dto.isFeatured) {
      await this.prisma.productImage.updateMany({
        where: { productId, isFeatured: true },
        data: { isFeatured: false },
      });
    }

    // Auto sortOrder — taruh di akhir
    const lastImage = await this.prisma.productImage.findFirst({
      where: { productId },
      orderBy: { sortOrder: 'desc' },
    });
    const sortOrder = dto.sortOrder ?? (lastImage ? lastImage.sortOrder + 1 : 0);

    return this.prisma.productImage.create({
      data: { ...dto, productId, sortOrder },
    });
  }

  // ─── SET FEATURED ─────────────────────────────────────────────────────────

  async setFeatured(productId: string, imageId: string) {
    await this.validateImage(productId, imageId);

    // Unset semua featured dulu
    await this.prisma.productImage.updateMany({
      where: { productId, isFeatured: true },
      data: { isFeatured: false },
    });

    return this.prisma.productImage.update({
      where: { id: imageId },
      data: { isFeatured: true },
    });
  }

  // ─── REORDER ──────────────────────────────────────────────────────────────

  async reorder(productId: string, dto: ReorderImagesDto) {
    await this.validateProduct(productId);

    await this.prisma.$transaction(
      dto.imageIds.map((imageId, index) =>
        this.prisma.productImage.updateMany({
          where: { id: imageId, productId },
          data: { sortOrder: index },
        }),
      ),
    );

    return this.findAll(productId);
  }

  // ─── UPDATE IMAGE ─────────────────────────────────────────────────────────

  async updateImage(productId: string, imageId: string, dto: UpdateImageDto) {
    await this.validateImage(productId, imageId);

    // Jika set isFeatured = true, unset yang lain
    if (dto.isFeatured) {
      await this.prisma.productImage.updateMany({
        where: { productId, isFeatured: true },
        data: { isFeatured: false },
      });
    }

    return this.prisma.productImage.update({
      where: { id: imageId },
      data: dto,
    });
  }

  // ─── DELETE IMAGE ─────────────────────────────────────────────────────────

  async removeImage(productId: string, imageId: string) {
    const image = await this.validateImage(productId, imageId);

    // Hapus dari Cloudinary jika ada publicId
    if (image.publicId) {
      try {
        await this.mediaService.deleteFile(image.publicId);
      } catch (err) {
        console.error('Gagal hapus dari Cloudinary:', err);
        // Tetap lanjut hapus dari DB
      }
    }

    return this.prisma.productImage.delete({ where: { id: imageId } });
  }

  // ─── PRIVATE HELPERS ──────────────────────────────────────────────────────

  private async validateProduct(productId: string) {
    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new NotFoundException('Produk tidak ditemukan');
    return product;
  }

  private async validateImage(productId: string, imageId: string) {
    const image = await this.prisma.productImage.findFirst({
      where: { id: imageId, productId },
    });
    if (!image) throw new NotFoundException('Gambar tidak ditemukan di produk ini');
    return image;
  }
}