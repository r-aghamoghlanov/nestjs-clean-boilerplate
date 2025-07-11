import {
  IConfig,
  IConfigService,
  IDatabaseConfig,
  IAWSConfig,
  IAppConfig,
  ISwaggerConfig,
} from '@shared/config.interface';
import { ConfigSchema } from './config.validator';
import { DeepPartial } from '@shared/custom.type';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

type Env = { [k: string]: string | undefined };
class ConfigService implements IConfigService {
  private readonly _name = 'ConfigService';
  private readonly _config: IConfig;

  constructor(private env: Env) {
    this._config = this.validateConfig(this.buildRawConfig());
    console.debug(`[${this._name}] Config loaded and validated`, this._config);
  }

  get dbConfig(): IDatabaseConfig {
    return this._config.database;
  }

  get awsConfig(): IAWSConfig {
    return this._config.AWS;
  }

  get appConfig(): IAppConfig {
    return this._config.app;
  }

  public getCustomKey(key: string): string | undefined {
    return this.env[key];
  }

  get swaggerConfig(): ISwaggerConfig {
    return this._config.swagger;
  }

  private buildRawConfig(): DeepPartial<IConfig> {
    return {
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
      AWS: {
        s3: {
          accessKeyId: this.getCustomKey('AWS_ACCESS_KEY_ID'),
          secretAccessKey: this.getCustomKey('AWS_SECRET_ACCESS_KEY'),
          region: this.getCustomKey('AWS_REGION'),
        },
      },
      app: {
        port: Number(this.getCustomKey('PORT') ?? 3000),
      },
      swagger: {
        enabled: this.getCustomKey('ENABLE_SWAGGER_UI') === 'true',
        user: this.getCustomKey('API_DOCS_USER'),
        password: this.getCustomKey('API_DOCS_PASS'),
      },
    };
  }

  private validateConfig(rawConfig: DeepPartial<IConfig>): IConfig {
    try {
      const validatedConfig = ConfigSchema.parse(rawConfig);
      return validatedConfig;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Configuration validation failed: ${error.message}`);
      }
      throw new Error('Configuration validation failed with unknown error');
    }
  }
}

export const configService = new ConfigService(process.env);
