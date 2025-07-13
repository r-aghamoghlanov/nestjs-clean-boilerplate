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
  getCustomKey(key: string): string | undefined;
  get db(): DatabaseConfig;
  get app(): AppConfig;
  get swagger(): SwaggerConfig;
  get baseCache(): BaseCacheConfig;
}

type Env = { [k: string]: string | undefined };
class ConfigService implements IConfigService {
  private readonly _env: Env;
  private readonly _name = 'ConfigService';
  private readonly _config: Config;

  constructor(env?: Env) {
    this._env = env ?? process.env;
    this._config = this.validateConfig(this.buildRawConfig());
    console.debug(`[${this._name}] Config loaded and validated`, this._config);
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

  public getCustomKey(key: string): string | undefined {
    return this._env[key];
  }

  private buildRawConfig(): DeepPartial<Config> {
    const configObj: DeepPartial<Config> = {
      database: {
        host: this.getCustomKey('DATABASE_HOST'),
        port: Number(this.getCustomKey('DATABASE_PORT') ?? 5432),
        username: this.getCustomKey('DATABASE_USERNAME'),
        password: this.getCustomKey('DATABASE_PASSWORD'),
        database: this.getCustomKey('DATABASE_NAME'),
        synchronizeModels: this.getCustomKey('SYNC_MODELS') === 'true',
        enableQueryLogging:
          this.getCustomKey('LOG_GENERATED_QUERIES') === 'true',
      },
      app: {
        port: Number(this.getCustomKey('PORT') ?? 3000),
        logLevel: this.getCustomKey('LOG_LEVEL') as LogLevel,
        enableHttpLogging: this.getCustomKey('ENABLE_HTTP_LOGGING') === 'true',
      },
      baseCache: {
        defaultTtl: Number(this.getCustomKey('CACHE_DEFAULT_TTL') ?? 3600),
        keyPrefix: this.getCustomKey('CACHE_KEY_PREFIX'),
      },
      swagger: {
        enabled: this.getCustomKey('ENABLE_SWAGGER_UI') === 'true',
        user: this.getCustomKey('API_DOCS_USER'),
        password: this.getCustomKey('API_DOCS_PASS'),
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
