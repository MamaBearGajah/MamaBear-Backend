import type { Cache } from 'cache-manager';
export declare class CacheService {
    private cacheManager;
    constructor(cacheManager: Cache);
    get<T>(key: string): Promise<T | null>;
    set(key: string, value: unknown, ttlSeconds?: number): Promise<void>;
    del(key: string): Promise<void>;
    delByPattern(pattern: string): Promise<void>;
    static keys: {
        products: (query: string) => string;
        product: (id: string) => string;
        productSlug: (slug: string) => string;
        productBestSellers: (limit: number) => string;
        categories: (query: string) => string;
        category: (id: string) => string;
        categoryProducts: (id: string, query: string) => string;
        search: (query: string) => string;
        searchSuggestions: (q: string) => string;
        popularSearches: () => string;
    };
}
