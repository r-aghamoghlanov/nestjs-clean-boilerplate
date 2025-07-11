export interface IDatabaseConfig {
  host: string;
  port: number;
  username: string;
  database: string;
  password?: string;
  synchronizeModels?: boolean;
  enableQueryLogging?: boolean;
}

export interface IS3Config {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
}

export interface IAWSConfig {
  s3: IS3Config;
}

export interface IAppConfig {
  port: number;
}

export interface ISwaggerConfig {
  enabled: boolean;
  user?: string;
  password?: string;
}

export interface IConfig {
  database: IDatabaseConfig;
  AWS: IAWSConfig;
  app: IAppConfig;
  swagger: ISwaggerConfig;
}

export interface IConfigService {
  getCustomKey(key: string): string | undefined;
  get dbConfig(): IDatabaseConfig;
  get awsConfig(): IAWSConfig;
  get appConfig(): IAppConfig;
}
