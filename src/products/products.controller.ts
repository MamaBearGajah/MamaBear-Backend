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

  @Public()
  @ApiOperation({ summary: 'Get semua varian produk' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'List varian berhasil diambil' })
  @ApiResponse({ status: 404, description: 'Produk tidak ditemukan' })
  @Get(':id/variants')
  findVariants(@Param('id') id: string) {
    return this.productsService.findVariants(id);
  }

  @Roles(Role.admin, Role.super_admin)
  @ApiOperation({ summary: 'Tambah varian ke produk (admin)' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: 201, description: 'Varian berhasil ditambahkan' })
  @ApiResponse({ status: 404, description: 'Produk tidak ditemukan' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  @Post(':id/variants')
  addVariant(@Param('id') id: string, @Body() dto: CreateVariantDto) {
    return this.productsService.addVariant(id, dto);
  }

  @Roles(Role.admin, Role.super_admin)
  @ApiOperation({ summary: 'Update varian produk (admin)' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiParam({ name: 'variantId', description: 'Variant ID' })
  @ApiResponse({ status: 200, description: 'Varian berhasil diupdate' })
  @ApiResponse({ status: 404, description: 'Varian tidak ditemukan' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  @Patch(':id/variants/:variantId')
  updateVariant(
    @Param('id') id: string,
    @Param('variantId') variantId: string,
    @Body() dto: UpdateVariantDto,
  ) {
    return this.productsService.updateVariant(variantId, dto);
  }

  @Roles(Role.admin, Role.super_admin)
  @ApiOperation({ summary: 'Hapus varian produk (admin)' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiParam({ name: 'variantId', description: 'Variant ID' })
  @ApiResponse({ status: 200, description: 'Varian berhasil dihapus' })
  @ApiResponse({ status: 404, description: 'Varian tidak ditemukan' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  @Delete(':id/variants/:variantId')
  removeVariant(@Param('id') id: string, @Param('variantId') variantId: string) {
    return this.productsService.removeVariant(variantId);
  }

  @Roles(Role.admin, Role.super_admin)
  @ApiOperation({ summary: 'Tambah gambar ke produk (admin)' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: 201, description: 'Gambar berhasil ditambahkan' })
  @ApiResponse({ status: 404, description: 'Produk tidak ditemukan' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  @Post(':id/images')
  addImage(@Param('id') id: string, @Body() dto: CreateImageDto) {
    return this.productsService.addImage(id, dto);
  }

  @Roles(Role.admin, Role.super_admin)
  @ApiOperation({ summary: 'Update gambar produk (admin)' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiParam({ name: 'imageId', description: 'Image ID' })
  @ApiResponse({ status: 200, description: 'Gambar berhasil diupdate' })
  @ApiResponse({ status: 404, description: 'Gambar tidak ditemukan' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  @Patch(':id/images/:imageId')
  updateImage(
    @Param('id') id: string,
    @Param('imageId') imageId: string,
    @Body() dto: UpdateImageDto,
  ) {
    return this.productsService.updateImage(imageId, dto);
  }

  @Roles(Role.admin, Role.super_admin)
  @ApiOperation({ summary: 'Hapus gambar produk (admin)' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiParam({ name: 'imageId', description: 'Image ID' })
  @ApiResponse({ status: 200, description: 'Gambar berhasil dihapus' })
  @ApiResponse({ status: 404, description: 'Gambar tidak ditemukan' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  @Delete(':id/images/:imageId')
  removeImage(@Param('id') id: string, @Param('imageId') imageId: string) {
    return this.productsService.removeImage(imageId);
  }
}