// di import
import { inject, injectable } from 'inversify';
// domain import
import { ResponseDomain } from '../../../domains/response.domain';
// interface import
import { IAddUserRequest } from '../../../adapters/controller/user/user.interface';
import {
  IUserRepository,
  USER_REPOSITORY_TYPE,
} from '../../../adapters/repositories/user/user.repository.interface';
import { ResponseErrorDomain } from '../../../domains/error.domain';
import { UserDomain } from '../../../domains/user.domain';
import {
  ILogger,
  LOGGER_TYPE,
} from '../../../infrastructure/logging/logger.interface';
import { IAddUser, ResponseAddUser } from './addUser.interface';
import { addUserResponse } from './addUser.response';

@injectable()
export class AddUser implements IAddUser {
  constructor(
    @inject(LOGGER_TYPE.Logger) private _logger: ILogger,
    @inject(USER_REPOSITORY_TYPE.UserRepository)
    private _repository: IUserRepository
    // @inject(GET_USER_TYPE.GetUser) private _getUser: IGetUser
  ) {}

  public async execute(
    userRequest: IAddUserRequest
  ): Promise<ResponseDomain<ResponseAddUser> | ResponseErrorDomain> {
    // destructure the request data
    const { name, email } = userRequest;

    // check that email does not exist
    const checkUser = await this._repository.findUser(email);
    if (checkUser !== null) {
      throw new ResponseErrorDomain(addUserResponse.USER_EXISTS);
    }

    // generate user domain instance
    const userDomain = new UserDomain(name, email);

    // creating a new user
    const createdUser = await this._repository.createUser(userDomain);

    // if all the process was successfully we return an OK status
    return new ResponseDomain(addUserResponse.CREATED, createdUser);
  }
}
