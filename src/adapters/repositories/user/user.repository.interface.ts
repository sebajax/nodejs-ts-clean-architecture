// domain import
import { UserDomain } from '../../../domains/user.domain';
// dto import
import { CreateUserDto } from './dto/createUser.dto';
import { QueryUserDto } from './dto/queryUser.dto';

// User Repository DI identifiers
export const USER_REPOSITORY_TYPE = {
  UserRepository: Symbol.for('UserRepository'),
};

// User Repository interface
export interface IUserRepository {
  createUser(user: UserDomain): Promise<CreateUserDto>;
  findUser(email: string): Promise<QueryUserDto | null>;
}
