// module import
import {Logger} from 'winston';
// domain import
import {ILogDomain} from '../domain/logger.domain';
// infraestructure import
import {logMessage, logger} from '../infraestructure/log/logger';

/*
 * services main class import all the services must extend this class
 */
abstract class Service {
  public logger: Logger;
  public logMessage: ILogDomain;

  public constructor() {
    this.logger = logger;
    this.logMessage = logMessage;
  }
}

export default Service;
