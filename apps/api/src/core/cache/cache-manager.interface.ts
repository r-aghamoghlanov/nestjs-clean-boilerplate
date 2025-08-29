import { ICacheService } from './cache.interface';

export const CacheType = {
  /**
   * Persistent storage that survives application restarts (Redis etc.)
   */
  PERSISTENT: 'persistent',

  /**
   * In-memory storage for fast access (Custom Map, LRU, etc.)
   */
  IN_MEMORY: 'in-memory',
} as const;

export type CacheType = (typeof CacheType)[keyof typeof CacheType];

export interface ICacheManager {
  /**
   * Set the cache type to use for subsequent operations
   * @param type - The cache type to use
   */
  setType(type: CacheType): void;

  /**
   * Get the current cache type
   * @returns The currently set cache type
   */
  getType(): CacheType;

  /**
   * Get a cache service instance for direct use (if needed)
   * @param type - The cache type to get the service for (optional, uses current type if not provided)
   */
  getCacheService(type?: CacheType): ICacheService;
}
