import express, {Application} from 'express';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import routes from './api/route/route';
import {logger} from './infraestructure/log/logger';
import migrator from './infraestructure/database/migrator';
import {VERSION_NUMBER} from './infraestructure/config/environment.config';

const app: Application = express();
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// body-parser
app.use(bodyParser.json({limit: '50mb', type: 'application/json'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

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
    logger.error(`server error: ${error}`);
  }
})();

export default app;
