import {
  Controller, Get, Post, Patch, Delete,
  Body, Param, HttpCode, HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags,
} from '@nestjs/swagger';
import { VariantsService } from './variants.service';
import { CreateVariantDto } from '../dto/create-variant.dto';
import { UpdateVariantDto } from '../dto/update-variant.dto';
import { UpdateVariantImagesBatchDto } from '../dto/update-batch-variant-images.dto';
import { Public, Roles } from '../../auth/decorators';
import { Role } from 'generated/prisma/enums';

@ApiTags('Variants')
@Controller('products/:productId/variants')  // ✅ prefix sudah handle productId
export class VariantsController {
  constructor(private readonly variantsService: VariantsService) {}

  // ─── GET ALL VARIANTS ────────────────────────────────────────────────────────

  @Public()
  @ApiOperation({ summary: 'Get semua varian produk (public)' })
  @ApiParam({ name: 'productId', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'List varian berhasil diambil' })
  @ApiResponse({ status: 404, description: 'Produk tidak ditemukan' })
  @Get()  // ✅ bukan ':id/variants' lagi
  findVariants(@Param('productId') productId: string) {
    return this.variantsService.findVariants(productId);
  }

  // ─── GET ONE VARIANT ─────────────────────────────────────────────────────────

  @Public()
  @ApiOperation({ summary: 'Get detail satu varian (public)' })
  @ApiParam({ name: 'productId', description: 'Product ID' })
  @ApiParam({ name: 'variantId', description: 'Variant ID' })
  @ApiResponse({ status: 200, description: 'Detail varian berhasil diambil' })
  @ApiResponse({ status: 404, description: 'Varian tidak ditemukan' })
  @Get(':variantId')  // ✅ untuk pre-fill form edit di admin dashboard
  findOneVariant(
    @Param('productId') productId: string,
    @Param('variantId') variantId: string,
  ) {
    return this.variantsService.findOneVariant(productId, variantId);
  }

  // ─── ADD VARIANT ─────────────────────────────────────────────────────────────

  @Roles(Role.admin, Role.super_admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Tambah varian ke produk (admin)' })
  @ApiParam({ name: 'productId', description: 'Product ID' })
  @ApiResponse({ status: 201, description: 'Varian berhasil ditambahkan' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post()  // ✅ bukan ':id/variants' lagi
  addVariant(
    @Param('productId') productId: string,
    @Body() dto: CreateVariantDto,
  ) {
    return this.variantsService.addVariant(productId, dto);
  }

  // ─── UPDATE VARIANT ──────────────────────────────────────────────────────────

  @Roles(Role.admin, Role.super_admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update varian produk (admin)' })
  @ApiParam({ name: 'productId', description: 'Product ID' })
  @ApiParam({ name: 'variantId', description: 'Variant ID' })
  @ApiResponse({ status: 200, description: 'Varian berhasil diupdate' })
  @ApiResponse({ status: 404, description: 'Varian tidak ditemukan' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Patch(':variantId')  // ✅ bukan ':id/variants/:variantId' lagi
  updateVariant(
    @Param('productId') productId: string,
    @Param('variantId') variantId: string,
    @Body() dto: UpdateVariantDto,
  ) {
    return this.variantsService.updateVariant(productId, variantId, dto);
  }

  // ─── DELETE VARIANT ──────────────────────────────────────────────────────────

  @Roles(Role.admin, Role.super_admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Hapus varian produk (admin)' })
  @ApiParam({ name: 'productId', description: 'Product ID' })
  @ApiParam({ name: 'variantId', description: 'Variant ID' })
  @ApiResponse({ status: 200, description: 'Varian berhasil dihapus' })
  @ApiResponse({ status: 404, description: 'Varian tidak ditemukan' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Delete(':variantId')  // ✅ bukan ':id/variants/:variantId' lagi
  removeVariant(
    @Param('productId') productId: string,
    @Param('variantId') variantId: string,
  ) {
    return this.variantsService.removeVariant(productId, variantId);
  }

  // ─── SET VARIANT IMAGE ───────────────────────────────────────────────────────

  @Roles(Role.admin, Role.super_admin)  // ✅ guard ditambahkan
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Set gambar varian (admin)' })
  @ApiParam({ name: 'productId', description: 'Product ID' })
  @ApiParam({ name: 'variantId', description: 'Variant ID' })
  @Post(':variantId/image')
  setVariantImage(
    @Param('productId') productId: string,
    @Param('variantId') variantId: string,
    @Body('imageUrl') imageUrl: string,
  ) {
    return this.variantsService.setVariantImage(productId, variantId, imageUrl);
  }

  // ─── DELETE VARIANT IMAGE ────────────────────────────────────────────────────

  @Roles(Role.admin, Role.super_admin)  // ✅ guard ditambahkan
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Hapus gambar varian (admin)' })
  @ApiParam({ name: 'productId', description: 'Product ID' })
  @ApiParam({ name: 'variantId', description: 'Variant ID' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':variantId/image')
  deleteVariantImage(
    @Param('productId') productId: string,
    @Param('variantId') variantId: string,
  ) {
    return this.variantsService.deleteVariantImage(productId, variantId);
  }

  // ─── BATCH UPDATE VARIANT IMAGES ─────────────────────────────────────────────

  @Roles(Role.admin, Role.super_admin)  // ✅ guard ditambahkan
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Batch update gambar banyak varian (admin)' })
  @ApiParam({ name: 'productId', description: 'Product ID' })
  @Post('images/batch')
  batchUpdateVariantImages(
    @Param('productId') productId: string,
    @Body() dto: UpdateVariantImagesBatchDto,
  ) {
    return this.variantsService.batchUpdateVariantImages(productId, dto);
  }
}
