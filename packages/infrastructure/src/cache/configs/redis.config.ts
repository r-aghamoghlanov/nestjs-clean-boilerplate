import z from 'zod';

export const RedisConfig = z.object({
  defaultTTL: z.number().int().positive().optional(),
  keyPrefix: z.string().optional(),
  host: z.string().min(1),
  port: z.number().int().positive(),
  password: z.string(),
  db: z.number().int(),
  connectTimeout: z.number().int().positive(),
  retryDelayOnFailover: z.number().int().positive(),
});
export type RedisConfig = z.infer<typeof RedisConfig>;
