import z from 'zod';
import { BaseCacheConfig } from '@config/config.validator';

export const FileCacheConfig = z.object({
  ...BaseCacheConfig.shape,
  directory: z.string().min(1),
  maxFileSize: z.number().int().positive().optional(),
  cleanupInterval: z.number().int().positive().optional(),
});
export type FileCacheConfig = z.infer<typeof FileCacheConfig>;
