import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorators';
import { SearchService } from './search.service';
import { SearchQueryDto } from './dto/search-query.dto';

@ApiTags('Search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  // ─── Search ───────────────────────────────────────────────────────────────

  @Public()
  @Get()
  @ApiOperation({ summary: 'Cari produk dengan filter & sorting (public)' })
  @ApiResponse({ status: 200, description: 'Hasil pencarian produk' })
  search(@Query() query: SearchQueryDto) {
    return this.searchService.search(query);
  }

  // ─── Suggestions ──────────────────────────────────────────────────────────
  // PENTING: route statis harus di atas route dinamis

  @Public()
  @Get('suggestions')
  @ApiOperation({ summary: 'Autocomplete — saran nama produk (public)' })
  @ApiQuery({ name: 'q', required: true, description: 'Kata kunci minimal 1 karakter' })
  @ApiResponse({ status: 200, description: 'Array nama produk yang cocok' })
  suggestions(@Query('q') q: string) {
    return this.searchService.getSuggestions(q ?? '');
  }

  // ─── Popular ──────────────────────────────────────────────────────────────

  @Public()
  @Get('popular')
  @ApiOperation({ summary: 'Kata kunci paling sering dicari (public)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Default 10' })
  @ApiResponse({ status: 200, description: 'List popular searches' })
  popular(@Query('limit') limit?: string) {
    return this.searchService.getPopularSearches(limit ? Number(limit) : 10);
  }
}