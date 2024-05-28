// Module import
import { ContainerModule } from 'inversify';
// Middleware import
import { ErrorMiddleware } from '../middleware/error.middleware';
import { LoggingMiddleware } from '../middleware/logging.middleware';
import { ValidationMiddleware } from '../middleware/validate.middleware';

// Bind Middlewares
const middlewareBinding = new ContainerModule(bind => {
  bind<LoggingMiddleware>(LoggingMiddleware).toSelf().inSingletonScope();
  bind<ErrorMiddleware>(ErrorMiddleware).toSelf().inSingletonScope();
  bind<ValidationMiddleware>(ValidationMiddleware).toSelf().inSingletonScope();
});

export { middlewareBinding };
