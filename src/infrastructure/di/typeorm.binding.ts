import { ContainerModule } from 'inversify';
import { Repository } from 'typeorm';
import { UserEntity } from '../../adapters/repository/user/user.repository.entity';
import { USER_REPOSITORY_TYPE } from '../../adapters/repository/user/user.repository.interface';
import { AppDataSource } from '../database/db';

// Bind the TypeORM repository
const typeOrmBinding = new ContainerModule(bind => {
  bind<Repository<UserEntity>>(USER_REPOSITORY_TYPE.UserRepositoryOrm)
    .toDynamicValue(() => {
      return AppDataSource.getRepository(UserEntity);
    })
    .inRequestScope();
});

export { typeOrmBinding };
