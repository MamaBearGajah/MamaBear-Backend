import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get<T>(key: string): Promise<T | null> {
    return (await this.cacheManager.get<T>(key)) ?? null;
  }

  async set(key: string, value: unknown, ttlSeconds?: number): Promise<void> {
    await this.cacheManager.set(key, value, ttlSeconds ? ttlSeconds * 1000 : undefined);
  }

  async del(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

  async delByPattern(pattern: string): Promise<void> {
    // cache-manager-redis-yet eksposes store.client untuk raw Redis ops
    const store = (this.cacheManager as any).store;
    if (store?.client) {
      const keys: string[] = await store.client.keys(pattern);
      if (keys.length > 0) {
        await store.client.del(keys);
      }
    }
  }

  // ─── Typed cache key builders ─────────────────────────────────────────────

  static keys = {
    products: (query: string) => `products:list:${query}`,
    product: (id: string) => `products:${id}`,
    productSlug: (slug: string) => `products:slug:${slug}`,
    productBestSellers: (limit: number) => `products:best-sellers:${limit}`,
    categories: (query: string) => `categories:list:${query}`,
    category: (id: string) => `categories:${id}`,
    categoryProducts: (id: string, query: string) => `categories:${id}:products:${query}`,
    search: (query: string) => `search:${query}`,
    searchSuggestions: (q: string) => `search:suggestions:${q}`,
    popularSearches: () => `search:popular`,
  };
}