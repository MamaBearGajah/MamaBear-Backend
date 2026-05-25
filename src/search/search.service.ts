import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SearchQueryDto } from './dto/search-query.dto';

@Injectable()
export class SearchService {
    constructor(private readonly prisma: PrismaService) {}

    async search(query: SearchQueryDto) {
        const {
        q,
        minPrice,
        maxPrice,
        categoryId,
        inStock,
        sort = 'asc',
        page = 1,
        limit = 10,
        } = query;

        const skip = (page - 1) * limit;

        const where: any = {
        status: 'active',
        };

        // full-text search
        if (q) {
        where.OR = [
            {
            name: {
                contains: q,
                mode: 'insensitive',
            },
            },
            {
            description: {
                contains: q,
                mode: 'insensitive',
            },
            },
            {
            sku: {
                contains: q,
                mode: 'insensitive',
            },
            },
        ];
        }

        // filter category
        if (categoryId) {
        where.categoryId = categoryId;
        }

        // filter stock
        if (inStock) {
        where.stock = {
            gt: 0,
        };
        }

        // filter price
        if (minPrice || maxPrice) {
        where.basePrice = {};

        if (minPrice) {
            where.basePrice.gte = minPrice;
        }

        if (maxPrice) {
            where.basePrice.lte = maxPrice;
        }
        }

        const [products, total] = await Promise.all([
        this.prisma.product.findMany({
            where,
            skip,
            take: limit,
        }),
        this.prisma.product.count({ where }),
        ]);

        // sort by effective price (discountPrice ?? basePrice)
        const sortedProducts = [...products].sort((a: any, b: any) => {
        const priceA = a.discountPrice ?? a.basePrice;
        const priceB = b.discountPrice ?? b.basePrice;

        return sort === 'asc'
            ? Number(priceA) - Number(priceB)
            : Number(priceB) - Number(priceA);
        });

        return {
        data: sortedProducts,
        meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
        };
    }

    async getSuggestions(q: string) {
        if (!q) {
        return [];
        }

        const products = await this.prisma.product.findMany({
        where: {
            status: 'active',
            name: {
            contains: q,
            mode: 'insensitive',
            },
        },
        select: {
            name: true,
        },
        take: 10,
        });

        return products.map((product) => product.name);
  }
}
