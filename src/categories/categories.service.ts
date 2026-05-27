import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CacheService } from 'src/cache/cache.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryQueryDto } from './dto/category-query.dto';
import { ProductQueryDto } from 'src/products/dto/product-query.dto';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheService,
  ) {}

  async findAll(query: CategoryQueryDto) {
    const cacheKey = CacheService.keys.categories(JSON.stringify(query));
    const cached = await this.cache.get(cacheKey);
    if (cached) return cached;

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

    const result = {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };

    await this.cache.set(cacheKey, result, 60 * 10); // 10 menit
    return result;
  }

  async findOne(id: string) {
    const cacheKey = CacheService.keys.category(id);
    const cached = await this.cache.get(cacheKey);
    if (cached) return cached;

    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        children: true,
        parent: true,
        products: {
          where: { status: 'active' },
          select: {
            id: true,
            name: true,
            slug: true,
            basePrice: true,
            discountPrice: true,
            status: true,
            images: {
              where: { isFeatured: true },
              take: 1,
              select: { imageUrl: true, altText: true },
            },
          },
        },
      },
    });

    if (!category) throw new NotFoundException(`Kategori dengan id ${id} tidak ditemukan`);

    await this.cache.set(cacheKey, category, 60 * 10);
    return category;
  }

  // ─── Breadcrumb ────────────────────────────────────────────────────────────

  async getBreadcrumb(id: string) {
    const breadcrumb: Array<{ id: string; name: string; slug: string }> = [];
    let currentId: string | null = id;

    while (currentId) {
      const category = await this.prisma.category.findUnique({
        where: { id: currentId },
        select: { id: true, name: true, slug: true, parentId: true },
      });

      if (!category) break;

      breadcrumb.unshift({ id: category.id, name: category.name, slug: category.slug });
      currentId = category.parentId;
    }

    if (breadcrumb.length === 0 || breadcrumb[0].id !== id) {
      throw new NotFoundException(`Kategori dengan id ${id} tidak ditemukan`);
    }

    return breadcrumb;
  }

  // ─── CRUD ──────────────────────────────────────────────────────────────────

  async create(dto: CreateCategoryDto) {
    const existing = await this.prisma.category.findUnique({ where: { slug: dto.slug } });
    if (existing) throw new ConflictException(`Slug '${dto.slug}' sudah digunakan`);

    if (dto.parentId) {
      const parent = await this.prisma.category.findUnique({ where: { id: dto.parentId } });
      if (!parent) throw new NotFoundException(`Kategori parent tidak ditemukan`);
    }

    const category = await this.prisma.category.create({ data: dto });
    await this.invalidateCategoryCache();
    return category;
  }

  async update(id: string, dto: UpdateCategoryDto) {
    await this.findOne(id);

    if (dto.slug) {
      const existing = await this.prisma.category.findFirst({
        where: { slug: dto.slug, NOT: { id } },
      });
      if (existing) throw new ConflictException(`Slug '${dto.slug}' sudah digunakan`);
    }

    if (dto.parentId) {
      if (dto.parentId === id) {
        throw new ConflictException('Kategori tidak boleh menjadi parent dari dirinya sendiri');
      }

      let checkParentId: string | null = dto.parentId;

      while (checkParentId) {
        const parentCategory = await this.prisma.category.findUnique({
          where: { id: checkParentId },
          select: { id: true, parentId: true },
        });

        if (!parentCategory) {
          throw new NotFoundException(`Kategori parent dengan id ${checkParentId} tidak ditemukan`);
        }

        if (parentCategory.parentId === id) {
          throw new ConflictException('Circular parent detected! Kategori tidak boleh menjadi sub-kategori dari keturunannya sendiri.');
        }

        checkParentId = parentCategory.parentId;
      }
    }

    const category = await this.prisma.category.update({ where: { id }, data: dto });
    await this.invalidateCategoryCache(id);
    return category;
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

    const deleted = await this.prisma.category.delete({ where: { id } });
    await this.invalidateCategoryCache(id);
    return deleted;
  }

  // ─── Products in category (rekursif ke sub-kategori) ───────────────────────

  async findProducts(id: string, query: ProductQueryDto) {
    await this.findOne(id); // validasi category exists

    const cacheKey = CacheService.keys.categoryProducts(id, JSON.stringify(query));
    const cached = await this.cache.get(cacheKey);
    if (cached) return cached;

    const { page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;

    // Ambil semua descendant category IDs (termasuk dirinya sendiri)
    const categoryIds = await this.getAllDescendantIds(id);

    const where: any = {
      categoryId: { in: categoryIds },
      ...(query.q && { name: { contains: query.q, mode: 'insensitive' as const } }),
      ...(query.minPrice !== undefined && { basePrice: { gte: query.minPrice } }),
      ...(query.maxPrice !== undefined && { basePrice: { lte: query.maxPrice } }),
      ...(query.inStock && { stock: { gt: 0 } }),
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [query.sortBy ?? 'createdAt']: query.sortOrder ?? 'desc' },
        select: {
          id: true,
          name: true,
          slug: true,
          basePrice: true,
          discountPrice: true,
          stock: true,
          status: true,
          categoryId: true,
          category: { select: { id: true, name: true, slug: true } },
          images: {
            where: { isFeatured: true },
            take: 1,
            select: { imageUrl: true, altText: true },
          },
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    const result = {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };

    await this.cache.set(cacheKey, result, 60 * 2); // 2 menit
    return result;
  }

  // ─── Private Helpers ───────────────────────────────────────────────────────

  private async getAllDescendantIds(categoryId: string): Promise<string[]> {
    const ids: string[] = [categoryId];
    const queue = [categoryId];

    while (queue.length > 0) {
      const parentId = queue.shift()!;
      const children = await this.prisma.category.findMany({
        where: { parentId },
        select: { id: true },
      });
      for (const child of children) {
        ids.push(child.id);
        queue.push(child.id);
      }
    }

    return ids;
  }

  private async invalidateCategoryCache(id?: string) {
    await this.cache.delByPattern('categories:*');
    if (id) await this.cache.del(CacheService.keys.category(id));
  }
}