import { Logger } from './logger.interface';

export class LoggerRegistry {
  private static _logger: Logger;

  static initialize(logger: Logger) {
    this._logger = logger;

    return this;
  }

  static createLogger(context: string): Logger {
    this._logger.setContext(context);
    return this._logger;
  }
}
