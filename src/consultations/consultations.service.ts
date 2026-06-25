import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { ConsultationQueryDto } from './dto/consultation-query.dto';
import { Prisma } from 'generated/prisma/client';

@Injectable()
export class ConsultationsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(dto: CreateConsultationDto) {
    return this.prisma.consultation.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        message: dto.message,
      },
    });
  }

  async findAll(query: ConsultationQueryDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;

    const skip = (page - 1) * limit;

    const where: Prisma.ConsultationWhereInput = {
      ...(query.status && {
        status: query.status,
      }),

      ...(query.search && {
        OR: [
          {
            name: {
              contains: query.search,
              mode: 'insensitive' as Prisma.QueryMode,
            },
          },
          {
            email: {
              contains: query.search,
              mode: 'insensitive' as Prisma.QueryMode,
            },
          },
          {
            phone: {
              contains: query.search,
              mode: 'insensitive' as Prisma.QueryMode,
            },
          },
          {
            message: {
              contains: query.search,
              mode: 'insensitive' as Prisma.QueryMode,
            },
          },
        ],
      }),
    };

    const [data, total] = await Promise.all([
      this.prisma.consultation.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          admin: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),

      this.prisma.consultation.count({
        where,
      }),
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

  async findOne(id: string) {
    const consultation =
      await this.prisma.consultation.findUnique({
        where: {
          id,
        },
        include: {
          admin: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

    if (!consultation) {
      throw new NotFoundException(
        `Konsultasi dengan id ${id} tidak ditemukan`,
      );
    }

    return consultation;
  }

  async updateStatus(
    id: string,
    dto: UpdateConsultationDto,
    adminId: string,
  ) {
    const consultation =
      await this.prisma.consultation.findUnique({
        where: {
          id,
        },
      });

    if (!consultation) {
      throw new NotFoundException(
        `Konsultasi dengan id ${id} tidak ditemukan`,
      );
    }

    return this.prisma.consultation.update({
      where: {
        id,
      },
      data: {
        status: dto.status,
        respondedBy: adminId,
        ...(dto.response && {
          response: dto.response,
          respondedAt: new Date(),
        }),
      },
      include: {
        admin: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }
}