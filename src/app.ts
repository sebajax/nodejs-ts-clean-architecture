import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { InversifyExpressServer } from 'inversify-express-utils';
import morgan from 'morgan';
import path from 'path';
import 'reflect-metadata';
import { routes } from './infrastructure/api/route/route';
import { VERSION_NUMBER } from './infrastructure/config/environment.config';
import { container } from './infrastructure/di/inversify.config';
import { logger } from './infrastructure/log/logger';

const server = new InversifyExpressServer(container);

server.setConfig(app => {
  app.use(helmet());
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());
  app.use(express.static(path.join(__dirname, 'public')));
  // body-parser
  app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  // set this to true to get ip address when behind a proxy
  app.set('trust proxy', true);
  // load - app routes
  routes(app);
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
