import { DataSource } from 'typeorm';
import { getDataSourceOptions } from './datasource-options';
import { config } from '../../../config';

const createDataSourceForMigration = () => {
  const datasource = new DataSource({
    ...getDataSourceOptions(config.database),
    migrations: [__dirname + '/../migrations/*.{ts,js}'],
    entities: [__dirname + '/../models/*.model.{ts,js}'],
  });
  return datasource;
};

export default createDataSourceForMigration();
