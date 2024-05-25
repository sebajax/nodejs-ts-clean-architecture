import { Container } from 'inversify';
import { Repository } from 'typeorm';
import { UserRepository } from '../../adapters/repository/user/user.repository';
import { UserEntity } from '../../adapters/repository/user/user.repository.entity';
import {
  IUserRepository,
  USER_REPOSITORY_TYPE,
} from '../../adapters/repository/user/user.repository.interface';
import { AddUser } from '../../usecases/user/addUser/addUser';
import {
  ADD_USER_TYPE,
  IAddUser,
} from '../../usecases/user/addUser/addUser.interface';
import { AppDataSource } from '../database/db';

export const container = new Container();

/**
 * Bind the TypeORM repository
 */
container
  .bind<Repository<UserEntity>>(USER_REPOSITORY_TYPE.UserRepositoryOrm)
  .toDynamicValue(() => {
    return AppDataSource.getRepository(UserEntity);
  })
  .inRequestScope();

/**
 * Bind Repository
 */
container
  .bind<IUserRepository>(USER_REPOSITORY_TYPE.UserRepository)
  .to(UserRepository);

/**
 * Bind Use Cases
 */
container.bind<IAddUser>(ADD_USER_TYPE.AddUser).to(AddUser);
