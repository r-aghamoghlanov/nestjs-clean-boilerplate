import { IConfigService } from './config.interface';

export class ConfigRegistry {
  private static _config: IConfigService;

  static initialize(config: IConfigService) {
    this._config = config;

    return this._config;
  }

  static get config(): IConfigService {
    return this._config;
  }
}
