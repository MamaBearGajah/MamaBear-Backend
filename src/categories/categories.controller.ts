import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
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
import { CategoriesService } from './categories.service.js';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto.js';
import { Public, Roles } from '../auth/decorators/index.js';
import { Role } from '../../generated/prisma/enums.js';
import { BadRequestResponseDto, ForbiddenResponseDto, MessageResponseDto, NotFoundResponseDto, UnauthorizedResponseDto } from '../common/dto/response.dto.js';
import { CategoryDto } from './dto/category-response.dto.js';

@ApiTags('Categories')
@ApiBearerAuth('access-token')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Public()
  @Get()
  @ApiOkResponse({ description: 'Returns all product categories.', type: [CategoryDto] })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOkResponse({ description: 'Returns a category by ID.', type: CategoryDto })
  @ApiNotFoundResponse({ description: 'Category not found.', type: NotFoundResponseDto })
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Public()
  @Get('slug/:slug')
  @ApiOkResponse({ description: 'Returns a category by slug.', type: CategoryDto })
  @ApiNotFoundResponse({ description: 'Category not found.', type: NotFoundResponseDto })
  findBySlug(@Param('slug') slug: string) {
    return this.categoriesService.findBySlug(slug);
  }

  @Roles(Role.admin, Role.super_admin)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Category created successfully.', type: CategoryDto })
  @ApiBadRequestResponse({ description: 'Invalid category data.', type: BadRequestResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'Requires admin role.', type: ForbiddenResponseDto })
  create(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.create(dto);
  }

  @Roles(Role.admin, Role.super_admin)
  @Patch(':id')
  @ApiOkResponse({ description: 'Category updated successfully.', type: CategoryDto })
  @ApiBadRequestResponse({ description: 'Invalid category data.', type: BadRequestResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'Requires admin role.', type: ForbiddenResponseDto })
  @ApiNotFoundResponse({ description: 'Category not found.', type: NotFoundResponseDto })
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.categoriesService.update(id, dto);
  }

  @Roles(Role.admin, Role.super_admin)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Category deleted successfully.', type: MessageResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'Requires admin role.', type: ForbiddenResponseDto })
  @ApiNotFoundResponse({ description: 'Category not found.', type: NotFoundResponseDto })
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
