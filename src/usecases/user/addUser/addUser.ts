// di import
import { inject, injectable } from 'inversify';
// domain import
import { ResponseDomain } from '../../../domains/response.domain';
import { UserDomain } from '../../../domains/user.domain';
// interface import
import {
  IUserRepository,
  USER_REPOSITORY_TYPE,
} from '../../../adapters/repository/user/user.repository.interface';
import { ADD_USER_TYPE, IAddUser, IAddUserResponse } from './addUser.interface';

@injectable()
export class AddUser implements IAddUser {
  private _response: IAddUserResponse;
  private _userRepository: IUserRepository;

  public constructor(
    @inject(ADD_USER_TYPE.AddUserResponse) addUserResponse: IAddUserResponse,
    @inject(USER_REPOSITORY_TYPE.UserRepository) userRepository: IUserRepository
  ) {
    this._response = addUserResponse;
    this._userRepository = userRepository;
  }

  public async addUser(user: UserDomain): Promise<ResponseDomain> {
    try {
      // check that email does not exist
      // check if is a valid user using user model
      const checkUser = await this._userRepository.findUser(user.email);
      if (checkUser !== null) {
        return new ResponseDomain(this._response.USER_EXISTS);
      }

      // creating a new user
      const createdUser = await this._userRepository.createUser(user);

      // if all the process was successfully we return an OK status
      return new ResponseDomain(this._response.CREATED, createdUser);
    } catch (error) {
      //this.logger.error(`${AddUser.name} error ${error}`);
      console.error(`${AddUser.name} error ${error}`);
      return this._response.INSERT_USER_ERROR;
    }
  }
}
