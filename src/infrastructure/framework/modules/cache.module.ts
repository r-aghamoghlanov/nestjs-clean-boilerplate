import { Module } from '@nestjs/common';
import { CUSTOM_PROVIDER_TOKENS } from './provider-tokens';
import { RedisCacheService } from '@cache/redis-cache.service';
import { RedisConfig } from '@cache/configs/redis.config';
import config from '@config/config.service';

@Module({
  providers: [
    {
      useFactory: () => {
        const redisConfig = RedisConfig.parse({
          ...config.baseCache,
          host: config.find('REDIS_HOST') ?? 'localhost',
          port: Number(config.find('REDIS_PORT') ?? 6379),
          password: config.find('REDIS_PASSWORD'),
          db: Number(config.find('REDIS_DB') ?? 0),
          connectTimeout: Number(config.find('REDIS_CONNECT_TIMEOUT') ?? 5000),
          retryDelayOnFailover: Number(config.find('REDIS_RETRY_DELAY') ?? 100),
        });

        return new RedisCacheService(redisConfig);
      },
      provide: CUSTOM_PROVIDER_TOKENS.CACHE_SERVICE,
    },
  ],
  exports: [CUSTOM_PROVIDER_TOKENS.CACHE_SERVICE],
})
export class CacheModule {}
