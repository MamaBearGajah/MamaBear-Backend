import { UpdateImageDto } from './../dto/update-image.dto';
import { CreateImageDto } from './../dto/create-image.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImagesService } from './images.service';
import { Roles } from '../../auth/decorators';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Role } from '../../../generated/prisma/browser';

@Controller('images')
export class ImagesController {
    constructor(private readonly imagesService: ImagesService) {}

    // =================
    // IMAGES ENDPOINTS
    // =================

    @Roles(Role.admin, Role.super_admin)
    @ApiOperation({ summary: 'Tambah gambar ke produk (admin)' })
    @ApiParam({ name: 'id', description: 'Product ID' })
    @ApiResponse({ status: 201, description: 'Gambar berhasil ditambahkan' })
    @ApiResponse({ status: 404, description: 'Produk tidak ditemukan' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiBearerAuth()
    @Post(':id/images')
    addImage(@Param('id') id: string, @Body() dto: CreateImageDto) {
      return this.imagesService.addImage(id, dto);
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
      return this.imagesService.updateImage(imageId, dto);
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
      return this.imagesService.removeImage(imageId);
    }
}