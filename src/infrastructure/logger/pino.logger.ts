import { ILogger } from '@shared/logger.interface';
import pino from 'pino';

export class PinoLogger implements ILogger {
  private readonly logger: pino.Logger;

  constructor() {
    this.logger = pino({ transport: { target: 'pino-pretty' } });
  }

  public log(message: string): void {
    this.logger.info(message);
  }

  public error(message: string): void {
    this.logger.error(message);
  }

  public fatal(message: string): void {
    this.logger.fatal(message);
  }

  public warn(message: string): void {
    this.logger.warn(message);
  }

  public debug(message: string): void {
    this.logger.debug(message);
  }

  public verbose(message: string): void {
    this.logger.trace(message);
  }
}
