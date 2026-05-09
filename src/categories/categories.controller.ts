import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryQueryDto } from './dto/category-query.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators';
import { Role } from 'generated/prisma/enums';
import { ProductQueryDto } from 'src/products/dto/product-query.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Get semua kategori' })
  @ApiResponse({ status: 200, description: 'List kategori berhasil diambil' })
  @Get()
  findAll(@Query() query: CategoryQueryDto) {
    return this.categoriesService.findAll(query);
  }

  @ApiOperation({ summary: 'Get kategori by ID' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiResponse({ status: 200, description: 'Kategori ditemukan' })
  @ApiResponse({ status: 404, description: 'Kategori tidak ditemukan' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @ApiOperation({ summary: 'Buat kategori baru (admin)' })
  @ApiResponse({ status: 201, description: 'Kategori berhasil dibuat' })
  @ApiResponse({ status: 400, description: 'Validasi gagal' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 409, description: 'Slug sudah digunakan' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @Post()
  create(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.create(dto);
  }

  @ApiOperation({ summary: 'Update kategori (admin)' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiResponse({ status: 200, description: 'Kategori berhasil diupdate' })
  @ApiResponse({ status: 404, description: 'Kategori tidak ditemukan' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 409, description: 'Slug sudah digunakan' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.categoriesService.update(id, dto);
  }

  @ApiOperation({ summary: 'Hapus kategori (admin)' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiResponse({ status: 200, description: 'Kategori berhasil dihapus' })
  @ApiResponse({ status: 404, description: 'Kategori tidak ditemukan' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 409, description: 'Kategori masih memiliki produk atau sub-kategori' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }

 @ApiOperation({ summary: 'Get semua produk dalam kategori' })
@ApiParam({ name: 'id', description: 'Category ID' })
@ApiResponse({ status: 200, description: 'List produk berhasil diambil' })
@ApiResponse({ status: 404, description: 'Kategori tidak ditemukan' })
@Get(':id/products')
findProducts(@Param('id') id: string) {
  return this.categoriesService.findProducts(id);
}

}