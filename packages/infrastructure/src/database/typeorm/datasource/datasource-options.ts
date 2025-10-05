import { DataSourceOptions } from 'typeorm';
import { DatabaseConfig } from '../../../config/config.validator';

export const getDataSourceOptions = (
  dbConfig: DatabaseConfig,
): DataSourceOptions => {
  return {
    type: 'postgres',
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    migrationsRun: false,

    // Entities registration
    // entities: [__dirname + '/../models/*.model.{ts,js}'],

    // Never auto-sync models, use migrations instead
    synchronize: false,

    // Logging
    logging: dbConfig.enableQueryLogging,
    logger: dbConfig.enableQueryLogging ? 'advanced-console' : undefined,

    // Connection pool settings
    extra: {
      max: 10,
      min: 2,
    },

    migrationsTableName: 'migrations',
    // migrations: [__dirname + '/../migrations/*.{ts,js}'],
  };
};
