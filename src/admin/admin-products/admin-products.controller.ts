// src/admin/admin-products/admin-products.controller.ts — GANTI FILE LAMA DENGAN INI
// Perubahan: tambah POST /:id/duplicate

import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Param,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiPropertyOptional,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { IsArray, IsEnum, IsNumber, IsOptional } from 'class-validator';
import type { Response } from 'express';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators';
import { Role, ProductStatus } from '../../../generated/prisma/enums';
import { AdminProductsService } from './admin-products.service';
import { CsvUploadDto } from '../dto/admin-product-csv.dto';

class BulkUpdateDataDto {
  @ApiPropertyOptional({
    enum: ProductStatus,
    example: ProductStatus.active,
    description: 'Ubah status produk (active / inactive / draft)',
  })
  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;

  @ApiPropertyOptional({ example: 50000, description: 'Ubah harga dasar produk' })
  @IsOptional()
  @IsNumber()
  basePrice?: number;
}

class BulkUpdateDto {
  @ApiProperty({ example: ['uuid-1', 'uuid-2'], description: 'Array product IDs yang akan diupdate' })
  @IsArray()
  ids!: string[];

  @ApiProperty({ type: BulkUpdateDataDto })
  data!: BulkUpdateDataDto;
}

@ApiTags('Admin Product')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.admin, Role.super_admin)
@Controller('admin/products')
export class AdminProductsController {
  constructor(private readonly adminProductsService: AdminProductsService) {}

  @Get('export')
  @ApiOperation({ summary: 'Export all products into a CSV file' })
  async exportCsv(@Res() res: Response) {
    const csvContent = await this.adminProductsService.exportProductsToCsv();
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=products_export.csv');
    return res.status(200).send(csvContent);
  }

  @Post('import')
  @ApiOperation({ summary: 'Import products from a CSV file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CsvUploadDto })
  @UseInterceptors(FileInterceptor('file'))
  async importCsv(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('Please upload a CSV file');
    if (!file.originalname.match(/\.(csv)$/))
      throw new BadRequestException('Only CSV files are allowed');
    return this.adminProductsService.importProductsFromCsv(file.buffer);
  }

  @Post('bulk')
  @ApiOperation({
    summary: 'Bulk update status/harga untuk array product IDs',
    description: 'Update status (active/inactive/draft) dan/atau basePrice untuk banyak produk sekaligus.',
  })
  @ApiBody({ type: BulkUpdateDto })
  async bulkUpdate(@Body() dto: BulkUpdateDto) {
    if (!dto.ids?.length) throw new BadRequestException('ids tidak boleh kosong');
    if (!dto.data || Object.keys(dto.data).length === 0)
      throw new BadRequestException('data update tidak boleh kosong');
    return this.adminProductsService.bulkUpdateProducts(dto);
  }

  // ── POST /admin/products/:id/duplicate ─────────────────────────────────────
  @Post(':id/duplicate')
  @ApiOperation({
    summary: '[Admin] Duplikasi produk',
    description:
      'Membuat produk baru berdasarkan produk yang ada. ' +
      'SKU di-generate otomatis, status set ke draft, ' +
      'URL gambar direferensikan (tidak dicopy di cloud storage).',
  })
  @ApiParam({ name: 'id', description: 'Product ID yang akan diduplikasi' })
  async duplicate(@Param('id') id: string) {
    return this.adminProductsService.duplicateProduct(id);
  }
}
