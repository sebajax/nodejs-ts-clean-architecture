// module import
import { Application } from 'express';
// route import
import indexRoute from './index.route';
import messageRoute from './message.route';
import userRoute from './user.route';
// config import
import { API_VERSION } from '../../infraestructure/config/environment.config';

export default (app: Application) => {
  app.use(`/${API_VERSION}/`, indexRoute);
  app.use(`/${API_VERSION}/user`, userRoute);
  app.use(`/${API_VERSION}/message`, messageRoute);
};
