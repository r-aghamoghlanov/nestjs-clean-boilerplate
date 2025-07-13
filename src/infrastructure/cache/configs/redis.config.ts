import z from 'zod';
import { BaseCacheConfig } from '@config/config.validator';

const RedisConfig = z.object({
  ...BaseCacheConfig.shape,
  host: z.string().min(1),
  port: z.number().int().positive(),
  password: z.string().optional(),
  db: z.number().int().optional(),
  connectTimeout: z.number().int().positive().optional(),
  retryDelayOnFailover: z.number().int().positive().optional(),
});
export type RedisConfig = z.infer<typeof RedisConfig>;
