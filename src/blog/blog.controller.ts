import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BlogQueryDto } from './dto/blog-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators';
import { Role } from 'generated/prisma/enums';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @ApiOperation({ summary: 'Get semua post published (public, paginated)' })
  @ApiResponse({ status: 200, description: 'List blog berhasil diambil' })
  @Get()
  findAll(@Query() query: BlogQueryDto) {
    return this.blogService.findAll(query);
  }

  @ApiOperation({ summary: 'Get blog post by slug (public)' })
  @ApiParam({ name: 'slug', description: 'Blog slug' })
  @ApiResponse({ status: 200, description: 'Blog post ditemukan' })
  @ApiResponse({ status: 404, description: 'Blog post tidak ditemukan' })
  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.blogService.findBySlug(slug);
  }

  @ApiOperation({ summary: 'Buat blog post baru (admin)' })
  @ApiResponse({ status: 201, description: 'Blog post berhasil dibuat' })
  @ApiResponse({ status: 400, description: 'Validasi gagal' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @Post()
  create(@Body() dto: CreateBlogDto) {
    return this.blogService.create(dto);
  }

  @ApiOperation({ summary: 'Update blog post (admin)' })
  @ApiParam({ name: 'id', description: 'Blog post ID' })
  @ApiResponse({ status: 200, description: 'Blog post berhasil diupdate' })
  @ApiResponse({ status: 404, description: 'Blog post tidak ditemukan' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBlogDto) {
    return this.blogService.update(id, dto);
  }

  @ApiOperation({ summary: 'Hapus blog post (admin)' })
  @ApiParam({ name: 'id', description: 'Blog post ID' })
  @ApiResponse({ status: 204, description: 'Blog post berhasil dihapus' })
  @ApiResponse({ status: 404, description: 'Blog post tidak ditemukan' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}