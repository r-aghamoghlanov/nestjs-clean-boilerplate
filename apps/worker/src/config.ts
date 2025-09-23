import { ConfigServiceFactory } from '@package/infrastructure/config/config.factory';

export const configService = ConfigServiceFactory.buildWorkerConfigService();

export const config = configService.getConfig();
