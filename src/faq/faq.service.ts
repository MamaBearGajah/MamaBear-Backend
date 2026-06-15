import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';

@Injectable()
export class FaqService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.faq.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'asc' },
    });
  }

  async findOne(id: string) {
    const faq = await this.prisma.faq.findUnique({ where: { id } });
    if (!faq) throw new NotFoundException(`FAQ dengan id ${id} tidak ditemukan`);
    return faq;
  }

  async create(dto: CreateFaqDto) {
    return this.prisma.faq.create({ data: dto });
  }

  async update(id: string, dto: UpdateFaqDto) {
    await this.findOne(id);
    return this.prisma.faq.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.faq.delete({ where: { id } });
  }

  // Untuk chatbot — cari FAQ berdasarkan keyword
  async findByKeyword(keyword: string) {
    return this.prisma.faq.findMany({
      where: {
        isActive: true,
        OR: [
          { question: { contains: keyword, mode: 'insensitive' } },
          { answer: { contains: keyword, mode: 'insensitive' } },
        ],
      },
      take: 3,
    });
  }

  // Untuk chatbot — ambil top 3 FAQ aktif sebagai fallback
  async findTopFaqs() {
    return this.prisma.faq.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'asc' },
      take: 3,
    });
  }
}