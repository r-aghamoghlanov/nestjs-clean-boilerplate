import { LogLevel } from '../logger/logger.interface';

export interface IDatabaseConfig {
  host: string;
  port: number;
  username: string;
  database: string;
  password?: string;
  synchronizeModels?: boolean;
  enableQueryLogging?: boolean;
}

export interface IAppConfig {
  port: number;
  logLevel: LogLevel;
  enableHttpLogging?: boolean;
}

export interface ISwaggerConfig {
  enabled: boolean;
  user?: string;
  password?: string;
}

export interface IConfig {
  database: IDatabaseConfig;
  app: IAppConfig;
  swagger: ISwaggerConfig;
}

export interface IConfigService {
  getCustomKey(key: string): string | undefined;
  get dbConfig(): IDatabaseConfig;
  get appConfig(): IAppConfig;
  get swaggerConfig(): ISwaggerConfig;
}
