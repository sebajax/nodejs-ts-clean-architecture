// Module import
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ObjectSchema } from 'joi';
// Domain import
import { ErrorNames, ResponseErrorDomain } from '../../domains/error.domain';

// This middleware function will validate the request body using a joi schema
function validate(schema: ObjectSchema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new ResponseErrorDomain({
        name: ErrorNames.BadRequestError,
        error: true,
        code: StatusCodes.BAD_REQUEST,
        message: error.details[0].message,
      });
    }
    return next();
  };
}

export { validate };
