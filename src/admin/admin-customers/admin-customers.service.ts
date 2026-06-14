import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AdminBaseQueryDto } from '../dto/admin-query.dto';

@Injectable()
export class AdminCustomersService {
    constructor(private prisma: PrismaService) {}

    async findAll(query: AdminBaseQueryDto) {
        const page = query.page || 1
        const limit = query.limit || 10
        const search = query.search

        const skip = (page - 1) * limit
        const where = search
            ? {
                OR: [
                    { name: { contains: search, mode: 'insensitive' as const } },
                    { email: { contains: search, mode: 'insensitive' as const } },
                ],
              }
            : {}
        
        const [data, totalItems] = await Promise.all([
            this.prisma.user.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true,
                },
            }),
            this.prisma.user.count({ where }),
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
