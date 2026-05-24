import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { SearchService } from './search.service.js';
import { BadRequestResponseDto } from '../common/dto/response.dto.js';
import { Public } from '../auth/decorators/index.js';
import { SearchResponseDto, SearchSuggestionsResponseDto } from './dto/search-response.dto.js';

@ApiTags('Search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Public()
  @Get()
  @ApiOkResponse({ description: 'Returns matching products, categories, and blog posts for the query.', type: SearchResponseDto })
  @ApiBadRequestResponse({ description: 'Query parameter "q" is required.', type: BadRequestResponseDto })
  search(@Query('q') q: string, @Query('limit') limit?: string) {
    return this.searchService.search(q, limit ? Number(limit) : undefined);
  }

  @Public()
  @Get('suggestions')
  @ApiOkResponse({ description: 'Returns search suggestions based on the query prefix.', type: SearchSuggestionsResponseDto })
  @ApiBadRequestResponse({ description: 'Query parameter "q" is required.', type: BadRequestResponseDto })
  suggestions(@Query('q') q: string) {
    return this.searchService.suggestions(q);
  }
}
