import {
  Controller, Get, Post, Patch, Delete,
  Body, Param, Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags, ApiOperation, ApiResponse,
  ApiBearerAuth, ApiParam, ApiQuery,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { Public, Roles } from '../auth/decorators';
import { Role } from 'generated/prisma/enums';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // ─── PUBLIC ───────────────────────────────────────────────────────────────
  // PENTING: route statis harus di atas @Get(':id')

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get semua produk (public)' })
  @ApiResponse({ status: 200, description: 'List produk' })
  findAll(@Query() query: ProductQueryDto) {
    return this.productsService.findAll(query);
  }

  @Public()
  @Get('best-sellers')
  @ApiOperation({ summary: 'Get best seller products (public)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Default 10' })
  findBestSellers(@Query('limit') limit?: string) {
    return this.productsService.findBestSellers(limit ? Number(limit) : 10);
  }

  @Public()
  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get produk by slug (public)' })
  @ApiParam({ name: 'slug' })
  findBySlug(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug);
  }

  // Harus di atas @Get(':id') supaya tidak tertangkap sebagai id = "name-id"
  @Public()
  @Get('name-id')
  @ApiOperation({ summary: 'Get semua nama dan ID produk — untuk dropdown create variant' })
  @ApiResponse({ status: 200, description: 'List nama dan ID produk' })
  findAllNameAndId(@Query() query: ProductQueryDto) {
    return this.productsService.findAllNameAndId(query);
  }

  // ─── ADMIN ────────────────────────────────────────────────────────────────
  // variants/all harus di atas :id supaya tidak tertangkap sebagai id = "variants"

  @Roles(Role.admin, Role.super_admin)
  @ApiBearerAuth()
  @Get('variants/all')
  @ApiOperation({ summary: 'Get SEMUA varian lintas produk (admin)' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'productId', required: false })
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

  @Roles(Role.admin, Role.super_admin)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Buat produk baru (admin)' })
  @ApiResponse({ status: 201, description: 'Produk berhasil dibuat' })
  @ApiResponse({ status: 400, description: 'Slug atau SKU sudah digunakan' })
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Post('bulk')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard
  )
  @Roles(Role.admin, Role.super_admin)
  @ApiOperation({ summary: 'Bulk update status/harga produk (admin)' })
  bulkUpdate(
    @Body()
    body: {
      productIds: string[];
      status?: string;
      price?: number;
    },
  ) {
    return this.productsService.bulkUpdateProducts(body);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get produk by ID (public)' })
  @ApiParam({ name: 'id' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Roles(Role.admin, Role.super_admin)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Update produk (admin)' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, description: 'Produk berhasil diupdate' })
  @ApiResponse({ status: 404, description: 'Produk tidak ditemukan' })
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, dto);
  }

  @Roles(Role.admin, Role.super_admin)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Hapus produk — soft delete (admin)' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, description: 'Produk berhasil dihapus' })
  @ApiResponse({ status: 404, description: 'Produk tidak ditemukan' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}