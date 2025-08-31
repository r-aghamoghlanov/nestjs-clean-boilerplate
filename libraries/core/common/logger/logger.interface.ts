export type LogLevel = 'info' | 'error' | 'fatal' | 'warn' | 'debug' | 'trace';

export abstract class Logger {
  protected contextName = 'context';
  protected context: string;

  abstract info(msg: string, ...args: any[]): void;

  abstract error(msg: string, ...args: any[]): void;

  abstract fatal(msg: string, ...args: any[]): void;

  abstract warn(msg: string, ...args: any[]): void;

  abstract debug(msg: string, ...args: any[]): void;

  abstract trace(msg: string, ...args: any[]): void;

  public renameContext(name: string): void {
    this.contextName = name;
  }

  public setContext(context: string): void {
    this.context = context;
  }
}
