import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { IConfig, IConfigService } from '../../shared/config.interface';
import { ConfigSchema } from './config.validators';

@Injectable()
export class ConfigService implements IConfigService {
  private _config: IConfig;
  constructor(private readonly configService: NestConfigService) {
    const rawConfig = this.buildRawConfig();
    this._config = this.validateConfig(rawConfig);
    console.log('Config loaded and validated', this._config);
  }

  get config(): IConfig {
    return this._config;
  }

  private buildRawConfig() {
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
      appPort: Number(this.getCustomKey('PORT') ?? 3000),
    };
  }

  private validateConfig(rawConfig: Record<string, unknown>): IConfig {
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

  private getCustomKey(key: string): string | undefined {
    return this.configService.get<string>(key);
  }
}
