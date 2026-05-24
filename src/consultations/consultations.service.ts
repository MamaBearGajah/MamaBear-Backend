import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateConsultationDto, UpdateConsultationDto } from './dto/create-consultation.dto.js';

@Injectable()
export class ConsultationsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateConsultationDto) {
    return this.prisma.consultation.create({ data: dto });
  }

  async findAll() {
    return this.prisma.consultation.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: string) {
    const item = await this.prisma.consultation.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Konsultasi tidak ditemukan');
    return item;
  }

  async update(id: string, dto: UpdateConsultationDto) {
    await this.findOne(id);
    return this.prisma.consultation.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.consultation.delete({ where: { id } });
    return { message: 'Konsultasi berhasil dihapus' };
  }
}
