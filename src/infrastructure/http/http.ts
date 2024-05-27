// module import
import { AxiosError, isAxiosError, type AxiosInstance } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { Logger } from 'winston';
// domain import
import { ILogDomain } from '../../domains/logger.domain';
import { IResponseDomain, ResponseDomain } from '../../domains/response.domain';
// infrastructure import
import { logMessage, logger } from '../logging/logger_old';

/*
 * Http main class for fetching data from external services
 */
export class Http {
  public client: AxiosInstance;
  public logger: Logger;
  public logMessage: ILogDomain;

  public constructor(client: AxiosInstance) {
    this.client = client;
    this.logger = logger;
    this.logMessage = logMessage;
  }

  private _isHttpError(error: unknown): error is AxiosError {
    return isAxiosError(error);
  }

  public handleHttpError(error: unknown): ResponseDomain {
    // generate internal error only if necessary
    const errorResponse = new ResponseDomain({
      error: true,
      message: 'INTERNAL_SERVER_ERROR',
      code: StatusCodes.INTERNAL_SERVER_ERROR,
    });

    if (this._isHttpError(error)) {
      // Axios specific error handling
      this.logger.error(`Http error: ${error.message}`);
      if (error.response) {
        this.logger.error(`Response data: ${error.response.data}`);
        this.logger.error(`Response status: ${error.response.status}`);
        // no internal server error only api controlled error
        return new ResponseDomain(error.response.data as IResponseDomain);
      }
      return errorResponse;
    } else {
      // General error handling
      this.logger.error(`Unexpected error: ${error}`);
      return errorResponse;
    }
  }
}
