import {
  Controller, Get, Post, Patch, Delete, Body, Param, HttpCode, HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { ConsultationsService } from './consultations.service.js';
import { CreateConsultationDto, UpdateConsultationDto } from './dto/create-consultation.dto.js';
import { Public, Roles } from '../auth/decorators/index.js';
import { Role } from '../../generated/prisma/enums.js';
import { BadRequestResponseDto, ForbiddenResponseDto, MessageResponseDto, NotFoundResponseDto, UnauthorizedResponseDto } from '../common/dto/response.dto.js';
import { ConsultationDto } from './dto/consultation-response.dto.js';

@ApiTags('Consultations')
@ApiBearerAuth('access-token')
@Controller('consultations')
export class ConsultationsController {
  constructor(private readonly consultationsService: ConsultationsService) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Consultation request submitted successfully.', type: ConsultationDto })
  @ApiBadRequestResponse({ description: 'Invalid consultation data.', type: BadRequestResponseDto })
  create(@Body() dto: CreateConsultationDto) {
    return this.consultationsService.create(dto);
  }

  @Roles(Role.admin, Role.super_admin)
  @Get()
  @ApiOkResponse({ description: 'Returns all consultation requests.', type: [ConsultationDto] })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'Requires admin role.', type: ForbiddenResponseDto })
  findAll() {
    return this.consultationsService.findAll();
  }

  @Roles(Role.admin, Role.super_admin)
  @Get(':id')
  @ApiOkResponse({ description: 'Returns a consultation request by ID.', type: ConsultationDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'Requires admin role.', type: ForbiddenResponseDto })
  @ApiNotFoundResponse({ description: 'Consultation not found.', type: NotFoundResponseDto })
  findOne(@Param('id') id: string) {
    return this.consultationsService.findOne(id);
  }

  @Roles(Role.admin, Role.super_admin)
  @Patch(':id')
  @ApiOkResponse({ description: 'Consultation updated successfully.', type: ConsultationDto })
  @ApiBadRequestResponse({ description: 'Invalid consultation data.', type: BadRequestResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'Requires admin role.', type: ForbiddenResponseDto })
  @ApiNotFoundResponse({ description: 'Consultation not found.', type: NotFoundResponseDto })
  update(@Param('id') id: string, @Body() dto: UpdateConsultationDto) {
    return this.consultationsService.update(id, dto);
  }

  @Roles(Role.admin, Role.super_admin)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Consultation deleted successfully.', type: MessageResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'Requires admin role.', type: ForbiddenResponseDto })
  @ApiNotFoundResponse({ description: 'Consultation not found.', type: NotFoundResponseDto })
  remove(@Param('id') id: string) {
    return this.consultationsService.remove(id);
  }
}
