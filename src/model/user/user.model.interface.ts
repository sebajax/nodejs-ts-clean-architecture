// model import
import { UserModel } from './user.model';
import { UserEntity } from './user.model.entity';
// db import
import AppDataSource from '../../infraestructure/database/db';

interface IUserEntity {
  id?: number;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IUserModel {
  create(data: IUserEntity): Promise<IUserEntity>;
  findUser(email: string): Promise<IUserEntity | null>;
}

// get entity repository
const userRepository = AppDataSource.getRepository(UserEntity);

/*
 * model factory init
 */
const userModel = new UserModel(userRepository);

export { IUserEntity, IUserModel, userModel };
