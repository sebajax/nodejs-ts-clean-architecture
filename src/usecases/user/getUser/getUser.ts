// di import
import { inject, injectable } from 'inversify';
// domain import
import { ResponseDomain } from '../../../domains/response.domain';
// interface import
import {
  IUserRepository,
  USER_REPOSITORY_TYPE,
} from '../../../adapters/repositories/user/user.repository.interface';
import { ResponseErrorDomain } from '../../../domains/error.domain';
import {
  ILogger,
  LOGGER_TYPE,
} from '../../../infrastructure/logging/logger.interface';
import { IGetUser, ResponseGetUser } from './getUser.interface';
import { getUserResponse } from './getUser.response';

@injectable()
export class GetUser implements IGetUser {
  constructor(
    @inject(LOGGER_TYPE.Logger) private _logger: ILogger,
    @inject(USER_REPOSITORY_TYPE.UserRepository)
    private _repository: IUserRepository
  ) {}

  public async execute(
    email: string
  ): Promise<ResponseDomain<ResponseGetUser> | ResponseErrorDomain> {
    try {
      // check that email does not exist
      // check if is a valid user using user model
      const user = await this._repository.findUser(email);
      if (user === null) {
        throw new ResponseErrorDomain(getUserResponse.USER_NOT_FOUND);
      }

      // if all the process was successfully we return an OK status
      return new ResponseDomain(getUserResponse.OK, user);
    } catch (error) {
      //this.logger.error(`${AddUser.name} error ${error}`);
      // console.error(`${AddUser.name} error ${error}`);
      throw new ResponseErrorDomain(getUserResponse.GET_USER_ERROR);
    }
  }
}
