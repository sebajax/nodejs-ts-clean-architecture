// di import
import { inject, injectable } from 'inversify';
// domain import
import { ResponseDomain } from '../../../domains/response.domain';
// interface import
import { IAddUserRequest } from '../../../adapters/controller/user/user.interface';
import {
  IUserRepository,
  USER_REPOSITORY_TYPE,
} from '../../../adapters/repository/user/user.repository.interface';
import { UserDomain } from '../../../domains/user.domain';
import {
  ILogger,
  LOGGER_TYPE,
} from '../../../infrastructure/logging/logger.interface';
import { GET_USER_TYPE, IGetUser } from '../getUser/getUser.interface';
import { ADD_USER_TYPE, IAddUser, IAddUserResponse } from './addUser.interface';

@injectable()
export class AddUser implements IAddUser {
  constructor(
    @inject(LOGGER_TYPE.Logger) private _logger: ILogger,
    @inject(ADD_USER_TYPE.AddUserResponse) private _response: IAddUserResponse,
    @inject(USER_REPOSITORY_TYPE.UserRepository)
    private _repository: IUserRepository,
    @inject(GET_USER_TYPE.GetUser) private _getUser: IGetUser
  ) {}

  public async execute(userRequest: IAddUserRequest): Promise<ResponseDomain> {
    try {
      // check that email does not exist
      // check if is a valid user using user model
      const { data: user } = await this._getUser.execute(userRequest);

      // generate user domain instance
      const userDomain = new UserDomain(user.name, user.name);

      // creating a new user
      const createdUser = await this._repository.createUser(userDomain);

      // if all the process was successfully we return an OK status
      return new ResponseDomain(this._response.CREATED, createdUser);
    } catch (error) {
      //this.logger.error(`${AddUser.name} error ${error}`);
      console.error(`${AddUser.name} error ${error}`);
      return this._response.INSERT_USER_ERROR;
    }
  }
}
