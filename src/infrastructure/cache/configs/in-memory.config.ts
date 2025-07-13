import { z } from 'zod';
import { BaseCacheConfig } from '@config/config.validator';

const InMemoryCacheConfig = z.object({
  ...BaseCacheConfig.shape,
  maxSize: z.number().int().positive().optional(),
  checkInterval: z.number().int().positive().optional(),
});
export type InMemoryCacheConfig = z.infer<typeof InMemoryCacheConfig>;
