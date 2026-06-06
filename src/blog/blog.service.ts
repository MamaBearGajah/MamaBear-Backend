import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BlogQueryDto } from './dto/blog-query.dto';

@Injectable()
export class BlogService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: BlogQueryDto) {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.blogPost.findMany({
        where: { status: 'published' },
        skip,
        take: limit,
        orderBy: { publishedAt: 'desc' },
        select: {
          id: true,
          title: true,
          slug: true,
          publishedAt: true,
          createdAt: true,
        },
      }),
      this.prisma.blogPost.count({ where: { status: 'published' } }),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findBySlug(slug: string) {
    const post = await this.prisma.blogPost.findUnique({ where: { slug } });
    if (!post) throw new NotFoundException(`Blog post tidak ditemukan`);
    return post;
  }

  async create(dto: CreateBlogDto) {
    return this.prisma.blogPost.create({
      data: {
        ...dto,
        publishedAt: dto.status === 'published' ? new Date() : null,
      },
    });
  }

  async update(id: string, dto: UpdateBlogDto) {
    await this.findById(id);

    return this.prisma.blogPost.update({
      where: { id },
      data: {
        ...dto,
        // Set publishedAt saat pertama kali publish, clear saat kembali draft
        ...(dto.status === 'published' && { publishedAt: new Date() }),
        ...(dto.status === 'draft' && { publishedAt: null }),
      },
    });
  }

  async remove(id: string) {
    await this.findById(id);
    return this.prisma.blogPost.delete({ where: { id } });
  }

  private async findById(id: string) {
    const post = await this.prisma.blogPost.findUnique({ where: { id } });
    if (!post) throw new NotFoundException(`Blog post tidak ditemukan`);
    return post;
  }
}