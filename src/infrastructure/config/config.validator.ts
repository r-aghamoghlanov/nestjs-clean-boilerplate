import {
  IConfig,
  IDatabaseConfig,
  IAppConfig,
  ISwaggerConfig,
} from '@common/config/config.interface';
import { z } from 'zod';

/** DATABASE SCHEMA */
const DatabaseConfigSchema = z.object({
  host: z.string().min(1, 'Database host is required'),
  port: z.number().int().positive('Database port must be a positive integer'),
  username: z.string().min(1, 'Database username is required'),
  password: z.string().optional(),
  database: z.string().min(1, 'Database name is required'),
  synchronizeModels: z.boolean().optional(),
  enableQueryLogging: z.boolean().optional(),
}) satisfies z.ZodType<IDatabaseConfig>;

/** APP SCHEMA */
const AppConfigSchema = z.object({
  port: z.number().int().positive('App port must be a positive integer'),
  logLevel: z.enum(['info', 'error', 'fatal', 'warn', 'debug', 'trace']),
  enableHttpLogging: z.boolean().optional(),
}) satisfies z.ZodType<IAppConfig>;

/** SWAGGER SCHEMA */
const SwaggerConfigSchema = z
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
  ) satisfies z.ZodType<ISwaggerConfig>;

const ConfigSchema = z.object({
  database: DatabaseConfigSchema,
  app: AppConfigSchema,
  swagger: SwaggerConfigSchema,
}) satisfies z.ZodType<IConfig>;

export { ConfigSchema, DatabaseConfigSchema };
