import {Application} from 'express';
import indexRoute from './index.route';

export default (app: Application) => {
  app.use('/v1/', indexRoute);
};
