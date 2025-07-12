/**
 * Most part of the code is taken from the nestjs-pino logger implementation
 * @see https://github.com/iamolegga/nestjs-pino/
 */
import { Logger, LogLevel } from '@shared/logger/logger.interface';
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
    });
  }

  getPinoInstance(): pino.Logger {
    return this.logger;
  }

  info(msg: any, ...args: any[]): void {
    this.call('info', msg, ...args);
  }

  error(msg: any, ...args: any[]): void {
    this.call('error', msg, ...args);
  }

  fatal(msg: any, ...args: any[]): void {
    this.call('fatal', msg, ...args);
  }

  warn(msg: any, ...args: any[]): void {
    this.call('warn', msg, ...args);
  }

  debug(msg: any, ...args: any[]): void {
    this.call('debug', msg, ...args);
  }

  trace(msg: any, ...args: any[]): void {
    this.call('trace', msg, ...args);
  }

  private call(level: LogLevel, message: any, ...optionalParams: any[]) {
    const objArg: Record<string, any> = {};

    // optionalParams contains extra params passed to logger
    // context name is the last item
    let params: any[] = [];
    if (optionalParams.length !== 0) {
      objArg[this.context] = optionalParams[optionalParams.length - 1];
      params = optionalParams.slice(0, -1);
    }

    if (typeof message === 'object') {
      if (message instanceof Error) {
        objArg.err = message;
      } else {
        Object.assign(objArg, message);
      }
      this.logger[level](objArg, ...params);
    } else if (this.isWrongExceptionsHandlerContract(level, message, params)) {
      objArg.err = new Error(message);
      objArg.err.stack = params[0];
      this.logger[level](objArg);
    } else {
      this.logger[level](objArg, message, ...params);
    }
  }

  /**
   * Unfortunately built-in (not only) `^.*Exception(s?)Handler$` classes call `.error`
   * method with not supported contract:
   *
   * - ExceptionsHandler
   * @see https://github.com/nestjs/nest/blob/35baf7a077bb972469097c5fea2f184b7babadfc/packages/core/exceptions/base-exception-filter.ts#L60-L63
   *
   * - ExceptionHandler
   * @see https://github.com/nestjs/nest/blob/99ee3fd99341bcddfa408d1604050a9571b19bc9/packages/core/errors/exception-handler.ts#L9
   *
   * - WsExceptionsHandler
   * @see https://github.com/nestjs/nest/blob/9d0551ff25c5085703bcebfa7ff3b6952869e794/packages/websockets/exceptions/base-ws-exception-filter.ts#L47-L50
   *
   * - RpcExceptionsHandler @see https://github.com/nestjs/nest/blob/9d0551ff25c5085703bcebfa7ff3b6952869e794/packages/microservices/exceptions/base-rpc-exception-filter.ts#L26-L30
   *
   * - all of them
   * @see https://github.com/search?l=TypeScript&q=org%3Anestjs+logger+error+stack&type=Code
   */
  private isWrongExceptionsHandlerContract(
    level: LogLevel,
    message: any,
    params: any[],
  ): params is [string] {
    return (
      level === 'error' &&
      typeof message === 'string' &&
      params.length === 1 &&
      typeof params[0] === 'string' &&
      /\n\s*at /.test(params[0])
    );
  }
}
