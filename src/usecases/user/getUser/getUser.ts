// di import
import { inject, injectable } from 'inversify';
// domain import
import { ResponseDomain } from '../../../domains/response.domain';
// interface import
import {
  IUserRepository,
  USER_REPOSITORY_TYPE,
} from '../../../adapters/repository/user/user.repository.interface';
import { CustomError } from '../../../domains/error.domain';
import { UserDomain } from '../../../domains/user.domain';
import {
  ILogger,
  LOGGER_TYPE,
} from '../../../infrastructure/logging/logger.interface';
import { GET_USER_TYPE, IGetUser, IGetUserResponse } from './getUser.interface';

@injectable()
export class GetUser implements IGetUser {
  private _logger: ILogger;
  private _response: IGetUserResponse;
  private _repository: IUserRepository;

  constructor(
    @inject(LOGGER_TYPE.Logger) logger: ILogger,
    @inject(GET_USER_TYPE.GetUserResponse) response: IGetUserResponse,
    @inject(USER_REPOSITORY_TYPE.UserRepository) repository: IUserRepository
  ) {
    this._logger = logger;
    this._response = response;
    this._repository = repository;
  }

  public async execute(email: string): Promise<ResponseDomain | CustomError> {
    try {
      // check that email does not exist
      // check if is a valid user using user model
      const checkUser = await this._repository.findUser(email);
      if (checkUser !== null) {
        throw new CustomError(this._response.USER_NOT_EXISTS);
      }

      // generate user domain instance
      const userDomain = new UserDomain(checkUser.name, checkUser.email);

      // if all the process was successfully we return an OK status
      return new ResponseDomain(this._response.OK, userDomain);
    } catch (error) {
      //this.logger.error(`${AddUser.name} error ${error}`);
      // console.error(`${AddUser.name} error ${error}`);
      throw new CustomError(this._response.GET_USER_ERROR);
    }
  }
}
