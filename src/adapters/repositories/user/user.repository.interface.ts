// Domain import
import { UserDomain } from '../../../domains/user.domain';
// Dto import
import { CreateUserDto } from './dto/createUser.dto';
import { QueryUserDto } from './dto/queryUser.dto';

// User Repository DI identifiers
const USER_REPOSITORY_TYPE = {
  UserRepository: Symbol.for('UserRepository'),
};

// User Repository interface
interface IUserRepository {
  createUser(user: UserDomain): Promise<CreateUserDto>;
  findUser(email: string): Promise<QueryUserDto | null>;
}

export { IUserRepository, USER_REPOSITORY_TYPE };
