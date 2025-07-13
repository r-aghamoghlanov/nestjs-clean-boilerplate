import { DataSource } from 'typeorm';
import { getDataSourceOptions } from './datasource-options';
import { ConfigRegistry } from '@common/config/config-registry';
import { ConfigService } from '@config/config.service';

/** We have to initialize the config here due to the way how typeorm CLI works
 * This file should not me imported by any other file, it's only for config initialization for migrations running
 */
const createDataSourceForMigration = () => {
  ConfigRegistry.initialize(new ConfigService());
  const datasource = new DataSource(getDataSourceOptions());
  return datasource;
};

export default createDataSourceForMigration();
