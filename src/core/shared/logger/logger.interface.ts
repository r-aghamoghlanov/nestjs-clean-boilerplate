export type LogLevel = 'info' | 'error' | 'fatal' | 'warn' | 'debug' | 'trace';

export abstract class Logger {
  protected context: string;

  abstract info(msg: any, ...args: any[]): void;

  abstract error(msg: any, ...args: any[]): void;

  abstract fatal(msg: any, ...args: any[]): void;

  abstract warn(msg: any, ...args: any[]): void;

  abstract debug(msg: any, ...args: any[]): void;

  abstract trace(msg: any, ...args: any[]): void;

  public setContext(context: string): void {
    this.context = context;
  }
}
