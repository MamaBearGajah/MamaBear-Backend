import { Controller, Get, Post, Body, Param, Delete, Query, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Public, Roles } from 'src/auth/decorators';
import { Role } from 'generated/prisma/enums';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // =================
  // PRODUCT ENDPOINTS
  // =================

  @Public()
  @ApiOperation({ summary: 'Get semua produk dengan filter & pagination' })
  @ApiResponse({ status: 200, description: 'List produk berhasil diambil' })
  @Get()
  findAll(@Query() query: ProductQueryDto) {
    return this.productsService.findAll(query);
  }
  
  @Public()
  @ApiOperation({ summary: 'Get produk by ID' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Produk ditemukan' })
  @ApiResponse({ status: 404, description: 'Produk tidak ditemukan' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Public()
  @ApiOperation({ summary: 'Get produk by slug' })
  @ApiParam({ name: 'slug', description: 'Product slug' })
  @ApiResponse({ status: 200, description: 'Produk ditemukan' })
  @ApiResponse({ status: 404, description: 'Produk tidak ditemukan' })
  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug);
  }

  @Roles(Role.admin, Role.super_admin)
  @ApiOperation({ summary: 'Buat produk baru (admin)' })
  @ApiResponse({ status: 201, description: 'Produk berhasil dibuat' })
  @ApiResponse({ status: 400, description: 'Validasi gagal' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }
  
  @Roles(Role.admin, Role.super_admin)
  @ApiOperation({ summary: 'Update produk (admin)' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Produk berhasil diupdate' })
  @ApiResponse({ status: 404, description: 'Produk tidak ditemukan' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, dto);
  }

  @Roles(Role.admin, Role.super_admin)
  @ApiOperation({ summary: 'Hapus produk (admin)' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Produk berhasil dihapus' })
  @ApiResponse({ status: 404, description: 'Produk tidak ditemukan' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}