// module import
import { Logger } from 'winston';
// domain import
import { ILogDomain } from '../domain/logger.domain';
// infrastructure import
import { logMessage, logger } from '../infrastructure/log/logger';

/*
 * services main class import all the services must extend this class
 */
export abstract class Service {
  public logger: Logger;
  public logMessage: ILogDomain;

  public constructor() {
    this.logger = logger;
    this.logMessage = logMessage;
  }
}
