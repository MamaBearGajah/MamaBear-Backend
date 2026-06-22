import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AdminBaseQueryDto } from '../dto/admin-query.dto';

@Injectable()
export class AdminCategoriesService {
    constructor(private prisma: PrismaService) {}

    async findAll(query: AdminBaseQueryDto) {
        const page = query.page || 1
        const limit = query.limit || 10
        const search = query.search

        const skip = (page - 1) * limit
        const where = search ? { name: { contains: search, mode: 'insensitive' as const } } : {}

        const [data, totalItems] = await Promise.all([
            this.prisma.category.findMany({
                where, 
                skip,
                take: limit,
                orderBy: { name: 'asc' },
            }),
            this.prisma.category.count({ where }),
        ])

        return {
            data,
            meta: {
                totalItems,
                itemsPerPage: limit,
                totalPages: Math.ceil(totalItems / limit),
                currentPage: page,
            },
        }
    }
}
