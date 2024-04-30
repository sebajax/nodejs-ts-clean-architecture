// model import
import { UserModel } from './user.model';
import { UserEntity } from './user.model.entity';
// db import
import AppDataSource from '../../infraestructure/database/db';
// domain import
import { UserDomain } from '../../domain/user.domain';
// dto import
import { CreateUserDto } from './dto/createUser.dto';
import { QueryUserDto } from './dto/queryUser.dto';

interface IUserModel {
  createUser(user: UserDomain): Promise<CreateUserDto>;
  findUser(email: string): Promise<QueryUserDto | null>;
}

// get entity repository
const userRepository = AppDataSource.getRepository(UserEntity);

/*
 * model factory init
 */
const userModel = new UserModel(userRepository);

export { IUserModel, userModel };
