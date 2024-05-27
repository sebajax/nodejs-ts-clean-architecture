// module import
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { ILogger, LOGGER_TYPE } from '../logging/logger.interface';

@injectable()
export class LoggingMiddleware {
  constructor(@inject(LOGGER_TYPE.Logger) private _logger: ILogger) {}

  // This middleware will each incoming request executed
  public logRequest(req: Request, _res: Response, next: NextFunction): void {
    this._logger.info('Incoming request', {
      method: req.method,
      url: req.url,
      body: req.body,
      params: req.params,
      query: req.query,
    });
    next();
  }

  // This middleware will send and error if execution was not successful
  public logError(
    err: unknown,
    req: Request,
    res: Response,
    _next: NextFunction
  ): void {
    this._logger.error('Error processing request', {
      method: req.method,
      url: req.url,
      body: req.body,
      params: req.params,
      query: req.query,
      error: err,
    });
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('INTERNAL_SERVER_ERROR');
  }
}
