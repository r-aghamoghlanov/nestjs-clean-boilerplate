/* eslint-disable @typescript-eslint/no-unsafe-argument */
/**
 * Inspired by nestjs-pino logger
 * @see https://github.com/iamolegga/nestjs-pino/
 */
import { Logger, LogLevel } from '@api/core/common/logger/logger.interface';
import pino from 'pino';

const transports: pino.TransportMultiOptions = {
  targets: [
    {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
  ],
};

export class PinoLogger extends Logger {
  private readonly logger: pino.Logger;

  constructor(private readonly logLevel: LogLevel) {
    super();
    this.logger = pino({
      transport: transports,
      level: this.logLevel,
      serializers: {
        error: pino.stdSerializers.err,
        err: pino.stdSerializers.err,
      },
    });
  }

  getPinoInstance(): pino.Logger {
    return this.logger;
  }

  info(msg: string, ...args: any[]): void {
    this.call('info', msg, ...args);
  }

  error(msg: string, ...args: any[]): void {
    this.call('error', msg, ...args);
  }

  fatal(msg: string, ...args: any[]): void {
    this.call('fatal', msg, ...args);
  }

  warn(msg: string, ...args: any[]): void {
    this.call('warn', msg, ...args);
  }

  debug(msg: string, ...args: any[]): void {
    this.call('debug', msg, ...args);
  }

  trace(msg: string, ...args: any[]): void {
    this.call('trace', msg, ...args);
  }

  private call(level: LogLevel, message: string, ...optionalParams: any[]) {
    type LogObject = Record<string, unknown>;

    const mergedParams = optionalParams.reduce<LogObject>((acc, param) => {
      if (param && typeof param === 'object') {
        return { ...acc, ...(param as LogObject) };
      }
      return acc;
    }, {});

    const logObject: LogObject = {
      msg: this.context ? `[${this.context}] ${message}` : message,
      ...mergedParams,
    };

    this.logger[level](logObject);
  }
}
