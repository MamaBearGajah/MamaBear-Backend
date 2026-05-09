import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryQueryDto } from './dto/category-query.dto';
import { ProductQueryDto } from 'src/products/dto/product-query.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: CategoryQueryDto) {
    const { isActive, parentId, page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;

    const where = {
      ...(isActive !== undefined && { isActive }),
      ...(parentId !== undefined && { parentId }),
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.category.findMany({
        where,
        skip,
        take: limit,
        orderBy: { sortOrder: 'asc' },
        include: { children: true },
      }),
      this.prisma.category.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        children: true,
        parent: true,
        products: {
          where: { status: 'active' },
          select: { id: true, name: true, slug: true, basePrice: true, mainImage: true },
        },
      },
    });

    if (!category) throw new NotFoundException(`Kategori dengan id ${id} tidak ditemukan`);
    return category;
  }

  async create(dto: CreateCategoryDto) {
    const existing = await this.prisma.category.findUnique({ where: { slug: dto.slug } });
    if (existing) throw new ConflictException(`Slug '${dto.slug}' sudah digunakan`);

    if (dto.parentId) {
      const parent = await this.prisma.category.findUnique({ where: { id: dto.parentId } });
      if (!parent) throw new NotFoundException(`Kategori parent tidak ditemukan`);
    }

    return this.prisma.category.create({ data: dto });
  }

  async update(id: string, dto: UpdateCategoryDto) {
    await this.findOne(id);

    if (dto.slug) {
      const existing = await this.prisma.category.findFirst({
        where: { slug: dto.slug, NOT: { id } },
      });
      if (existing) throw new ConflictException(`Slug '${dto.slug}' sudah digunakan`);
    }

    return this.prisma.category.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { products: true, children: true },
    });

    if (!category) throw new NotFoundException(`Kategori dengan id ${id} tidak ditemukan`);
    if (category.products.length > 0)
      throw new ConflictException(`Kategori masih memiliki ${category.products.length} produk, tidak bisa dihapus`);
    if (category.children.length > 0)
      throw new ConflictException(`Kategori masih memiliki sub-kategori, tidak bisa dihapus`);

    return this.prisma.category.delete({ where: { id } });
  }

  async findProducts(id: string) {
  await this.findOne(id); // validasi kategori ada

  return this.prisma.product.findMany({
    where: { categoryId: id },
    select: {
      id: true,
      name: true,
      slug: true,
      basePrice: true,
      discountPrice: true,
      mainImage: true,
      stock: true,
      status: true,
    },
  });
}

  
}
