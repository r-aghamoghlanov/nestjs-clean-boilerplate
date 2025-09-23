import { Module } from '@nestjs/common';
import { CUSTOM_PROVIDER_TOKENS } from './provider-tokens';
import { RedisCacheService } from '@package/infrastructure/cache/redis-cache.service';
import { InMemoryCacheService } from '@package/infrastructure/cache/in-memory-cache.service';
import { CacheManagerService } from '@package/infrastructure/cache/cache-manager.service';
import { RedisConfig } from '@package/infrastructure/cache/configs/redis.config';
import { InMemoryCacheConfig } from '@package/infrastructure/cache/configs/in-memory.config';
import { configService, config } from '../config';

@Module({
  providers: [
    {
      useFactory: () => {
        const redisConfig = RedisConfig.parse({
          ...config.baseCache,
          host: configService.find('REDIS_HOST') ?? 'localhost',
          port: Number(configService.find('REDIS_PORT') ?? 6379),
          password: configService.find('REDIS_PASSWORD'),
          db: Number(configService.find('REDIS_DB') ?? 0),
          connectTimeout: Number(
            configService.find('REDIS_CONNECT_TIMEOUT') ?? 5000,
          ),
          retryDelayOnFailover: Number(
            configService.find('REDIS_RETRY_DELAY') ?? 100,
          ),
        });

        const inMemoryConfig = InMemoryCacheConfig.parse({
          ...config.baseCache,
          maxSize: Number(
            configService.find('IN_MEMORY_CACHE_MAX_SIZE') ?? 1000,
          ),
          checkInterval: Number(
            configService.find('IN_MEMORY_CACHE_CHECK_INTERVAL') ?? 60000,
          ),
        });

        const redisCache = new RedisCacheService(redisConfig);
        const inMemoryCache = new InMemoryCacheService(inMemoryConfig);

        return new CacheManagerService(redisCache, inMemoryCache);
      },
      provide: CUSTOM_PROVIDER_TOKENS.CACHE_MANAGER,
    },
  ],
  exports: [CUSTOM_PROVIDER_TOKENS.CACHE_MANAGER],
})
export class CacheModule {}
