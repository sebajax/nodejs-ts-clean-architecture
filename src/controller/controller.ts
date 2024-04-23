// module import
import { Logger } from 'winston';
// domain import
import { ILogDomain } from '../domain/logger.domain';
// infraestructure import
import { StatusCodes } from 'http-status-codes';
import { ObjectSchema } from 'joi';
import { logMessage, logger } from '../infraestructure/log/logger';

/*
 * controller main class import all the controllers must extend this class
 */
abstract class Controller {
  public logger: Logger;
  public logMessage: ILogDomain;
  public schema?: ObjectSchema;

  public constructor(schema?: ObjectSchema) {
    this.logger = logger;
    this.logMessage = logMessage;
    this.schema = schema;
  }

  public schemaValidation(
    body: object,
    controller: string,
    method: string
  ): string | null {
    if (this.schema !== undefined) {
      const { error } = this.schema.validate(body);
      if (error !== undefined) {
        this.logger.warn(
          this.logMessage.error(
            method,
            controller,
            StatusCodes.BAD_REQUEST,
            error.details[0].message
          )
        );
        return error.details[0].message;
      }
    }
    return null;
  }
}

export default Controller;
