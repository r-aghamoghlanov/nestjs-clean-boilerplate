import {
  AppConfig,
  BaseCacheConfig,
  Config,
  DatabaseConfig,
  SwaggerConfig,
} from './config.validator';
import { DeepPartial } from '@common/custom.type';
import { config as dotenvConfig } from 'dotenv';
import { LogLevel } from '@common/logger/logger.interface';

dotenvConfig({ path: '.env' });

export interface IConfigService {
  find(key: string): string | undefined;
  get db(): DatabaseConfig;
  get app(): AppConfig;
  get swagger(): SwaggerConfig;
  get baseCache(): BaseCacheConfig;
}

type Env = { [k: string]: string | undefined };
class ConfigService implements IConfigService {
  private readonly _env: Env;
  private readonly _config: Config;

  constructor(env?: Env) {
    this._env = env ?? process.env;
    this._config = this.validateConfig(this.buildRawConfig());
    console.debug(
      `[${ConfigService.name}] Config loaded and validated`,
      this._config,
    );
  }

  get db(): DatabaseConfig {
    return this._config.database;
  }

  get app(): AppConfig {
    return this._config.app;
  }

  get swagger(): SwaggerConfig {
    return this._config.swagger;
  }

  get baseCache(): BaseCacheConfig {
    return this._config.baseCache;
  }

  public find(key: string): string | undefined {
    return this._env[key];
  }

  private buildRawConfig(): DeepPartial<Config> {
    const configObj: DeepPartial<Config> = {
      database: {
        host: this.find('DATABASE_HOST'),
        port: Number(this.find('DATABASE_PORT') ?? 5432),
        username: this.find('DATABASE_USERNAME'),
        password: this.find('DATABASE_PASSWORD'),
        database: this.find('DATABASE_NAME'),
        synchronizeModels: this.find('SYNC_MODELS') === 'true',
        enableQueryLogging: this.find('LOG_GENERATED_QUERIES') === 'true',
      },
      app: {
        port: Number(this.find('PORT') ?? 3000),
        logLevel: this.find('LOG_LEVEL') as LogLevel,
        enableHttpLogging: this.find('ENABLE_HTTP_LOGGING') === 'true',
      },
      baseCache: {
        defaultTTL: Number(this.find('CACHE_DEFAULT_TTL_IN_SECONDS') ?? 3600),
        keyPrefix: this.find('CACHE_KEY_PREFIX'),
      },
      swagger: {
        enabled: this.find('ENABLE_SWAGGER_UI') === 'true',
        user: this.find('API_DOCS_USER'),
        password: this.find('API_DOCS_PASS'),
      },
    };

    return configObj;
  }

  private validateConfig(rawConfig: DeepPartial<Config>): Config {
    try {
      const validatedConfig = Config.parse(rawConfig);
      return validatedConfig;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Configuration validation failed: ${error.message}`);
      }
      throw new Error('Configuration validation failed with unknown error');
    }
  }
}

export default new ConfigService(process.env);
