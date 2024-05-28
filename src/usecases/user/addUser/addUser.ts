// Module import
import { inject, injectable } from 'inversify';
// Domain import
import { ResponseErrorDomain } from '../../../domains/error.domain';
import { ResponseDomain } from '../../../domains/response.domain';
import { UserDomain } from '../../../domains/user.domain';
// Interface import
import { IAddUserRequest } from '../../../adapters/controller/user/user.interface';
import { IAddUser, ResponseAddUser } from './addUser.interface';
// Repository import
import {
  IUserRepository,
  USER_REPOSITORY_TYPE,
} from '../../../adapters/repositories/user/user.repository.interface';
// Infrastructure import
import {
  ILogger,
  LOGGER_TYPE,
} from '../../../infrastructure/logging/logger.interface';
// Response import
import { addUserResponse } from './addUser.response';

@injectable()
class AddUser implements IAddUser {
  constructor(
    @inject(LOGGER_TYPE.Logger) private readonly _logger: ILogger,
    @inject(USER_REPOSITORY_TYPE.UserRepository)
    private readonly _repository: IUserRepository
  ) {}

  public async execute(
    userRequest: IAddUserRequest
  ): Promise<ResponseDomain<ResponseAddUser> | ResponseErrorDomain> {
    // Destructure the request data
    const { name, email } = userRequest;

    // Check that email does not exist
    const checkUser = await this._repository.findUser(email);
    if (checkUser !== null) {
      throw new ResponseErrorDomain(addUserResponse.USER_EXISTS);
    }

    // Generate user domain instance
    const userDomain = new UserDomain(name, email);

    // Creating a new user
    const createdUser = await this._repository.createUser(userDomain);

    // If all the process was successfully we return an OK status
    return new ResponseDomain(addUserResponse.CREATED, createdUser);
  }
}

export { AddUser };
