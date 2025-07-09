import {
  IConfig,
  IDatabaseConfig,
  IS3Config,
  IAppConfig,
  IAWSConfig,
} from '../../shared/config.interface';
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

/** AWS SCHEMA */
const S3ConfigSchema = z.object({
  accessKeyId: z.string().min(1, 'AWS access key ID is required'),
  secretAccessKey: z.string().min(1, 'AWS secret access key is required'),
  region: z.string().min(1, 'AWS region is required'),
}) satisfies z.ZodType<IS3Config>;

const AWSConfigSchema = z.object({
  s3: S3ConfigSchema,
}) satisfies z.ZodType<IAWSConfig>;

/** APP SCHEMA */
const AppConfigSchema = z.object({
  port: z.number().int().positive('App port must be a positive integer'),
}) satisfies z.ZodType<IAppConfig>;

const ConfigSchema = z.object({
  database: DatabaseConfigSchema,
  AWS: AWSConfigSchema,
  appConfig: AppConfigSchema,
}) satisfies z.ZodType<IConfig>;

export { ConfigSchema, DatabaseConfigSchema, S3ConfigSchema };
