import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminCustomersService } from './admin-customers.service';
import { AdminBaseQueryDto } from '../dto/admin-query.dto';

@ApiTags('Admin Customers')
@ApiBearerAuth()
@Controller('admin/customers')
export class AdminCustomersController {
    constructor(private readonly adminCustomersService: AdminCustomersService) {}

    @Get()
    @ApiOperation({ summary: 'Get list of customers with pagination and search' })
    async getAll(@Query() query: AdminBaseQueryDto) {
        return this.adminCustomersService.findAll(query)
    }
}
