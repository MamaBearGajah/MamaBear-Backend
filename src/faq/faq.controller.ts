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
import { FaqService } from './faq.service.js';
import { CreateFaqDto, UpdateFaqDto } from './dto/create-faq.dto.js';
import { Public, Roles } from '../auth/decorators/index.js';
import { Role } from '../../generated/prisma/enums.js';
import { BadRequestResponseDto, ForbiddenResponseDto, MessageResponseDto, NotFoundResponseDto, UnauthorizedResponseDto } from '../common/dto/response.dto.js';
import { FaqDto } from './dto/faq-response.dto.js';

@ApiTags('FAQ')
@ApiBearerAuth('access-token')
@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Public()
  @Get()
  @ApiOkResponse({ description: 'Returns all published FAQ entries.', type: [FaqDto] })
  findAll() {
    return this.faqService.findAll(true);
  }

  @Public()
  @Get(':id')
  @ApiOkResponse({ description: 'Returns a single FAQ entry by ID.', type: FaqDto })
  @ApiNotFoundResponse({ description: 'FAQ entry not found.', type: NotFoundResponseDto })
  findOne(@Param('id') id: string) {
    return this.faqService.findOne(id);
  }

  @Roles(Role.admin, Role.super_admin)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'FAQ entry created successfully.', type: FaqDto })
  @ApiBadRequestResponse({ description: 'Invalid FAQ data.', type: BadRequestResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'Requires admin role.', type: ForbiddenResponseDto })
  create(@Body() dto: CreateFaqDto) {
    return this.faqService.create(dto);
  }

  @Roles(Role.admin, Role.super_admin)
  @Patch(':id')
  @ApiOkResponse({ description: 'FAQ entry updated successfully.', type: FaqDto })
  @ApiBadRequestResponse({ description: 'Invalid FAQ data.', type: BadRequestResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'Requires admin role.', type: ForbiddenResponseDto })
  @ApiNotFoundResponse({ description: 'FAQ entry not found.', type: NotFoundResponseDto })
  update(@Param('id') id: string, @Body() dto: UpdateFaqDto) {
    return this.faqService.update(id, dto);
  }

  @Roles(Role.admin, Role.super_admin)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'FAQ entry deleted successfully.', type: MessageResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'Requires admin role.', type: ForbiddenResponseDto })
  @ApiNotFoundResponse({ description: 'FAQ entry not found.', type: NotFoundResponseDto })
  remove(@Param('id') id: string) {
    return this.faqService.remove(id);
  }
}
