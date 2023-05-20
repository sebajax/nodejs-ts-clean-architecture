import {StatusCodes, ReasonPhrases} from 'http-status-codes';
import {logMessage, logger} from '../../infraestructure/log/logger';
import {NextFunction, Request, Response} from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
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
    .send({error: true, message: ReasonPhrases.BAD_REQUEST});
};
