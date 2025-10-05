import { z } from 'zod';

export const InMemoryCacheConfig = z.object({
  defaultTTL: z.number().int().positive().optional(),
  keyPrefix: z.string().optional(),
  maxSize: z.number().int().positive(),
  checkInterval: z.number().int().positive(),
});
export type InMemoryCacheConfig = z.infer<typeof InMemoryCacheConfig>;
