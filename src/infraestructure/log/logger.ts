import winston from 'winston';
import {
  VERSION_NUMBER,
  API_NAME,
  LOG_LEVEL,
} from '../config/environment.config';

const {colorize, combine, timestamp, json} = winston.format;

/*
 * create a winston logger that streams to stackdriver logging
 * ogs will be written to: "projects/YOUR_PROJECT_ID/logs/winston_log"
 */
const logger: winston.Logger = winston.createLogger({
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

export default logger;
