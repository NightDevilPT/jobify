import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  // Set cache with a key and value
  async set(key: string, value: any, ttl?: number): Promise<void> {
    await this.cacheManager.set(key, value, ttl); // ttl is optional
  }

  // Get cache by key
  async get<T>(key: string): Promise<T | null> {
    return await this.cacheManager.get<T>(key);
  }

  // Remove cache by key
  async del(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

  // Clear all cache
  async reset(): Promise<void> {
    await this.cacheManager.reset();
  }
}
