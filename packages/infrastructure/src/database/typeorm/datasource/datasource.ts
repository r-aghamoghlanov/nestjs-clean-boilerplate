import { DataSource } from 'typeorm';
import { getDataSourceOptions } from './datasource-options';

const createDataSourceForMigration = () => {
  const datasource = new DataSource({
    ...getDataSourceOptions(),
    migrations: [__dirname + '/../migrations/*.{ts,js}'],
    entities: [__dirname + '/../models/*.model.{ts,js}'],
  });
  return datasource;
};

export default createDataSourceForMigration();
