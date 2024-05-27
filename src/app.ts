import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { InversifyExpressServer } from 'inversify-express-utils';
import morgan from 'morgan';
import 'reflect-metadata';
import './adapters/controller/index.controller';
import { VERSION_NUMBER } from './infrastructure/config/environment.config';
import { container } from './infrastructure/di/inversify.config';
import { logger } from './infrastructure/logging/logger_old';

const server = new InversifyExpressServer(container);

server.setConfig(app => {
  app.use(helmet());
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(cors());
  // body-parser
  app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  // set this to true to get ip address when behind a proxy
  app.set('trust proxy', true);
});

const app = server.build();

(async () => {
  try {
    app.listen(process.env.PORT, () => {
      logger.info(`API ${VERSION_NUMBER} running on PORT: ${process.env.PORT}`);
    });
  } catch (error) {
    logger.error(`server error: ${error}`);
  }
})();

export default app;
