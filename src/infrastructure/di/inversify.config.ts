import { Container } from 'inversify';
import { loggerBinding } from './logger.binding';
import { repositoryBinding } from './repository.binding';
import { typeOrmBinding } from './typeorm.binding';
import { useCasesBinding } from './useCases.binding';

const container = new Container();

// Load all the bindings available **MUST BE IN ORDER**
container.load(loggerBinding);
container.load(typeOrmBinding);
container.load(repositoryBinding);
container.load(useCasesBinding);

export { container };
