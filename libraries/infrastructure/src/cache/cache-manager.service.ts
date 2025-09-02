import {
  CacheType,
  ICacheManager,
} from '@package/core/cache/cache-manager.interface';
import { ICacheService } from '@package/core/cache/cache.interface';
import { LoggerRegistry } from '@package/core/common/logger/logger-registry';

export class CacheManagerService implements ICacheManager {
  private readonly logger = LoggerRegistry.createLogger(
    CacheManagerService.name,
  );
  private currentType: CacheType = CacheType.PERSISTENT;

  constructor(
    private readonly persistentCache: ICacheService,
    private readonly inMemoryCache: ICacheService,
  ) {}

  setType(type: CacheType): void {
    this.logger.debug(`Switching cache type to '${type}'`);
    this.currentType = type;
  }

  getType(): CacheType {
    return this.currentType;
  }

  getCacheService(type?: CacheType): ICacheService {
    const targetType = type ?? this.currentType;
    switch (targetType) {
      case CacheType.PERSISTENT:
        return this.persistentCache;
      case CacheType.IN_MEMORY:
        return this.inMemoryCache;
      default:
        throw new Error(`Unsupported cache type: ${String(targetType)}`);
    }
  }
}
