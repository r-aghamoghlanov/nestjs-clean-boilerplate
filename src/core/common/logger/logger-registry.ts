import { Logger } from './logger.interface';

/**
 * This is like a local-global class, the actual implementation is injected from infra layer.
 * By following this pattern, we can reuse this class and create new instances of loggers in any part
 * of domain & application layer without
 * - having to worry about the implementation details
 * - explicit injection in constructor
 *
 * @example
 * ```ts
 * import { LoggerRegistry } from '@common/logger/logger-registry';
 *
 * export class ExampleService {
 *  private readonly logger = LoggerRegistry.createLogger(ExampleService.name);
 *  constructor() {}
 *
 *   @Injectable()
 *   doSomething() {
 *     this.logger.info('Doing something');
 *   }
 * }
 * ```
 */
export class LoggerRegistry {
  private static _baseLogger: Logger;

  static injectImplementation(logger: Logger) {
    this._baseLogger = logger;
    return this;
  }

  static createLogger(context: string): Logger {
    // Create a new logger instance by cloning the base logger
    const newLogger = Object.create(this._baseLogger) as Logger;
    newLogger.setContext(context);

    return newLogger;
  }
}
