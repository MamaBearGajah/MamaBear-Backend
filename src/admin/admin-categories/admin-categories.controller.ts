import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminCategoriesService } from './admin-categories.service';
import { AdminBaseQueryDto } from '../dto/admin-query.dto';

@ApiTags('Admin Categories')
@ApiBearerAuth()
@Controller('admin/categories')
export class AdminCategoriesController {
    constructor(private readonly adminCategoriesService: AdminCategoriesService) {}

    @Get()
    @ApiOperation({ summary: 'Get list of categories with pagination and search' })
    async getAll(@Query() query: AdminBaseQueryDto) {
        return this.adminCategoriesService.findAll(query)
    }
}
