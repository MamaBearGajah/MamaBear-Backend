import {
  Controller, Get, Post, Patch, Delete,
  Body, Param, Query, UseGuards,
} from '@nestjs/common';
import {
  ApiTags, ApiOperation, ApiResponse,
  ApiBearerAuth, ApiParam,
} from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryQueryDto } from './dto/category-query.dto';
import { ProductQueryDto } from 'src/products/dto/product-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Public, Roles } from '../auth/decorators';
import { Role } from 'generated/prisma/enums';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // ─── PUBLIC ───────────────────────────────────────────────────────────────

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get semua kategori (public)' })
  @ApiResponse({ status: 200, description: 'List kategori berhasil diambil' })
  findAll(@Query() query: CategoryQueryDto) {
    return this.categoriesService.findAll(query);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get detail kategori by ID (public)' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, description: 'Detail kategori' })
  @ApiResponse({ status: 404, description: 'Kategori tidak ditemukan' })
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Public()
  @Get(':id/breadcrumb')
  @ApiOperation({ summary: 'Get breadcrumb path dari root ke kategori ini (public)' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, description: 'Array breadcrumb dari root ke kategori' })
  @ApiResponse({ status: 404, description: 'Kategori tidak ditemukan' })
  getBreadcrumb(@Param('id') id: string) {
    return this.categoriesService.getBreadcrumb(id);
  }

  @Public()
  @Get(':id/products')
  @ApiOperation({ summary: 'Get produk dalam kategori ini dan semua sub-kategorinya (public)' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, description: 'List produk dalam kategori (rekursif)' })
  @ApiResponse({ status: 404, description: 'Kategori tidak ditemukan' })
  findProducts(@Param('id') id: string, @Query() query: ProductQueryDto) {
    return this.categoriesService.findProducts(id, query);
  }

  // ─── ADMIN ────────────────────────────────────────────────────────────────

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @ApiOperation({ summary: 'Buat kategori baru (admin)' })
  @ApiResponse({ status: 201, description: 'Kategori berhasil dibuat' })
  @ApiResponse({ status: 409, description: 'Slug sudah digunakan' })
  create(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.create(dto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @ApiOperation({ summary: 'Update kategori (admin)' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, description: 'Kategori berhasil diupdate' })
  @ApiResponse({ status: 404, description: 'Kategori tidak ditemukan' })
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.categoriesService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @ApiOperation({ summary: 'Hapus kategori (admin)' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, description: 'Kategori berhasil dihapus' })
  @ApiResponse({ status: 409, description: 'Kategori masih memiliki produk atau sub-kategori' })
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
