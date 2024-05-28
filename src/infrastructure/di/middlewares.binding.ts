// Module import
import { ContainerModule } from 'inversify';
// Middleware import
import { ErrorMiddleware } from '../middleware/error.middleware';
import { LoggingMiddleware } from '../middleware/logging.middleware';

// Bind Middlewares
const middlewareBinding = new ContainerModule(bind => {
  bind<LoggingMiddleware>(LoggingMiddleware).toSelf().inSingletonScope();
  bind<ErrorMiddleware>(ErrorMiddleware).toSelf().inSingletonScope();
});

export { middlewareBinding };
