export interface IDatabaseConfig {
  host: string;
  port: number;
  username: string;
  database: string;
  password?: string;
}

export interface IS3Config {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
}

export interface IConfig {
  database: IDatabaseConfig;
  AWS: {
    s3: IS3Config;
  };
  appPort: number;
}

export interface IConfigService {
  get config(): IConfig;
}
