import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async search(q: string, limit = 10) {
    if (!q || q.trim().length < 2) return { products: [], categories: [], blog: [] };

    const term = q.trim();

    const [products, categories, blog] = await Promise.all([
      this.prisma.product.findMany({
        where: {
          status: 'active',
          OR: [
            { name: { contains: term, mode: 'insensitive' } },
            { description: { contains: term, mode: 'insensitive' } },
            { sku: { contains: term, mode: 'insensitive' } },
          ],
        },
        select: { id: true, name: true, slug: true, mainImage: true, basePrice: true, discountPrice: true },
        take: limit,
      }),
      this.prisma.category.findMany({
        where: {
          isActive: true,
          name: { contains: term, mode: 'insensitive' },
        },
        select: { id: true, name: true, slug: true, imageUrl: true },
        take: 5,
      }),
      this.prisma.blogPost.findMany({
        where: {
          status: 'published',
          OR: [
            { title: { contains: term, mode: 'insensitive' } },
            { content: { contains: term, mode: 'insensitive' } },
          ],
        },
        select: { id: true, title: true, slug: true, publishedAt: true },
        take: 5,
      }),
    ]);

    return { products, categories, blog };
  }

  async suggestions(q: string) {
    if (!q || q.trim().length < 2) return [];

    const products = await this.prisma.product.findMany({
      where: {
        status: 'active',
        name: { contains: q.trim(), mode: 'insensitive' },
      },
      select: { name: true, slug: true },
      take: 5,
    });

    return products.map((p) => ({ label: p.name, slug: p.slug }));
  }
}
