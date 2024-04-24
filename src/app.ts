import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import routes from './api/route/route';
import { VERSION_NUMBER } from './infraestructure/config/environment.config';
import { MigrationError, migrator } from './infraestructure/database/migrator';
import { logger } from './infraestructure/log/logger';

const app: Application = express();
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

(async () => {
  try {
    await migrator.up();
    app.listen(process.env.PORT, () => {
      logger.info(`API ${VERSION_NUMBER} running on PORT: ${process.env.PORT}`);
    });
  } catch (error) {
    if (error instanceof MigrationError) {
      // Ensure proper import and use of MigrationError
      logger.error('Migration error:', (error as MigrationError).message);
      logger.error('Migration error cause:', (error as MigrationError).cause);
    }

    logger.error(`server error: ${error}`);
  }
})();

export default app;
