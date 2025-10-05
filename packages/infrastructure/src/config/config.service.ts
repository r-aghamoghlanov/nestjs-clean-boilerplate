import path from 'node:path';
import fs from 'node:fs';
import { z } from 'zod';
import { config as dotenvConfig } from 'dotenv';
import { DeepPartial } from '@backend/core/common/custom.type';
import { ConfigServiceOptions, Env, IConfigService } from './config.types';

export class ConfigService<T> implements IConfigService<T> {
  private readonly _env: Env = process.env;
  private readonly _config: T;
  private readonly _name?: string;
  private readonly _configBuilder: (
    findFn: (key: string) => string | undefined,
  ) => DeepPartial<T>;

  constructor(options: ConfigServiceOptions<T>) {
    this._name = options.name;
    this._configBuilder = options.configBuilder;

    // Load environment variables
    this._env = this.loadEnvironment(options.envFilePath);

    // Build and validate config
    this._config = this.validateConfig(
      this.buildRawConfig(),
      options.validationSchema,
    );

    console.debug(
      `[${ConfigService.name}] Config loaded and validated for ${this._name || 'unknown'}`,
      this._config,
    );
  }

  public find(key: string): string | undefined {
    return this._env[key];
  }

  public get<K extends keyof T>(key: K): T[K] {
    return this._config[key];
  }

  public getConfig(): T {
    return this._config;
  }

  private loadEnvironment(envFilePath: string): Env {
    if (envFilePath) {
      const resolvedPath = path.resolve(envFilePath);
      if (fs.existsSync(resolvedPath)) {
        console.debug(
          `[${ConfigService.name}] Loading .env from: ${resolvedPath}`,
        );
        dotenvConfig({ path: resolvedPath });
        // Merge the loaded env vars
        Object.assign(this._env, process.env);
      } else {
        console.warn(
          `[${ConfigService.name}] .env file not found at: ${resolvedPath}`,
        );
      }
    }

    return this._env;
  }

  private buildRawConfig(): DeepPartial<T> {
    return this._configBuilder(this.find.bind(this));
  }

  private validateConfig(
    rawConfig: DeepPartial<T>,
    validationSchema: z.ZodSchema<T>,
  ): T {
    try {
      const validatedConfig = validationSchema.parse(rawConfig);
      return validatedConfig;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors
          .map((err) => `${err.path.join('.')}: ${err.message}`)
          .join(', ');
        throw new Error(`Configuration validation failed: ${errorMessage}`);
      }
      if (error instanceof Error) {
        throw new Error(`Configuration validation failed: ${error.message}`);
      }
      throw new Error('Configuration validation failed with unknown error');
    }
  }
}
