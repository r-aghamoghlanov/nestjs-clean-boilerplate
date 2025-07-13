export interface ICacheService {
  /**
   * Store a value in the cache
   * @param key - The cache key
   * @param value - The value to store
   * @param ttl - Time to live in seconds (optional)
   */
  set<T>(key: string, value: T, ttl?: number): Promise<void>;

  /**
   * Retrieve a value from the cache
   * @param key - The cache key
   * @returns The cached value or null if not found
   */
  get<T>(key: string): Promise<T | null>;

  /**
   * Delete a value from the cache
   * @param key - The cache key
   */
  delete(key: string): Promise<void>;

  /**
   * Clear all values from the cache
   */
  clear(): Promise<void>;

  /**
   * Check if a key exists in the cache
   * @param key - The cache key
   */
  has(key: string): Promise<boolean>;

  /**
   * Get multiple values from the cache
   * @param keys - Array of cache keys
   */
  getMultiple<T>(keys: string[]): Promise<Map<string, T>>;

  /**
   * Set multiple values in the cache
   * @param entries - Map of key-value pairs
   * @param ttl - Time to live in seconds (optional)
   */
  setMultiple<T>(entries: Map<string, T>, ttl?: number): Promise<void>;

  /**
   * Get keys matching a pattern
   * @param pattern - The pattern to match (implementation specific)
   */
  getKeys(pattern?: string): Promise<string[]>;

  /**
   * Set TTL for an existing key
   * @param key - The cache key
   * @param ttl - Time to live in seconds
   */
  setTTL(key: string, ttl: number): Promise<void>;

  /**
   * Get TTL for a key
   * @param key - The cache key
   * @returns TTL in seconds or -1 if no TTL is set
   */
  getTTL(key: string): Promise<number>;
}
