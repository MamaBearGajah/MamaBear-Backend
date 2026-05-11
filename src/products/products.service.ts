import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ProductQueryDto } from './dto/product-query.dto';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  async findAll(query: ProductQueryDto) {
    const {
      page = 1, limit = 20, q, categoryId,
      minPrice, maxPrice, inStock,
      sortBy = 'createdAt', sortOrder = 'desc',
    } = query;

    const where: any = { status: 'active' };
    if (q) where.OR = [
      { name: { contains: q, mode: 'insensitive' } },
      { description: { contains: q, mode: 'insensitive' } },
      { sku: { contains: q, mode: 'insensitive' } },
    ];
    if (categoryId) where.categoryId = categoryId;
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.basePrice = {
        ...(minPrice !== undefined && { gte: minPrice }),
        ...(maxPrice !== undefined && { lte: maxPrice }),
      };
    }
    if (inStock) where.stock = { gt: 0 };

    const [data, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          images: { where: { isFeatured: true }, take: 1 },
          category: true,
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data,
      meta: { page, limit, totalItems: total, totalPages: Math.ceil(total / limit) },
    };
  }

  async create(dto: CreateProductDto) {
    const productSlug = dto.slug || this.slugify(dto.name);
    const { images, variants, ...productData } = dto;

    return this.prisma.product.create({
      data: {
        ...productData,
        slug: productSlug,
        images: images ? { create: images } : undefined,
        variants: variants ? { create: variants } : undefined,
      },
      include: { images: true, variants: true, category: true },
    });
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: [
            { imageType: 'asc' },
            { sortOrder: 'asc' },
          ],
        },
        variants: true,
        category: true,
      },
    });

    if (!product) throw new NotFoundException('Product not found!');
    return product;
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        images: {
          orderBy: [
            { imageType: 'asc' },
            { sortOrder: 'asc' },
          ],
        },
        variants: true,
        category: true,
      },
    });

    if (!product) throw new NotFoundException('Product not found!');
    return product;
  }

  async update(id: string, dto: UpdateProductDto) {
    const { images, variants, ...updateData } = dto;
    const productSlug = dto.name ? this.slugify(dto.name) : undefined;

    return this.prisma.product.update({
      where: { id },
      data: {
        ...updateData,
        ...(productSlug && { slug: productSlug }),
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.product.delete({ where: { id } });
  }

  async findVariants(productId: string) {
    return this.prisma.productVariant.findMany({ where: { productId } });
  }

  async addVariant(productId: string, dto: CreateVariantDto) {
    return this.prisma.productVariant.create({
      data: { ...dto, productId },
    });
  }

  async updateVariant(id: string, dto: UpdateVariantDto) {
    return this.prisma.productVariant.update({ where: { id }, data: dto });
  }

  async removeVariant(id: string) {
    return this.prisma.productVariant.delete({ where: { id } });
  }

  async addImage(productId: string, dto: CreateImageDto) {
    if (dto.isFeatured) {
      await this.prisma.productImage.updateMany({
        where: { productId },
        data: { isFeatured: false },
      });
    }

    return this.prisma.productImage.create({
      data: { ...dto, productId },
    });
  }
  async updateImage(id: string, dto: UpdateImageDto) {
    const image = await this.prisma.productImage.findUnique({ where: { id } });
    if (!image) throw new NotFoundException('Image not found!');

    if (dto.isFeatured) {
      await this.prisma.productImage.updateMany({
        where: { productId: image.productId, NOT: { id } },
        data: { isFeatured: false },
      });
    }

    return this.prisma.productImage.update({ where: { id }, data: dto });
  }

  async removeImage(id: string) {
    const image = await this.prisma.productImage.findUnique({ where: { id } });
    if (!image) throw new NotFoundException('Image not found!');

    // TODO: delete dari Cloudinary setelah MediaService dari Ega selesai
    // await this.mediaService.deleteFile(image.publicId);

    return this.prisma.productImage.delete({ where: { id } });
  }
}