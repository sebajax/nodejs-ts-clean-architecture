import { ContainerModule } from 'inversify';
import { Logger } from '../logging/logger';
import { ILogger, LOGGER_TYPE } from '../logging/logger.interface';

// Bind Logger
const loggerBinding = new ContainerModule(bind => {
  bind<ILogger>(LOGGER_TYPE.Logger).to(Logger);
});

export { loggerBinding };
