// Module import
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { ObjectSchema } from 'joi';
// Interface import
import { ILogger, LOGGER_TYPE } from '../logging/logger.interface';

@injectable()
class ValidationMiddleware {
  constructor(@inject(LOGGER_TYPE.Logger) private _logger: ILogger) {}

  // This middleware function will validate the request body using a joi schema
  public validate(schema: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      const { error } = schema.validate(req.body);
      if (error) {
        this._logger.error('Validation error', {
          method: req.method,
          url: req.url,
          body: req.body,
          params: req.params,
          query: req.query,
          validationError: error.details[0].message,
        });

        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: true, message: error.details[0].message });
      }
      return next();
    };
  }
}

export { ValidationMiddleware };
