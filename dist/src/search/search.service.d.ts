import { PrismaService } from '../prisma/prisma.service';
import { CacheService } from '../cache/cache.service';
import { SearchQueryDto } from './dto/search-query.dto';
export declare class SearchService {
    private readonly prisma;
    private readonly cache;
    constructor(prisma: PrismaService, cache: CacheService);
    search(query: SearchQueryDto): Promise<{}>;
    getSuggestions(q: string): Promise<string[]>;
    getPopularSearches(limit?: number): Promise<{}>;
    private trackSearch;
    private buildOrderBy;
    private getAllDescendantIds;
}
