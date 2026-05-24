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
import { BlogService } from './blog.service.js';
import { CreateBlogDto, UpdateBlogDto } from './dto/create-blog.dto.js';
import { Public, Roles } from '../auth/decorators/index.js';
import { Role } from '../../generated/prisma/enums.js';
import { BadRequestResponseDto, ForbiddenResponseDto, MessageResponseDto, NotFoundResponseDto, UnauthorizedResponseDto } from '../common/dto/response.dto.js';
import { BlogPostDto } from './dto/blog-response.dto.js';

@ApiTags('Blog')
@ApiBearerAuth('access-token')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Public()
  @Get()
  @ApiOkResponse({ description: 'Returns all published blog posts.', type: [BlogPostDto] })
  findAll() {
    return this.blogService.findAll(true);
  }

  @Public()
  @Get('slug/:slug')
  @ApiOkResponse({ description: 'Returns a blog post by slug.', type: BlogPostDto })
  @ApiNotFoundResponse({ description: 'Blog post not found.', type: NotFoundResponseDto })
  findBySlug(@Param('slug') slug: string) {
    return this.blogService.findBySlug(slug);
  }

  @Public()
  @Get(':id')
  @ApiOkResponse({ description: 'Returns a blog post by ID.', type: BlogPostDto })
  @ApiNotFoundResponse({ description: 'Blog post not found.', type: NotFoundResponseDto })
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(id);
  }

  @Roles(Role.admin, Role.super_admin)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Blog post created successfully.', type: BlogPostDto })
  @ApiBadRequestResponse({ description: 'Invalid blog post data.', type: BadRequestResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'Requires admin role.', type: ForbiddenResponseDto })
  create(@Body() dto: CreateBlogDto) {
    return this.blogService.create(dto);
  }

  @Roles(Role.admin, Role.super_admin)
  @Patch(':id')
  @ApiOkResponse({ description: 'Blog post updated successfully.', type: BlogPostDto })
  @ApiBadRequestResponse({ description: 'Invalid blog post data.', type: BadRequestResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'Requires admin role.', type: ForbiddenResponseDto })
  @ApiNotFoundResponse({ description: 'Blog post not found.', type: NotFoundResponseDto })
  update(@Param('id') id: string, @Body() dto: UpdateBlogDto) {
    return this.blogService.update(id, dto);
  }

  @Roles(Role.admin, Role.super_admin)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Blog post deleted successfully.', type: MessageResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'Requires admin role.', type: ForbiddenResponseDto })
  @ApiNotFoundResponse({ description: 'Blog post not found.', type: NotFoundResponseDto })
  remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}
