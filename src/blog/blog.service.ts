import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CacheService } from '../cache/cache.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { PartialType } from '@nestjs/swagger';
import { BlogStatus } from '../../generated/prisma/enums';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {}

@Injectable()
export class BlogService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheService,
  ) {}

  private readonly publicSelect = {
    id: true,
    title: true,
    slug: true,
    excerpt: true,
    coverImage: true,
    status: true,
    viewCount: true,
    publishedAt: true,
    createdAt: true,
    author: { select: { id: true, name: true } },
  };

  // ─── Public: List Published ─────────────────────────────────────────────
  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const cacheKey = `blog:list:${page}:${limit}`;
    const cached = await this.cache.get<any>(cacheKey);
    if (cached) return cached;

    const [posts, total] = await Promise.all([
      this.prisma.blogPost.findMany({
        where: { status: BlogStatus.published },
        orderBy: { publishedAt: 'desc' },
        skip,
        take: limit,
        select: this.publicSelect,
      }),
      this.prisma.blogPost.count({ where: { status: BlogStatus.published } }),
    ]);

    const result = { data: posts, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
    await this.cache.set(cacheKey, result, 300);
    return result;
  }

  // ─── Public: Detail by Slug ─────────────────────────────────────────────
  async findBySlug(slug: string) {
    const cacheKey = `blog:slug:${slug}`;
    const cached = await this.cache.get<any>(cacheKey);
    if (cached) {
      // increment viewCount asynchronously
      this.prisma.blogPost.update({ where: { slug }, data: { viewCount: { increment: 1 } } }).catch(() => {});
      return cached;
    }

    const post = await this.prisma.blogPost.findUnique({
      where: { slug },
      include: { author: { select: { id: true, name: true } } },
    });
    if (!post || post.status !== BlogStatus.published)
      throw new NotFoundException('Artikel tidak ditemukan');

    await this.prisma.blogPost.update({ where: { slug }, data: { viewCount: { increment: 1 } } });
    await this.cache.set(cacheKey, post, 300);
    return post;
  }

  // ─── Admin: List All ────────────────────────────────────────────────────
  async findAllAdmin(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [posts, total] = await Promise.all([
      this.prisma.blogPost.findMany({
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: { author: { select: { id: true, name: true } } },
      }),
      this.prisma.blogPost.count(),
    ]);
    return { data: posts, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  // ─── Admin: Create ──────────────────────────────────────────────────────
  async create(authorId: string, dto: CreateBlogDto) {
    const existing = await this.prisma.blogPost.findUnique({ where: { slug: dto.slug } });
    if (existing) throw new BadRequestException(`Slug "${dto.slug}" sudah digunakan`);

    const post = await this.prisma.blogPost.create({
      data: {
        title: dto.title,
        slug: dto.slug,
        excerpt: dto.excerpt,
        coverImage: dto.coverImage,
        coverPublicId: dto.coverPublicId,
        content: dto.content,
        status: dto.status ?? BlogStatus.draft,
        authorId,
        ...(dto.status === BlogStatus.published && { publishedAt: new Date() }),
      },
      include: { author: { select: { id: true, name: true } } },
    });
    await this.invalidateCache();
    return post;
  }

  // ─── Admin: Update ──────────────────────────────────────────────────────
  async update(id: string, dto: UpdateBlogDto) {
    const post = await this.prisma.blogPost.findUnique({ where: { id } });
    if (!post) throw new NotFoundException('Artikel tidak ditemukan');

    const wasPublished = post.status === BlogStatus.published;
    const willPublish = dto.status === BlogStatus.published;

    const updated = await this.prisma.blogPost.update({
      where: { id },
      data: {
        ...(dto.title && { title: dto.title }),
        ...(dto.slug && { slug: dto.slug }),
        ...(dto.excerpt !== undefined && { excerpt: dto.excerpt }),
        ...(dto.coverImage !== undefined && { coverImage: dto.coverImage }),
        ...(dto.coverPublicId !== undefined && { coverPublicId: dto.coverPublicId }),
        ...(dto.content && { content: dto.content }),
        ...(dto.status && { status: dto.status }),
        // Set publishedAt hanya pertama kali dipublish
        ...(!wasPublished && willPublish && { publishedAt: new Date() }),
      },
      include: { author: { select: { id: true, name: true } } },
    });

    await this.invalidateCache(post.slug, dto.slug);
    return updated;
  }

  // ─── Admin: Delete ──────────────────────────────────────────────────────
  async remove(id: string) {
    const post = await this.prisma.blogPost.findUnique({ where: { id } });
    if (!post) throw new NotFoundException('Artikel tidak ditemukan');
    await this.prisma.blogPost.delete({ where: { id } });
    await this.invalidateCache(post.slug);
    return { message: 'Artikel berhasil dihapus' };
  }

  // ─── Helpers ─────────────────────────────────────────────────────────────
  private async invalidateCache(oldSlug?: string, newSlug?: string) {
    await this.cache.delByPattern('blog:list:*');
    if (oldSlug) await this.cache.del(`blog:slug:${oldSlug}`);
    if (newSlug && newSlug !== oldSlug) await this.cache.del(`blog:slug:${newSlug}`);
  }
}