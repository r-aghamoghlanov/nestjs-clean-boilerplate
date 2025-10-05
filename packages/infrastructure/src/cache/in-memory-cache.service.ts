import { ICacheService } from '@backend/core/cache/cache.interface';
import { CacheEntry, CacheStats } from '@backend/core/cache/cache.types';
import { InMemoryCacheConfig } from './configs/in-memory.config';
import { LoggerRegistry } from '@backend/core/common/logger/logger-registry';

export class InMemoryCacheService implements ICacheService {
  private readonly logger = LoggerRegistry.createLogger(
    InMemoryCacheService.name,
  );
  private cache = new Map<string, CacheEntry>();
  private stats: CacheStats = {
    hits: 0,
    misses: 0,
    sets: 0,
    deletes: 0,
    size: 0,
  };
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor(private readonly config: InMemoryCacheConfig) {
    this.startCleanupInterval();
    this.logger.info('In-memory cache initialized');
  }

  async set<T>(key: string, value: T, expireInSeconds?: number): Promise<void> {
    const prefixedKey = this.getPrefixedKey(key);
    const itemTTL = expireInSeconds ?? this.config.defaultTTL;

    const entry: CacheEntry<T> = {
      value,
      ttl: itemTTL,
      createdAt: Date.now(),
    };

    this.cache.set(prefixedKey, entry);
    this.stats.sets++;
    this.stats.size = this.cache.size;

    // Check if we need to evict items due to maxSize
    if (this.cache.size > this.config.maxSize) {
      this.evictOldestItems();
    }

    return Promise.resolve();
  }

  async get<T>(key: string): Promise<T | null> {
    const prefixedKey = this.getPrefixedKey(key);
    const entry = this.cache.get(prefixedKey);

    if (!entry) {
      this.stats.misses++;
      return Promise.resolve(null);
    }

    if (this.isExpired(entry)) {
      this.cache.delete(prefixedKey);
      this.stats.deletes++;
      this.stats.misses++;
      this.stats.size = this.cache.size;
      return Promise.resolve(null);
    }

    this.stats.hits++;
    return Promise.resolve(entry.value as T);
  }

  async delete(key: string): Promise<void> {
    const prefixedKey = this.getPrefixedKey(key);
    const deleted = this.cache.delete(prefixedKey);
    if (deleted) {
      this.stats.deletes++;
      this.stats.size = this.cache.size;
    }
    return Promise.resolve();
  }

  async clear(): Promise<void> {
    this.cache.clear();
    this.stats.size = 0;
    return Promise.resolve();
  }

  async has(key: string): Promise<boolean> {
    const prefixedKey = this.getPrefixedKey(key);
    const entry = this.cache.get(prefixedKey);

    if (!entry) {
      return Promise.resolve(false);
    }

    if (this.isExpired(entry)) {
      this.cache.delete(prefixedKey);
      this.stats.deletes++;
      this.stats.size = this.cache.size;
      return Promise.resolve(false);
    }

    return Promise.resolve(true);
  }

  async getMultiple<T>(keys: string[]): Promise<Map<string, T>> {
    const result = new Map<string, T>();

    for (const key of keys) {
      const value = await this.get<T>(key);
      if (value !== null) {
        result.set(key, value);
      }
    }

    return result;
  }

  async setMultiple<T>(entries: Map<string, T>, ttl?: number): Promise<void> {
    for (const [key, value] of entries) {
      await this.set(key, value, ttl);
    }
  }

  getKeys(pattern?: string): Promise<string[]> {
    const keys = Array.from(this.cache.keys());
    const unprefixedKeys = keys.map((key) => this.removePrefix(key));

    if (!pattern) {
      return Promise.resolve(unprefixedKeys);
    }

    // Simple pattern matching - can be enhanced with regex
    return Promise.resolve(
      unprefixedKeys.filter((key) => key.includes(pattern)),
    );
  }

  setTTL(key: string, ttl: number): Promise<void> {
    const prefixedKey = this.getPrefixedKey(key);
    const entry = this.cache.get(prefixedKey);

    if (entry) {
      entry.ttl = ttl;
      entry.createdAt = Date.now();
      this.cache.set(prefixedKey, entry);
    }
    return Promise.resolve();
  }

  getTTL(key: string): Promise<number> {
    const prefixedKey = this.getPrefixedKey(key);
    const entry = this.cache.get(prefixedKey);

    if (!entry || !entry.ttl) {
      return Promise.resolve(-1);
    }

    const timeLeft = entry.ttl - (Date.now() - entry.createdAt) / 1000;
    return Promise.resolve(timeLeft > 0 ? Math.ceil(timeLeft) : -1);
  }

  getStats(): CacheStats {
    return { ...this.stats };
  }

  private getPrefixedKey(key: string): string {
    return `${this.config.keyPrefix}:${key}`;
  }

  private removePrefix(key: string): string {
    if (this.config?.keyPrefix) {
      const prefix = `${this.config.keyPrefix}:`;
      return key.startsWith(prefix) ? key.substring(prefix.length) : key;
    }
    return key;
  }

  private isExpired(entry: CacheEntry): boolean {
    if (!entry.ttl) {
      return false;
    }

    const now = Date.now();
    const expirationTime = entry.createdAt + entry.ttl * 1000;
    return now > expirationTime;
  }

  private evictOldestItems(): void {
    const maxSize = this.config.maxSize;
    const itemsToEvict = this.cache.size - maxSize;

    if (itemsToEvict > 0) {
      const keys = Array.from(this.cache.keys());
      for (let i = 0; i < itemsToEvict && i < keys.length; i++) {
        const key = keys[i];
        if (key) {
          this.cache.delete(key);
          this.stats.deletes++;
        }
      }
      this.stats.size = this.cache.size;
    }
  }

  private startCleanupInterval(): void {
    const interval = this.config.checkInterval;

    this.cleanupInterval = setInterval(() => {
      this.cleanupExpiredEntries();
    }, interval);
  }

  private cleanupExpiredEntries(): void {
    for (const [key, entry] of this.cache.entries()) {
      if (this.isExpired(entry)) {
        this.cache.delete(key);
        this.stats.deletes++;
      }
    }

    this.stats.size = this.cache.size;
  }
}
