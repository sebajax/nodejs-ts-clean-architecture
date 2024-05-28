// Module import
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
// Interface import
import { ILogger, LOGGER_TYPE } from '../logging/logger.interface';

@injectable()
class LoggingMiddleware {
  constructor(@inject(LOGGER_TYPE.Logger) private readonly _logger: ILogger) {}

  // This middleware will each incoming request executed
  public logRequest() {
    return (req: Request, _res: Response, next: NextFunction): void => {
      this._logger.info('Incoming request', {
        method: req.method,
        url: req.url,
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    };
  }
}

export { LoggingMiddleware };
