import { ConsultationStatus } from '../../../generated/prisma/enums';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AdminConsultationQueryDto, UpdateConsultationStatusDto } from '../dto/admin-consultation-query.dto';

@Injectable()
export class AdminConsultationsService {
  constructor(private prisma: PrismaService) {}

  // GET ALL DATA
  async findAll(query: AdminConsultationQueryDto) {
    const page = query.page || 1
    const limit = query.limit || 10
    const status = query.status

    const skip = (page - 1) * limit
    const where = status ? { status } : {}

    const [data, totalItems] = await Promise.all([
      this.prisma.consultation.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.consultation.count({ where }),
    ])

    return {
      data,
      meta: { totalItems, itemsPerPage: limit, totalPages: Math.ceil(totalItems / limit), currentPage: page },
    }
  }

  // UPDATE DATA
  async updateStatus(id: string, adminId: string, dto: UpdateConsultationStatusDto) {
    const consultation = await this.prisma.consultation.findUnique({ where: { id } })
    if (!consultation) throw new NotFoundException('Consultation not found!')

    const current = consultation.status
    const target = dto.status

    if (current === ConsultationStatus.new && target !== ConsultationStatus.in_progress) {
      throw new BadRequestException('Status "new" can only transition to "in_progress"')
    }
    if (current === ConsultationStatus.in_progress && target !== ConsultationStatus.closed) {
      throw new BadRequestException('Status "in_progress" can only transition to "closed"')
    }
      if (current === ConsultationStatus.closed) {
      throw new BadRequestException('Consultation is already "closed" and cannot be modified')
    }

    let updateData: any = { status: target }
    if (target === ConsultationStatus.in_progress || target === ConsultationStatus.closed) {
      updateData.respondedBy = adminId
      if (dto.response) {
        updateData.response = dto.response
        updateData.respondedAt = new Date()
      }
    }

    return this.prisma.consultation.update({
      where: { id },
      data: updateData,
    })
  }
}
