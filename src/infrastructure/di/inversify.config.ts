// Module import
import { Container } from 'inversify';
// Binding import
import { loggerBinding } from './logger.binding';
import { middlewareBinding } from './middlewares.binding';
import { repositoryBinding } from './repository.binding';
import { useCasesBinding } from './useCases.binding';

const container = new Container();

// Load all the bindings available **MUST BE IN ORDER**
container.load(loggerBinding);
container.load(middlewareBinding);
container.load(repositoryBinding);
container.load(useCasesBinding);

export { container };
