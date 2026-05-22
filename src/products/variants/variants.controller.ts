import { UpdateVariantDto } from './../dto/update-variant.dto';
import { CreateVariantDto } from './../dto/create-variant.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { VariantsService } from './variants.service';
import { Public, Roles } from '../../auth/decorators';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Role } from '../../../generated/prisma/browser';
import { UpdateVariantImagesBatchDto } from '../dto/update-batch-variant-images.dto';

@Controller('products/:productId/variants')
export class VariantsController {
    constructor(private readonly variantsService: VariantsService) {}

    // =================
    // VARIANT ENDPOINTS
    // =================

    @Public()
    @ApiOperation({ summary: 'Get semua varian produk' })
    @ApiParam({ name: 'id', description: 'Product ID' })
    @ApiResponse({ status: 200, description: 'List varian berhasil diambil' })
    @ApiResponse({ status: 404, description: 'Produk tidak ditemukan' })
    @Get(':id/variants')
    findVariants(@Param('id') id: string) {
      return this.variantsService.findVariants(id);
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
      return this.variantsService.addVariant(id, dto);
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
      return this.variantsService.updateVariant(variantId, dto);
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
      return this.variantsService.removeVariant(variantId);
    }

    @Post(':variantId/image')
    setVariantImage(@Param('productId') productId: string, @Param('variantId') variantId: string, @Body('imageUrl') imageUrl: string) {
      return this.variantsService.setVariantImage(productId, variantId, imageUrl)
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':variantId/image')
    deleteVariantImage(@Param('productId') productId: string, @Param('variantId') variantId: string) {
      return this.variantsService.deleteVariantImage(productId, variantId)
    }

    @Post('images/batch')
    batchUpdateVariantImages(@Param('productId') productId: string, @Body() dto: UpdateVariantImagesBatchDto) {
      return this.variantsService.batchUpdateVariantImages(productId, dto)
    }
    
}
