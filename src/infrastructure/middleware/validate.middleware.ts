// module import
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ObjectSchema } from 'joi';
// infrastructure import
import { logger, logMessage } from '../logging/logger_old';

// this middleware function will validate the request body using a joi schema
export const validate = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      logger.warn(
        logMessage.error(
          req.method,
          'middleware',
          StatusCodes.BAD_REQUEST,
          error.details[0].message
        )
      );
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: true, message: error.details[0].message });
    }
    return next();
  };
};
