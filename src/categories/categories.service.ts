import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CacheService } from 'src/cache/cache.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryQueryDto } from './dto/category-query.dto';
import { ProductQueryDto } from 'src/products/dto/product-query.dto';

// Include children aktif saja, rekursif 4 level sesuai struktur:
// Moms & Baby > Maternity Supplies > ASI Booster > Teh/Kookie/Kapsul
const CHILDREN_INCLUDE = {
  where: { isActive: true },
  orderBy: { sortOrder: 'asc' as const },
  include: {
    children: {
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' as const },
      include: {
        children: {
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' as const },
          include: {
            children: {
              where: { isActive: true },
              orderBy: { sortOrder: 'asc' as const },
            },
          },
        },
      },
    },
  },
};

@Injectable()
export class CategoriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheService,
  ) {}

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  // ─── FIND ALL ─────────────────────────────────────────────────────────────

  async findAll(query: CategoryQueryDto) {
    const cacheKey = CacheService.keys.categories(JSON.stringify(query));
    const cached = await this.cache.get(cacheKey);
    if (cached) return cached;

    const { isActive, parentId, page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;

    const where: any = {
      ...(isActive !== undefined && { isActive }),
      ...(parentId !== undefined && { parentId }),
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.category.findMany({
        where,
        skip,
        take: limit,
        orderBy: { sortOrder: 'asc' },
        include: { children: CHILDREN_INCLUDE },
      }),
      this.prisma.category.count({ where }),
    ]);

    const result = {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };

    await this.cache.set(cacheKey, result, 60 * 10);
    return result;
  }

  // ─── FIND ONE ─────────────────────────────────────────────────────────────

  async findOne(id: string) {
    const cacheKey = CacheService.keys.category(id);
    const cached = await this.cache.get(cacheKey);
    if (cached) return cached;

    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        children: CHILDREN_INCLUDE,
        parent: true,
      },
    });

    if (!category) throw new NotFoundException(`Kategori dengan id ${id} tidak ditemukan`);

    await this.cache.set(cacheKey, category, 60 * 10);
    return category;
  }

  // ─── BREADCRUMB ───────────────────────────────────────────────────────────

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

    if (breadcrumb.length === 0 || breadcrumb[breadcrumb.length - 1].id !== id) {
      throw new NotFoundException(`Kategori dengan id ${id} tidak ditemukan`);
    }

    return breadcrumb;
  }

  // ─── CREATE ───────────────────────────────────────────────────────────────

  async create(dto: CreateCategoryDto) {
    const slug = dto.slug || this.slugify(dto.name);

    const existing = await this.prisma.category.findUnique({ where: { slug } });
    if (existing) throw new ConflictException(`Slug '${slug}' sudah digunakan`);

    if (dto.parentId) {
      const parent = await this.prisma.category.findUnique({ where: { id: dto.parentId } });
      if (!parent) throw new NotFoundException('Kategori parent tidak ditemukan');
    }

    const category = await this.prisma.category.create({
      data: { ...dto, slug },
    });

    await this.invalidateCategoryCache();
    return category;
  }

  // ─── UPDATE ───────────────────────────────────────────────────────────────

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

        if (parentCategory.id === id) {
          throw new ConflictException(
            'Circular reference terdeteksi! Kategori tidak boleh menjadi sub-kategori dari keturunannya sendiri.',
          );
        }

        checkParentId = parentCategory.parentId;
      }
    }

    const category = await this.prisma.category.update({ where: { id }, data: dto });
    await this.invalidateCategoryCache(id);
    return category;
  }

  // ─── DELETE ───────────────────────────────────────────────────────────────

  async remove(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { products: true, children: true },
    });

    if (!category) throw new NotFoundException(`Kategori dengan id ${id} tidak ditemukan`);

    if (category.products.length > 0) {
      throw new ConflictException(
        `Kategori masih memiliki ${category.products.length} produk, tidak bisa dihapus`,
      );
    }

    if (category.children.length > 0) {
      throw new ConflictException(
        `Kategori masih memiliki ${category.children.length} sub-kategori, tidak bisa dihapus`,
      );
    }

    const deleted = await this.prisma.category.delete({ where: { id } });
    await this.invalidateCategoryCache(id);
    return deleted;
  }

  // ─── PRODUCTS IN CATEGORY (rekursif) ─────────────────────────────────────

  async findProducts(id: string, query: ProductQueryDto) {
    await this.findOne(id);

    const cacheKey = CacheService.keys.categoryProducts(id, JSON.stringify(query));
    const cached = await this.cache.get(cacheKey);
    if (cached) return cached;

    const { page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;

    const categoryIds = await this.getAllDescendantIds(id);
    const andConditions: any[] = [];

    // Keyword search
    if (query.q) {
      andConditions.push({
        OR: [
          { name:        { contains: query.q, mode: 'insensitive' as const } },
          { description: { contains: query.q, mode: 'insensitive' as const } },
        ],
      });
    }

    // Price filter: COALESCE discountPrice → basePrice
    if (query.minPrice !== undefined || query.maxPrice !== undefined) {
      andConditions.push({
        OR: [
          {
            discountPrice: {
              not: null,
              ...(query.minPrice !== undefined && { gte: query.minPrice }),
              ...(query.maxPrice !== undefined && { lte: query.maxPrice }),
            },
          },
          {
            discountPrice: null,
            basePrice: {
              ...(query.minPrice !== undefined && { gte: query.minPrice }),
              ...(query.maxPrice !== undefined && { lte: query.maxPrice }),
            },
          },
        ],
      });
    }

    // Variant filter — ikut masuk AND agar tidak konflik dengan filter lain
    if (query.variantName || query.variantValue) {
      andConditions.push({
        variants: {
          some: {
            isActive: true,
            ...(query.variantName  && { name:  { contains: query.variantName,  mode: 'insensitive' as const } }),
            ...(query.variantValue && { value: { contains: query.variantValue, mode: 'insensitive' as const } }),
          },
        },
      });
    }

    const where: any = {
      categoryId: { in: categoryIds },
      status: 'active',
      deletedAt: null,
      ...(andConditions.length > 0 && { AND: andConditions }),
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
          avgRating: true,
          reviewCount: true,
          category: { select: { id: true, name: true, slug: true } },
          images: {
            where: { isFeatured: true },
            take: 1,
            select: { imageUrl: true, altText: true },
          },
          variants: {
            where: { isActive: true },
            select: { id: true, name: true, value: true, basePrice: true, discountPrice: true, stock: true },
          },
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    const result = {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };

    await this.cache.set(cacheKey, result, 60 * 2);
    return result;
  }

  // ─── PRIVATE HELPERS ──────────────────────────────────────────────────────

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