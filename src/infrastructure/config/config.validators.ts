import {
  IConfig,
  IDatabaseConfig,
  IS3Config,
} from '../../shared/config.interface';
import { z } from 'zod';

const DatabaseConfigSchema = z.object({
  host: z.string().min(1, 'Database host is required'),
  port: z.number().int().positive('Database port must be a positive integer'),
  username: z.string().min(1, 'Database username is required'),
  password: z.string().optional(),
  database: z.string().min(1, 'Database name is required'),
}) satisfies z.ZodType<IDatabaseConfig>;

const S3ConfigSchema = z.object({
  accessKeyId: z.string().min(1, 'AWS access key ID is required'),
  secretAccessKey: z.string().min(1, 'AWS secret access key is required'),
  region: z.string().min(1, 'AWS region is required'),
}) satisfies z.ZodType<IS3Config>;

const ConfigSchema = z.object({
  database: DatabaseConfigSchema,
  AWS: z.object({
    s3: S3ConfigSchema,
  }),
  appPort: z.number().int().positive('App port must be a positive integer'),
}) satisfies z.ZodType<IConfig>;

export { ConfigSchema, DatabaseConfigSchema, S3ConfigSchema };
