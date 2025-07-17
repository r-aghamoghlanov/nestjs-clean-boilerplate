import { z } from 'zod';
import { BaseCacheConfig } from '@config/config.validator';

export const InMemoryCacheConfig = z.object({
  ...BaseCacheConfig.shape,
  maxSize: z.number().int().positive(),
  checkInterval: z.number().int().positive(),
});
export type InMemoryCacheConfig = z.infer<typeof InMemoryCacheConfig>;
