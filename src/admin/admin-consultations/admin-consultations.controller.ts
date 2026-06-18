import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, Req } from '@nestjs/common';
import { AdminConsultationsService } from '../admin-consultations/admin-consultations.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminConsultationQueryDto, UpdateConsultationStatusDto } from '../dto/admin-consultation-query.dto';

@ApiTags('Admin Consultations')
@ApiBearerAuth()
@Controller('admin/consultations')
export class AdminConsultationsController {
  constructor(private readonly adminConsultationsService: AdminConsultationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get list of consultations (paginated & filtered)' })
  async getAll(@Query() query: AdminConsultationQueryDto) {
    return this.adminConsultationsService.findAll(query)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update consultation status (new -> in_progress -> closed)' })
  async updateStatus(@Param('id') id: string, @Body() dto: UpdateConsultationStatusDto, @Req() req: any) {
    const adminId = req.user?.id
    return this.adminConsultationsService.updateStatus(id, adminId, dto)
  }
}
