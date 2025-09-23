import { ConfigService } from './config.service';
import { LogLevel } from '@backend/core/common/logger/logger.interface';
import path from 'node:path';
import { DeepPartial } from '@backend/core/common/custom.type';
import {
  ApiAppConfig,
  WorkerAppConfig,
  InfrastructureConfig,
} from './config.validator';
import { ConfigServiceOptions } from './config.types';

export class ConfigServiceFactory {
  static buildApiConfigService(
    envFilePath?: string,
  ): ConfigService<ApiAppConfig> {
    return new ConfigService({
      envFilePath: envFilePath || path.join(process.cwd(), '.env'),
      validationSchema: ApiAppConfig,
      name: 'api',
      configBuilder: (find): DeepPartial<ApiAppConfig> => ({
        database: {
          host: find('DATABASE_HOST'),
          port: Number(find('DATABASE_PORT') ?? 5432),
          username: find('DATABASE_USERNAME'),
          password: find('DATABASE_PASSWORD'),
          database: find('DATABASE_NAME'),
          enableQueryLogging: find('LOG_GENERATED_QUERIES') === 'true',
        },
        app: {
          port: Number(find('PORT') ?? 3000),
          logLevel: find('LOG_LEVEL') as LogLevel,
          enableHttpLogging: find('ENABLE_HTTP_LOGGING') === 'true',
        },
        baseCache: {
          defaultTTL: Number(find('CACHE_DEFAULT_TTL_IN_SECONDS') ?? 3600),
          keyPrefix: find('CACHE_KEY_PREFIX'),
        },
        swagger: {
          enabled: find('ENABLE_SWAGGER_UI') === 'true',
          user: find('API_DOCS_USER'),
          password: find('API_DOCS_PASS'),
        },
      }),
    });
  }

  static buildWorkerConfigService(
    envFilePath?: string,
  ): ConfigService<WorkerAppConfig> {
    return new ConfigService({
      envFilePath: envFilePath || path.join(process.cwd(), '.env'),
      validationSchema: WorkerAppConfig,
      name: 'worker',
      configBuilder: (find): DeepPartial<WorkerAppConfig> => ({
        database: {
          host: find('DATABASE_HOST'),
          port: Number(find('DATABASE_PORT') ?? 5432),
          username: find('DATABASE_USERNAME'),
          password: find('DATABASE_PASSWORD'),
          database: find('DATABASE_NAME'),
          enableQueryLogging: find('LOG_GENERATED_QUERIES') === 'true',
        },
        app: {
          port: Number(find('PORT') ?? 3000),
          logLevel: find('LOG_LEVEL') as LogLevel,
        },
        baseCache: {
          defaultTTL: Number(find('CACHE_DEFAULT_TTL_IN_SECONDS') ?? 3600),
          keyPrefix: find('CACHE_KEY_PREFIX'),
        },
      }),
    });
  }

  static buildInfrastructureConfigService(
    envFilePath?: string,
  ): ConfigService<InfrastructureConfig> {
    return new ConfigService({
      envFilePath: envFilePath || path.join(process.cwd(), '.env'),
      validationSchema: InfrastructureConfig,
      name: 'infrastructure',
      configBuilder: (find): DeepPartial<InfrastructureConfig> => ({
        app: {
          logLevel: find('LOG_LEVEL') as LogLevel,
        },
        database: {
          host: find('DATABASE_HOST'),
          port: Number(find('DATABASE_PORT') ?? 5432),
          username: find('DATABASE_USERNAME'),
          password: find('DATABASE_PASSWORD'),
          database: find('DATABASE_NAME'),
        },
      }),
    });
  }

  static buildCustomConfigService<T>(
    options: ConfigServiceOptions<T>,
  ): ConfigService<T> {
    return new ConfigService(options);
  }
}
