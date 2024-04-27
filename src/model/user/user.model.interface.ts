// model import
import { UserModel } from './user.model';
import { UserEntity } from './user.model.entity';
// db import
import AppDataSource from '../../infraestructure/database/db';
// domain import
import { IUserDomain } from '../../domain/user.domain';
// dto import
import { CreateUserDTO } from './dto/createUser.dto';
import { FindUserDTO } from './dto/findUser.dto';

interface IUserModel {
  createUser(data: IUserDomain): Promise<CreateUserDTO>;
  findUser(email: string): Promise<FindUserDTO | null>;
}

// get entity repository
const userRepository = AppDataSource.getRepository(UserEntity);

/*
 * model factory init
 */
const userModel = new UserModel(userRepository);

export { IUserModel, userModel };
