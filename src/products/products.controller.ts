import {
  Controller, Get, Post, Patch, Delete,
  Body, Param, Query, UseGuards,
} from '@nestjs/common';
import {
  ApiTags, ApiOperation, ApiResponse,
  ApiBearerAuth, ApiParam, ApiQuery,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Public, Roles } from '../auth/decorators';
import { Role } from 'generated/prisma/enums';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // ─── PUBLIC ───────────────────────────────────────────────────────────────────
  // PENTING: route statis harus di atas @Get(':id')

  @ApiOperation({ summary: 'Get semua produk (public)' })
  @ApiResponse({ status: 200, description: 'List produk' })
  @Public()
  @Get()
  findAll(@Query() query: ProductQueryDto) {
    return this.productsService.findAll(query);
  }

  @ApiOperation({ summary: 'Get best seller products (public)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Default 10' })
  @Public()
  @Get('best-sellers')
  findBestSellers(@Query('limit') limit?: string) {
    return this.productsService.findBestSellers(limit ? Number(limit) : 10);
  }

  @ApiOperation({ summary: 'Get produk by slug (public)' })
  @ApiParam({ name: 'slug' })
  @Public()
  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug);
  }

  // ─── ADMIN ────────────────────────────────────────────────────────────────────
  // ✅ variants/all harus di atas :id supaya tidak tertangkap sebagai id = "variants"

  @ApiOperation({ summary: 'Get SEMUA varian lintas produk (admin) — include productName + categoryName' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'productId', required: false })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @Get('variants/all')
  findAllVariants(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('productId') productId?: string,
  ) {
    return this.productsService.findAllVariants({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      productId,
    });
  }

  @ApiOperation({ summary: 'Buat produk baru (admin)' })
  @ApiResponse({ status: 201, description: 'Produk berhasil dibuat' })
  @ApiResponse({ status: 400, description: 'Slug atau SKU sudah digunakan' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @ApiOperation({ summary: 'Get produk by ID (public)' })
  @ApiParam({ name: 'id' })
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update produk (admin)' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, description: 'Produk berhasil diupdate' })
  @ApiResponse({ status: 404, description: 'Produk tidak ditemukan' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, dto);
  }

  @ApiOperation({ summary: 'Hapus produk (admin)' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, description: 'Produk berhasil dihapus' })
  @ApiResponse({ status: 404, description: 'Produk tidak ditemukan' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.super_admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}

// ─── CATATAN ROUTING ─────────────────────────────────────────────────────────
//
// Variant   → products.module mendaftarkan VariantsModule
//             endpoint: /products/:productId/variants  (variants.controller)
//
// Image     → products.module mendaftarkan ImagesModule
//             endpoint: /products/:productId/images    (images.controller)
//
// variants/all tetap di sini karena query lintas produk (bukan per-produk)