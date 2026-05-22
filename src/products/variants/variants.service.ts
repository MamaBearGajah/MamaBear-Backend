import { UpdateVariantDto } from './../dto/update-variant.dto';
import { CreateVariantDto } from './../dto/create-variant.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateVariantImagesBatchDto } from '../dto/update-batch-variant-images.dto';

@Injectable()
export class VariantsService {
    constructor(private readonly prisma:PrismaService) {}
    // Get All Variants
    async findVariants(productId: string) {
      return this.prisma.productVariant.findMany({
        where: { productId },
      })
    }

    // Add Product Variant
    async addVariant(productId: string, dto: CreateVariantDto) {
      return this.prisma.productVariant.create({
        data: { ...dto, productId }
      })
    }

    // Update Variant
    async updateVariant(id: string, dto: UpdateVariantDto) {
      return this.prisma.productVariant.update({
        where: { id },
        data: dto,
      })
    }

    // Delete Variant
    async removeVariant(id: string) {
      return this.prisma.productVariant.delete({
        where: { id },
      })
    }

    // Set ImageUrl Variant
    async setVariantImage(productId: string, variantId: string, imageUrl: string) {
      const variant = await this.prisma.productVariant.findFirst({
        where: { id: variantId, productId },
      })

      if (!variant) throw new NotFoundException('Varian tidak ditemukan di produk ini')

      return this.prisma.productVariant.update({
        where: { id: variantId },
        data: { imageUrl },
      })
    }

    // Delete ImageUrl Variant
    async deleteVariantImage(productId: string, variantId: string) {
      const variant = await this.prisma.productVariant.findFirst({
        where: { id: variantId, productId },
      })

      if (!variant) throw new NotFoundException('Varian tidak ditemukan di produk ini')
      
      return this.prisma.productVariant.update({
        where: { id: variantId },
        data: { imageUrl: null }, 
      })
    }

    // Batch Update ImageUrl Many Variants
    async batchUpdateVariantImages(productId: string, dto: UpdateVariantImagesBatchDto) {
      return this.prisma.$transaction(dto.variants.map((item) => this.prisma.productVariant.updateMany({
          where: { id: item.variantId, productId: productId },
          data: { imageUrl: item.imageUrl },
        }))
      )
    }
}
