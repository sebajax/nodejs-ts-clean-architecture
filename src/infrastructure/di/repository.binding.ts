// Module import
import { ContainerModule } from 'inversify';
import { Repository } from 'typeorm';
// Repository import
import { UserRepository } from '../../adapters/repositories/user/user.repository';
import { UserEntity } from '../../adapters/repositories/user/user.repository.entity';
import {
  IUserRepository,
  USER_REPOSITORY_TYPE,
} from '../../adapters/repositories/user/user.repository.interface';
// Database import
import { AppDataSource } from '../database/db';

// Bind Repository
const repositoryBinding = new ContainerModule(bind => {
  // Bind the TypeORM repository
  bind<Repository<UserEntity>>(USER_REPOSITORY_TYPE.UserRepositoryEntity)
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
