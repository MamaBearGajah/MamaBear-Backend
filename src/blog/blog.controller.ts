import {
  Controller, Get, Post, Patch, Delete,
  Body, Param, Query, UseGuards,
  DefaultValuePipe, ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags, ApiBearerAuth, ApiOperation,
  ApiResponse, ApiParam, ApiQuery,
} from '@nestjs/swagger';
import { BlogService, UpdateBlogDto } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Public, GetUser, Roles } from '../auth/decorators';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../../generated/prisma/enums';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  // ─── Public ──────────────────────────────────────────────────────────────

  @Public()
  @Get()
  @ApiOperation({ summary: 'List artikel published (public, paginated)' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiResponse({ status: 200, description: 'List artikel berhasil diambil' })
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.blogService.findAll(page, limit);
  }

  // ─── Admin ───────────────────────────────────────────────────────────────

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @Get('admin/all')
  @ApiOperation({ summary: '[Admin] List semua artikel (draft + published)' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  findAllAdmin(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ) {
    return this.blogService.findAllAdmin(page, limit);
  }

  @Public()
  @Get(':slug')
  @ApiOperation({ summary: 'Detail artikel by slug (public)' })
  @ApiParam({ name: 'slug', example: 'cara-meningkatkan-produksi-asi' })
  @ApiResponse({ status: 200, description: 'Detail artikel berhasil diambil' })
  @ApiResponse({ status: 404, description: 'Artikel tidak ditemukan' })
  findBySlug(@Param('slug') slug: string) {
    return this.blogService.findBySlug(slug);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @Post()
  @ApiOperation({ summary: '[Admin] Buat artikel baru' })
  @ApiResponse({ status: 201, description: 'Artikel berhasil dibuat' })
  @ApiResponse({ status: 400, description: 'Slug sudah digunakan' })
  create(@GetUser('id') authorId: string, @Body() dto: CreateBlogDto) {
    return this.blogService.create(authorId, dto);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @Patch(':id')
  @ApiOperation({ summary: '[Admin] Update artikel (termasuk publish/unpublish)' })
  @ApiParam({ name: 'id' })
  update(@Param('id') id: string, @Body() dto: UpdateBlogDto) {
    return this.blogService.update(id, dto);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @Delete(':id')
  @ApiOperation({ summary: '[Admin] Hapus artikel' })
  @ApiParam({ name: 'id' })
  remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}