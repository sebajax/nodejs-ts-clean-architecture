// Module import
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
// Domain import
import { ResponseErrorDomain } from '../../domains/error.domain';
// Interface import
import { ILogger, LOGGER_TYPE } from '../logging/logger.interface';

@injectable()
class LoggingMiddleware {
  constructor(@inject(LOGGER_TYPE.Logger) private readonly _logger: ILogger) {}

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
    err: ResponseErrorDomain,
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
    });

    // Handle specific errors
    if (err instanceof ResponseErrorDomain) {
      const { error, message, code } = err;
      this._logger.error('ResponseErrorDomain', { error, message, code });
      res.status(err.code).json({ error, message, code });
    }
    // Handle other types of errors
    this._logger.error('Internal Server Error', err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: true,
      message: 'INTERNAL_SERVER_ERROR',
      code: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
}

export { LoggingMiddleware };