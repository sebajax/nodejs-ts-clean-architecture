// domain import
import {Request, Response, RequestHandler} from 'express';
import {Logger} from 'winston';
import {ObjectSchema} from 'joi';
import {StatusCodes} from 'http-status-codes';
import {ILogDomain} from '../domain/logger.domain';
import {IResponseDomain} from '../domain/response.domain';

export default function makeAddMessageController(
  logger: Logger,
  logMessage: ILogDomain,
  addMessageSchema: ObjectSchema,
  addMessageService: Function
): RequestHandler {
  return async function addMessageController(
    req: Request,
    res: Response
  ): Promise<Response> {
    // get controller name for logging
    const controller = addMessageController.name;
    const method = 'post';
    // destructuring req info
    const {body} = req;
    // log end point execution
    logger.info(logMessage.init(req.url, method, req.method, controller, body));

    try {
      // validate request with schema
      const {error: errorRequest} = addMessageSchema.validate(body);
      if (errorRequest !== undefined) {
        logger.warn(
          logMessage.error(
            req.method,
            controller,
            StatusCodes.BAD_REQUEST,
            errorRequest.details[0].message
          )
        );
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send({error: true, message: errorRequest.details[0].message});
      }

      // call service
      const {error, message, code, data}: IResponseDomain =
        await addMessageService(body);

      return res.status(code).send({error, message, data});
    } catch (error) {
      logger.error(
        `requestMethod: ${req.method}, controller: ${controller}, SERVER_ERROR ${error}`
      );
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({error: true, message: 'SERVER_ERROR'});
    }
  };
}
