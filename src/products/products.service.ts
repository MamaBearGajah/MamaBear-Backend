import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { ProductQueryDto } from './dto/product-query.dto.js';
import { CreateVariantDto } from './dto/create-variant.dto.js';
import { UpdateVariantDto } from './dto/update-variant.dto.js';
import { CreateImageDto } from './dto/create-image.dto.js';
import { UpdateImageDto } from './dto/update-image.dto.js';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  
  private slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
  }

  // Get All Products
  async findAll(query: ProductQueryDto) {
    const { page = 1, limit = 20, q, categoryId, minPrice, maxPrice, inStock, sortBy = 'createdAt', sortOrder = 'desc' } = query
  
    const where: any = { status: 'active' }
    if (q) where.OR = [
      { name: { contains: q, mode: 'insensitive' } },
      { description: { contains: q, mode: 'insensitive' } },
      { sku: { contains: q, mode: 'insensitive' } },
    ]
    if (categoryId) where.categoryId = categoryId
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.basePrice = {
        ...(minPrice !== undefined && { gte: minPrice }),
        ...(maxPrice !== undefined && { lte: maxPrice }),
      }
    }
    if (inStock) where.stock = { gt: 0 }
  
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
    ])

    return { data, meta: { page, limit, totalItems: total, totalPages: Math.ceil(total / limit) } }
  }

  // Create Product
  async create(dto: CreateProductDto) {
    const productSlug = dto.slug || this.slugify(dto.name)

    const existing = await this.prisma.product.findFirst({
      where: {
        OR: [{ slug: productSlug }, { sku: dto.sku }]
      }
    })

    const { images, variants, ...productData } = dto
    
    return this.prisma.product.create({
      data: {
        ...productData,
        slug: productSlug,
        images: images ? { create: images } : undefined,
        variants: variants ? { create: variants } : undefined,
      },
      include: {
        images: true,
        variants: true,
        category: true,
      },
    })
  }

  // Find Product by ID
  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { images: true, variants: true, category: true },
    })
    
    if (!product) throw new NotFoundException('Product not found!')
    return product
  }

  // Find Product by Slug
  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: { images: true, variants: true, category: true },
    })

    if (!product) throw new NotFoundException('Product not found!')
    return product
  }

  // Update Product by ID
  async update(id: string, dto: UpdateProductDto) {
    const { images, variants, ...updateData } = dto
    const ProductSlug = dto.name ? this.slugify(dto.name) : undefined

    return this.prisma.product.update({
      where: { id }, 
      data: {
        ...updateData,
        ...(ProductSlug && { slug: ProductSlug }),
      },
    })
  }

  // Delete Product by ID
  async remove(id:string) {
    await this.findOne(id)
    return this.prisma.product.delete({ where: { id } })
  }

  // Get All Variants
  async findVariants(productId: string) {
    return this.prisma.productVariant.findMany({
      where: { productId },
    })
  }

  // Add Product Variant
  async addVariant(productId: string, dto: CreateVariantDto) {
    if (dto.stock !== undefined && dto.stock < 0)
      throw new BadRequestException('Stok varian tidak boleh negatif');
    return this.prisma.productVariant.create({
      data: { ...dto, productId }
    })
  }

  // Update Variant
  async updateVariant(id: string, dto: UpdateVariantDto) {
    if (dto.stock !== undefined && dto.stock < 0)
      throw new BadRequestException('Stok varian tidak boleh negatif');
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

  // Batch update imageUrl untuk array variantId
  async batchUpdateVariantImages(
    productId: string,
    items: { variantId: string; imageUrl: string; altText?: string }[],
  ) {
    const results = await Promise.all(
      items.map(async (item) => {
        const variant = await this.prisma.productVariant.findFirst({
          where: { id: item.variantId, productId },
        });
        if (!variant) {
          return { variantId: item.variantId, status: 'failed', message: 'Variant tidak ditemukan' };
        }
        await this.prisma.productVariant.update({
          where: { id: item.variantId },
          data: { imageUrl: item.imageUrl },
        });
        return { variantId: item.variantId, status: 'updated' };
      }),
    );

    return {
      updated: results.filter((r) => r.status === 'updated').length,
      failed: results.filter((r) => r.status === 'failed').length,
      results,
    };
  }

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
