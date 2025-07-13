import { Logger } from './logger.interface';

export class LoggerRegistry {
  private static _baseLogger: Logger;

  static injectImplementation(logger: Logger) {
    this._baseLogger = logger;
    return this;
  }

  static createLogger(context: string): Logger {
    // Create a new logger instance by cloning the base logger
    const newLogger = Object.create(this._baseLogger) as Logger;
    // Set the context for this specific instance
    newLogger.setContext(context);
    return newLogger;
  }
}
