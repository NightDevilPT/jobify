import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CacheService } from 'src/services/cache/cache.service';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(private readonly cacheService: CacheService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const userId = request['user']?.userId;
    const key = this.generateCacheKey(request, userId);

    // Try to get the cached response
    const cachedResponse = await this.cacheService.get(key);
    if (cachedResponse) {
      console.log('Returning cached response for key:', key);
      return of(cachedResponse); // Return the cached data as an Observable
    }

    // If no cache, proceed with the request and cache the response
    return next.handle().pipe(
      tap(async (response) => {
        console.log('Caching response for key:', key);
        await this.cacheService.set(key, response, 60); // Set TTL as needed
      }),
    );
  }

  // Custom function to generate a cache key based on request data
  generateCacheKey(request: any, userId: string): string {
    const { method, url, params, query } = request;
    const key = `${method}-${url}-${userId}-${JSON.stringify(params)}-${JSON.stringify(query)}`;
    return key;
  }
}
