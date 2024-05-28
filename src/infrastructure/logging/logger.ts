// Module import
import { injectable } from 'inversify';
import winston from 'winston';
// Config import
import {
  API_NAME,
  LOG_LEVEL,
  VERSION_NUMBER,
} from '../config/environment.config';
// Interface import
import { ILogger } from './logger.interface';

@injectable()
class Logger implements ILogger {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: LOG_LEVEL,
      defaultMeta: { service: `[${API_NAME}]`, version: `${VERSION_NUMBER}` },
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.json(),
        winston.format.colorize({ all: true })
      ),
      transports: [
        new winston.transports.Console({
          handleExceptions: true,
        }),
      ],
    });
  }

  log(level: string, message: string, meta?: unknown): void {
    this.logger.log(level, message, meta);
  }

  info(message: string, meta?: unknown): void {
    this.logger.info(message, meta);
  }

  warn(message: string, meta?: unknown): void {
    this.logger.warn(message, meta);
  }

  error(message: string, meta?: unknown): void {
    this.logger.error(message, meta);
  }
}

export { Logger };
