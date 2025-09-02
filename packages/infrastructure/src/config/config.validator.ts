import { z } from 'zod';

/** DATABASE SCHEMA */
const DatabaseConfig = z.object({
  host: z.string().min(1, 'Database host is required'),
  port: z.number().int().positive('Database port must be a positive integer'),
  username: z.string().min(1, 'Database username is required'),
  password: z.string().optional(),
  database: z.string().min(1, 'Database name is required'),
  synchronizeModels: z.boolean().optional(),
  enableQueryLogging: z.boolean().optional(),
});
export type DatabaseConfig = z.infer<typeof DatabaseConfig>;

/** APP SCHEMA */
const AppConfig = z.object({
  port: z.number().int().positive('App port must be a positive integer'),
  logLevel: z.enum(['info', 'error', 'fatal', 'warn', 'debug', 'trace']),
  enableHttpLogging: z.boolean().optional(),
});
export type AppConfig = z.infer<typeof AppConfig>;

/** SWAGGER SCHEMA */
const SwaggerConfig = z
  .object({
    enabled: z.boolean(),
    user: z.string().optional(),
    password: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.enabled) {
        return (
          data.user &&
          data.password &&
          data.user.length > 0 &&
          data.password.length > 0
        );
      }
      return true;
    },
    {
      message: 'Swagger user and password are required when enabled is true',
      path: ['user', 'password'],
    },
  );
export type SwaggerConfig = z.infer<typeof SwaggerConfig>;

/** BASE CACHE SCHEMA */
const BaseCacheConfig = z.object({
  defaultTTL: z.number().int().positive().optional(),
  keyPrefix: z.string().optional(),
});
export type BaseCacheConfig = z.infer<typeof BaseCacheConfig>;

const Config = z.object({
  database: DatabaseConfig,
  app: AppConfig,
  swagger: SwaggerConfig,
  baseCache: BaseCacheConfig,
});
export type Config = z.infer<typeof Config>;

export { Config, DatabaseConfig, AppConfig, SwaggerConfig, BaseCacheConfig };
