import { ConfigServiceFactory } from '@package/infrastructure/config/config.factory';

export const configService = ConfigServiceFactory.buildApiConfigService();

export const config = configService.getConfig();
