import { Logger } from './logger.interface';

export class LoggerRegistry {
  private static instance: Logger;

  static initialize(logger: Logger): void {
    this.instance = logger;
  }

  static createLogger(context: string): Logger {
    this.instance.setContext(context);
    return this.instance;
  }
}
