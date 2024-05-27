// Logger DI identifiers
export const LOGGER_TYPE = {
  Logger: Symbol.for('Logger'),
};

// Logger interface
export interface ILogger {
  log(level: string, message: string, meta?: unknown): void;
  info(message: string, meta?: unknown): void;
  warn(message: string, meta?: unknown): void;
  error(message: string, meta?: unknown): void;
}
