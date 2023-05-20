import {logMessage, logger} from '../infraestructure/log/logger';
import {Logger} from 'winston';
import {ILogDomain} from '../domain/logger.domain';

abstract class Controller {
  public logger: Logger;
  public logMessage: ILogDomain;

  public constructor() {
    this.logger = logger;
    this.logMessage = logMessage;
  }
}

export default Controller;
