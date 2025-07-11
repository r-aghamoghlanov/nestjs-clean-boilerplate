import { DataSource, DataSourceOptions } from 'typeorm';
import { configService } from '@config/config.service';

export const getDataSourceOptions = (): DataSourceOptions => {
  const dbConfig = configService.dbConfig;

  return {
    type: 'postgres',
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    migrationsRun: false,

    // Entities registration
    entities: [__dirname + '/models/*.model.{ts,js}'],

    // Auto-sync in development (disable in production!)
    synchronize: dbConfig.synchronizeModels,

    // Logging
    logging: dbConfig.enableQueryLogging,
    logger: dbConfig.enableQueryLogging ? 'advanced-console' : undefined,

    // Connection pool settings
    extra: {
      max: 10,
      min: 2,
    },

    migrationsTableName: 'migrations',
    migrations: [__dirname + '/migrations/*.{ts,js}'],
  };
};

export default new DataSource(getDataSourceOptions());
