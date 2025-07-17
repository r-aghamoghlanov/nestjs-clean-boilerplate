import z from 'zod';
import { BaseCacheConfig } from '@config/config.validator';

export const RedisConfig = z.object({
  ...BaseCacheConfig.shape,
  host: z.string().min(1),
  port: z.number().int().positive(),
  password: z.string(),
  db: z.number().int(),
  connectTimeout: z.number().int().positive(),
  retryDelayOnFailover: z.number().int().positive(),
});
export type RedisConfig = z.infer<typeof RedisConfig>;
