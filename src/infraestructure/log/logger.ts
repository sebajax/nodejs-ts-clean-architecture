import winston, {Logger} from 'winston';
import {
  VERSION_NUMBER,
  API_NAME,
  LOG_LEVEL,
} from '../config/environment.config';
import {IMessageDomain, ILogDomain} from '../../domain/logger.domain';

const {colorize, combine, timestamp, json} = winston.format;

/*
 * create a winston logger that streams to stackdriver logging
 * ogs will be written to: "projects/YOUR_PROJECT_ID/logs/winston_log"
 */
const logger: Logger = winston.createLogger({
  level: LOG_LEVEL,
  defaultMeta: {service: `[${API_NAME}]`, version: `${VERSION_NUMBER}`},
  format: combine(
    timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
    json(),
    colorize({all: true})
  ),
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
    }),
  ],
});

const logMessage: ILogDomain = {
  init: (
    url: string,
    requestMethod: string,
    controller: string,
    method: string,
    body: object
  ) => {
    const message: IMessageDomain = {
      requestMethod,
      controller,
      method,
      body,
    };
    return `init method ${url} request ${JSON.stringify(message)}`;
  },
  error: (
    requestMethod: string,
    controller: string,
    statusCode: number,
    errorMessage: string
  ) => {
    const message: IMessageDomain = {
      requestMethod,
      controller,
      statusCode,
      errorMessage,
    };
    return `error ${JSON.stringify(message)}`;
  },
};

export default logger;
export {logger, logMessage};