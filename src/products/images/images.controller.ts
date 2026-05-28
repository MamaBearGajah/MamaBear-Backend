import {
  Controller, Get, Post, Body, Patch,
  Param, Delete, HttpCode, HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth, ApiOperation, ApiParam,
  ApiResponse, ApiTags,
} from '@nestjs/swagger';
import { ImagesService } from './images.service';
import { CreateImageDto } from '../dto/create-image.dto';
import { UpdateImageDto } from '../dto/update-image.dto';
import { ReorderImagesDto } from '../dto/reorder-images.dto';
import { Roles } from '../../auth/decorators';
import { Role } from 'generated/prisma/enums';

@ApiTags('Product Images')
@ApiBearerAuth()
@Roles(Role.admin, Role.super_admin)
@Controller('products/:productId/images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  // ─── GET ALL ──────────────────────────────────────────────────────────────

  @Get()
  @ApiOperation({ summary: 'Get semua gambar produk (admin)' })
  @ApiParam({ name: 'productId', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'List gambar berhasil diambil' })
  @ApiResponse({ status: 404, description: 'Produk tidak ditemukan' })
  findAll(@Param('productId') productId: string) {
    return this.imagesService.findAll(productId);
  }

  // ─── ADD IMAGE ────────────────────────────────────────────────────────────

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Tambah gambar ke produk (admin)' })
  @ApiParam({ name: 'productId', description: 'Product ID' })
  @ApiResponse({ status: 201, description: 'Gambar berhasil ditambahkan' })
  @ApiResponse({ status: 404, description: 'Produk tidak ditemukan' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Akses ditolak' })
  addImage(
    @Param('productId') productId: string,
    @Body() dto: CreateImageDto,
  ) {
    return this.imagesService.addImage(productId, dto);
  }

  // ─── REORDER — harus di atas :imageId ────────────────────────────────────

  @Patch('reorder')
  @ApiOperation({ summary: 'Reorder gambar produk (admin)' })
  @ApiParam({ name: 'productId', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Urutan gambar berhasil diupdate' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Akses ditolak' })
  reorder(
    @Param('productId') productId: string,
    @Body() dto: ReorderImagesDto,
  ) {
    return this.imagesService.reorder(productId, dto);
  }

  // ─── SET FEATURED ─────────────────────────────────────────────────────────

  @Patch(':imageId/featured')
  @ApiOperation({ summary: 'Set gambar sebagai featured/utama (admin)' })
  @ApiParam({ name: 'productId', description: 'Product ID' })
  @ApiParam({ name: 'imageId', description: 'Image ID' })
  @ApiResponse({ status: 200, description: 'Featured image berhasil diset' })
  @ApiResponse({ status: 404, description: 'Gambar tidak ditemukan' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Akses ditolak' })
  setFeatured(
    @Param('productId') productId: string,
    @Param('imageId') imageId: string,
  ) {
    return this.imagesService.setFeatured(productId, imageId);
  }

  // ─── UPDATE IMAGE ─────────────────────────────────────────────────────────

  @Patch(':imageId')
  @ApiOperation({ summary: 'Update data gambar produk (admin)' })
  @ApiParam({ name: 'productId', description: 'Product ID' })
  @ApiParam({ name: 'imageId', description: 'Image ID' })
  @ApiResponse({ status: 200, description: 'Gambar berhasil diupdate' })
  @ApiResponse({ status: 404, description: 'Gambar tidak ditemukan' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Akses ditolak' })
  updateImage(
    @Param('productId') productId: string,
    @Param('imageId') imageId: string,
    @Body() dto: UpdateImageDto,
  ) {
    return this.imagesService.updateImage(productId, imageId, dto);
  }

  // ─── DELETE IMAGE ─────────────────────────────────────────────────────────

  @Delete(':imageId')
  @ApiOperation({ summary: 'Hapus gambar produk + dari Cloudinary (admin)' })
  @ApiParam({ name: 'productId', description: 'Product ID' })
  @ApiParam({ name: 'imageId', description: 'Image ID' })
  @ApiResponse({ status: 200, description: 'Gambar berhasil dihapus' })
  @ApiResponse({ status: 404, description: 'Gambar tidak ditemukan' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Akses ditolak' })
  removeImage(
    @Param('productId') productId: string,
    @Param('imageId') imageId: string,
  ) {
    return this.imagesService.removeImage(productId, imageId);
  }
}