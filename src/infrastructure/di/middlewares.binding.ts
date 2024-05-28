// Module import
import { ContainerModule } from 'inversify';
// middleware import
import { LoggingMiddleware } from '../middleware/logging.middleware';
import { ValidationMiddleware } from '../middleware/validate.middleware';

// Bind Middlewares
const middlewareBinding = new ContainerModule(bind => {
  bind<LoggingMiddleware>(LoggingMiddleware).toSelf().inSingletonScope();
  bind<ValidationMiddleware>(ValidationMiddleware).toSelf().inSingletonScope();
});

export { middlewareBinding };