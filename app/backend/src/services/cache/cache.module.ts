import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CacheModule as RootCacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    RootCacheModule.register({
      ttl: 300,
    }),
  ],
  providers: [CacheService],
  exports: [CacheService], // Export the service to use in other modules
})
export class CacheModule {}
