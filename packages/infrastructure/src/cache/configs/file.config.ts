import z from 'zod';

export const FileCacheConfig = z.object({
  defaultTTL: z.number().int().positive().optional(),
  keyPrefix: z.string().optional(),
  directory: z.string().min(1),
  maxFileSize: z.number().int().positive().optional(),
  cleanupInterval: z.number().int().positive().optional(),
});
export type FileCacheConfig = z.infer<typeof FileCacheConfig>;
