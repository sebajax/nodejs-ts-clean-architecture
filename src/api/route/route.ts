import {Application} from 'express';
import indexRoute from './index.route';
import messageRoute from './message.route';

export default (app: Application) => {
  app.use('/v1/', indexRoute);
  app.use('/v1/message', messageRoute);
};
