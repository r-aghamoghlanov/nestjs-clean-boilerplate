import { DataSource } from 'typeorm';
import { getDataSourceOptions } from './datasource-options';

const createDataSourceForMigration = () => {
  const datasource = new DataSource(getDataSourceOptions());
  return datasource;
};

export default createDataSourceForMigration();
