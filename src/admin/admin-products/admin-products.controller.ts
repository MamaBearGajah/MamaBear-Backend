import { CsvUploadDto } from './../dto/admin-product-csv.dto';
import { BadRequestException, Controller, Get, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminProductsService } from './admin-products.service';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';

@ApiTags('Admin Product')
@ApiBearerAuth()
@Controller('admin/products')
export class AdminProductsController {
    constructor(private readonly adminProductsService: AdminProductsService) {}

    @Get('export')
    @ApiOperation({ summary: 'Export all products into a CSV file' })
    async exportCsv(@Res() res: Response) {
        const csvContent = await this.adminProductsService.exportProductsToCsv()

        res.setHeader('Content-Type', 'text/csv')
        res.setHeader('Content-Disposition', 'attachment; filename=products_export.csv')

        return res.status(200).send(csvContent)
    }

    @Post('import')
    @ApiOperation({ summary: 'Import products from a CSV file' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: CsvUploadDto })
    @UseInterceptors(FileInterceptor('file'))
    async importCsv(@UploadedFile() file: Express.Multer.File) {
        if (!file) throw new BadRequestException('Please upload a CSV file')
        if (!file.originalname.match(/\.(csv)$/)) throw new BadRequestException('Only CSV files are allowed')

        return this.adminProductsService.importProductsFromCsv(file.buffer)
    }
}