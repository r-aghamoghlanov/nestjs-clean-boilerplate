import { ConfigServiceFactory } from './config/config.factory';

export const configService =
  ConfigServiceFactory.buildInfrastructureConfigService();

export const config = configService.getConfig();
