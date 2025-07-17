import { ICacheService } from '@core/cache/cache.interface';
import { createClient, RedisClientType } from 'redis';
import { RedisConfig } from '@cache/configs/redis.config';
import { LoggerRegistry } from '@common/logger/logger-registry';

export class RedisCacheService implements ICacheService {
  private readonly logger = LoggerRegistry.createLogger(RedisCacheService.name);
  private client: RedisClientType;
  private isConnected = false;

  constructor(private readonly config: RedisConfig) {
    this.client = createClient({
      socket: {
        host: config.host,
        port: config.port,
        connectTimeout: config.connectTimeout,
        reconnectStrategy: (retries) => {
          if (retries > 3) {
            return new Error('Redis connection failed after 3 retries');
          }
          return Math.min(retries * 50, 500);
        },
      },
      password: config.password,
      database: config.db,
    }) as RedisClientType;

    this.setupEventHandlers();
    this.connect();
  }

  private async connect(): Promise<void> {
    try {
      await this.client.connect();
      this.isConnected = true;
    } catch (error) {
      this.logger.error('Failed to connect to Redis:', error);
      throw error;
    }
  }

  private setupEventHandlers(): void {
    this.client.on('error', (error) => {
      this.logger.error('Redis error:', error);
      this.isConnected = false;
    });

    this.client.on('connect', () => {
      this.logger.info('Connected to Redis');
      this.isConnected = true;
    });

    this.client.on('disconnect', () => {
      this.logger.info('Disconnected from Redis');
      this.isConnected = false;
    });
  }

  private getPrefixedKey(key: string): string {
    return `${this.config.keyPrefix}:${key}`;
  }

  private removePrefix(key: string): string {
    const prefix = `${this.config.keyPrefix}:`;
    return key.startsWith(prefix) ? key.substring(prefix.length) : key;
    return key;
  }

  private ensureConnection(): void {
    if (!this.isConnected) {
      throw new Error('Redis client is not connected');
    }
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    this.ensureConnection();
    const prefixedKey = this.getPrefixedKey(key);
    const serializedValue = JSON.stringify(value);
    const expireInSeconds = ttl ?? this.config.defaultTTL;

    if (expireInSeconds) {
      await this.client.setEx(prefixedKey, expireInSeconds, serializedValue);
    } else {
      await this.client.set(prefixedKey, serializedValue);
    }
  }

  async get<T>(key: string): Promise<T | null> {
    this.ensureConnection();
    const prefixedKey = this.getPrefixedKey(key);
    const value = await this.client.get(prefixedKey);

    if (value === null) {
      return null;
    }

    try {
      return JSON.parse(value) as T;
    } catch (error) {
      this.logger.error('Failed to parse cached value:', error);
      return null;
    }
  }

  async delete(key: string): Promise<void> {
    this.ensureConnection();
    const prefixedKey = this.getPrefixedKey(key);
    await this.client.del(prefixedKey);
  }

  async clear(): Promise<void> {
    this.ensureConnection();
    await this.client.flushDb();
  }

  async has(key: string): Promise<boolean> {
    this.ensureConnection();
    const prefixedKey = this.getPrefixedKey(key);
    const result = await this.client.exists(prefixedKey);
    return result === 1;
  }

  async getMultiple<T>(keys: string[]): Promise<Map<string, T>> {
    this.ensureConnection();
    const prefixedKeys = keys.map((key) => this.getPrefixedKey(key));
    const values = await this.client.mGet(prefixedKeys);

    const result = new Map<string, T>();

    for (let i = 0; i < keys.length; i++) {
      const value = values[i];
      const key = keys[i];

      if (value && key) {
        try {
          result.set(key, JSON.parse(value) as T);
        } catch (error) {
          this.logger.error(
            `Failed to parse cached value for key ${key}:`,
            error,
          );
        }
      }
    }

    return result;
  }

  async setMultiple<T>(entries: Map<string, T>, ttl?: number): Promise<void> {
    this.ensureConnection();
    const expireInSeconds = ttl ?? this.config.defaultTTL;

    // Use pipeline for better performance
    const pipeline = this.client.multi();

    for (const [key, value] of entries) {
      const prefixedKey = this.getPrefixedKey(key);
      const serializedValue = JSON.stringify(value);

      if (expireInSeconds) {
        pipeline.setEx(prefixedKey, expireInSeconds, serializedValue);
      } else {
        pipeline.set(prefixedKey, serializedValue);
      }
    }

    await pipeline.exec();
  }

  async getKeys(pattern?: string): Promise<string[]> {
    this.ensureConnection();
    let searchPattern: string;

    if (pattern) {
      searchPattern = `${this.config.keyPrefix}:*${pattern}*`;
    } else {
      searchPattern = `${this.config.keyPrefix}:*`;
    }

    const keys = await this.client.keys(searchPattern);
    return keys.map((key) => this.removePrefix(key));
  }

  async setTTL(key: string, ttl: number): Promise<void> {
    this.ensureConnection();
    const prefixedKey = this.getPrefixedKey(key);
    await this.client.expire(prefixedKey, ttl);
  }

  async getTTL(key: string): Promise<number> {
    this.ensureConnection();
    const prefixedKey = this.getPrefixedKey(key);
    const ttl = await this.client.ttl(prefixedKey);

    // Redis returns -1 if key exists but has no TTL, -2 if key doesn't exist
    return ttl === -2 ? -1 : ttl;
  }
}
