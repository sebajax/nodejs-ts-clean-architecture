import { ContainerModule } from 'inversify';
import { UserRepository } from '../../adapters/repository/user/user.repository';
import {
  IUserRepository,
  USER_REPOSITORY_TYPE,
} from '../../adapters/repository/user/user.repository.interface';

// Bind Repository
const repositoryBinding = new ContainerModule(bind => {
  bind<IUserRepository>(USER_REPOSITORY_TYPE.UserRepository).to(UserRepository);
});

export { repositoryBinding };
