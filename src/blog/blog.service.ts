import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateBlogDto, UpdateBlogDto } from './dto/create-blog.dto.js';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  async findAll(onlyPublished = true) {
    return this.prisma.blogPost.findMany({
      where: onlyPublished ? { status: 'published' } : undefined,
      orderBy: { publishedAt: 'desc' },
      select: { id: true, title: true, slug: true, status: true, publishedAt: true, createdAt: true },
    });
  }

  async findOne(id: string) {
    const post = await this.prisma.blogPost.findUnique({ where: { id } });
    if (!post) throw new NotFoundException('Artikel tidak ditemukan');
    return post;
  }

  async findBySlug(slug: string) {
    const post = await this.prisma.blogPost.findUnique({ where: { slug } });
    if (!post) throw new NotFoundException('Artikel tidak ditemukan');
    return post;
  }

  async create(dto: CreateBlogDto) {
    const slug = dto.slug ?? this.slugify(dto.title);
    const existing = await this.prisma.blogPost.findUnique({ where: { slug } });
    if (existing) throw new ConflictException('Slug artikel sudah digunakan');

    const publishedAt = dto.status === 'published' ? new Date() : null;
    return this.prisma.blogPost.create({ data: { ...dto, slug, publishedAt } });
  }

  async update(id: string, dto: UpdateBlogDto) {
    const post = await this.findOne(id);
    const slug = dto.title && !dto.slug ? this.slugify(dto.title) : dto.slug;
    const publishedAt = dto.status === 'published' && !post.publishedAt ? new Date() : undefined;

    return this.prisma.blogPost.update({
      where: { id },
      data: { ...dto, ...(slug && { slug }), ...(publishedAt && { publishedAt }) },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.blogPost.delete({ where: { id } });
    return { message: 'Artikel berhasil dihapus' };
  }
}
