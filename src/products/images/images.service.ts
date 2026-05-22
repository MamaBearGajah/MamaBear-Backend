import { UpdateImageDto } from './../dto/update-image.dto';
import { CreateImageDto } from './../dto/create-image.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ImagesService {
  constructor(private readonly prisma: PrismaService) {}
  // Add Product Image
  async addImage(productId: string, dto: CreateImageDto) {
    return this.prisma.productImage.create({
      data: { ... dto, productId }
    })
  }

  // Update Product Image
  async updateImage(id: string, dto: UpdateImageDto) {
    return this.prisma.productImage.update({
      where: { id },
      data: dto,
    })
  }

  // Delete Product Image
  async removeImage(id: string) {
    return this.prisma.productImage.delete({
      where: { id },
    })
  }
}
