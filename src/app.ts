import 'reflect-metadata';
import './adapters/controller/index.controller';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { InversifyExpressServer } from 'inversify-express-utils';
import morgan from 'morgan';
import {
  API_VERSION,
  VERSION_NUMBER,
} from './infrastructure/config/environment.config';
import { container } from './infrastructure/di/inversify.config';
import { Logger } from './infrastructure/logging/logger';
import { LOGGER_TYPE } from './infrastructure/logging/logger.interface';
import { LoggingMiddleware } from './infrastructure/middleware/logging.middleware';

const server = new InversifyExpressServer(container);

const loggingMiddleware = container.get<LoggingMiddleware>(LoggingMiddleware);
const logger = container.get<Logger>(LOGGER_TYPE.Logger);

server.setConfig(app => {
  // Add logging in each request
  app.use(loggingMiddleware.logRequest.bind(loggingMiddleware));
  app.use(helmet());
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(cors());
  // Body parser
  app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  // Set this to true to get ip address when behind a proxy
  app.set('trust proxy', true);
});

server.setErrorConfig(app => {
  app.use(loggingMiddleware.logError.bind(loggingMiddleware));
});

const app = server.build();

// Prefix all routes with '/v1'
app.use(`/${API_VERSION}/`, app._router);

(async () => {
  try {
    app.listen(process.env.PORT, () => {
      logger.info(`API ${VERSION_NUMBER} running on PORT: ${process.env.PORT}`);
    });
  } catch (error) {
    logger.error('server error:', { error });
  }
})();

export default app;
