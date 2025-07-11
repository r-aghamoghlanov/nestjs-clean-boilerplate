export interface ILogger {
  log(message: string): void;
  error(message: string): void;
  fatal(message: string): void;
  warn(message: string): void;
  debug(message: string): void;
  verbose(message: string): void;
}
