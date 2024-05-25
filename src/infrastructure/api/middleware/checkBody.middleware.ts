import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { logger, logMessage } from '../../log/logger';

export const checkBodyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (Object.keys(req.body).length > 0) {
    return next();
  }
  logger.warn(
    logMessage.error(
      req.method,
      'middleware',
      StatusCodes.BAD_REQUEST,
      'check body middleware'
    )
  );
  return res
    .status(StatusCodes.BAD_REQUEST)
    .send({ error: true, message: ReasonPhrases.BAD_REQUEST });
};
