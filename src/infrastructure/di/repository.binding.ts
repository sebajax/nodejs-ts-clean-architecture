import { ContainerModule } from 'inversify';
import { Repository } from 'typeorm';
import { UserRepository } from '../../adapters/repositories/user/user.repository';
import { UserEntity } from '../../adapters/repositories/user/user.repository.entity';
import {
  IUserRepository,
  USER_REPOSITORY_TYPE,
} from '../../adapters/repositories/user/user.repository.interface';
import { AppDataSource } from '../database/db';

// Bind Repository
const repositoryBinding = new ContainerModule(bind => {
  // Bind the TypeORM repository
  bind<Repository<UserEntity>>(Repository<UserEntity>)
    .toDynamicValue(() => {
      return AppDataSource.getRepository(UserEntity);
    })
    .inRequestScope();

  // Bind Repository
  bind<IUserRepository>(USER_REPOSITORY_TYPE.UserRepository)
    .to(UserRepository)
    .inSingletonScope();
});

export { repositoryBinding };
