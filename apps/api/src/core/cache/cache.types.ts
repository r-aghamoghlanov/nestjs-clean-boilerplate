export type CacheEntry<T = any> = {
  value: T;
  ttl?: number;
  createdAt: number;
};

export type CacheStats = {
  hits: number;
  misses: number;
  sets: number;
  deletes: number;
  size: number;
};
