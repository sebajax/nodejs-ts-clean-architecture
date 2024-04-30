// model import
import { UserModel } from './user.model';
import { UserEntity } from './user.model.entity';
// db import
import AppDataSource from '../../infraestructure/database/db';
// domain import
import { UserDomain } from '../../domain/user.domain';
// dto import
import { ICreateUserDTO } from './dto/createUser.dto';
import { IFindUserDTO } from './dto/findUser.dto';

interface IUserModel {
  createUser(data: UserDomain): Promise<ICreateUserDTO>;
  findUser(email: string): Promise<IFindUserDTO | null>;
}

// get entity repository
const userRepository = AppDataSource.getRepository(UserEntity);

/*
 * model factory init
 */
const userModel = new UserModel(userRepository);

export { IUserModel, userModel };
