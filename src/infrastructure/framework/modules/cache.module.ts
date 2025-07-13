import { Module } from '@nestjs/common';
import { CUSTOM_PROVIDER_TOKENS } from './provider-tokens';
import { InMemoryCacheService } from '@cache/in-memory-cache.service';
import { InMemoryCacheConfig } from '@cache/configs/in-memory.config';
import config from '@config/config.service';

@Module({
  providers: [
    {
      useFactory: () => {
        const inMemoryConfig = InMemoryCacheConfig.parse({
          ...config.baseCache,
          maxSize: Number(config.find('MEMORY_CACHE_MAX_NUMBER_OF_ELEMENTS')),
          checkInterval: Number(
            config.find('MEMORY_CACHE_CHECK_INTERVAL_IN_MILLISECONDS') ?? 60000,
          ),
        });

        return new InMemoryCacheService(inMemoryConfig);
      },
      provide: CUSTOM_PROVIDER_TOKENS.CACHE_SERVICE,
    },
  ],
  exports: [CUSTOM_PROVIDER_TOKENS.CACHE_SERVICE],
})
export class CacheModule {}
