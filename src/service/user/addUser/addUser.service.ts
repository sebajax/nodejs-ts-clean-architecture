// domain import
import IResponseDomain from '../../../domain/response.domain';
import { UserDomain } from '../../../domain/user.domain';
// interface import
import { IUserModel } from '../../../model/user/user.model.interface';
import { IAddUserResponse } from './addUser.service.interface';
// service main class import
import Service from '../../service';
// response import
import addUserResponse from './addUser.response';

class AddUserService extends Service {
  private response: IAddUserResponse;
  private userModel: IUserModel;

  public constructor(userModel: IUserModel) {
    super();
    this.response = addUserResponse;
    this.userModel = userModel;
  }

  public async addUser(user: UserDomain): Promise<IResponseDomain> {
    try {
      // check that email does not exist
      // check if is a valid user using user model
      const checkUser = await this.userModel.findUser(user.email);
      if (checkUser !== null) {
        return this.response.USER_EXISTS;
      }

      // creating a new user
      const createdUser = await this.userModel.createUser(user);

      // if all the process was succuessfully we return an OK status
      return {
        ...this.response.CREATED,
        data: createdUser,
      };
    } catch (error) {
      this.logger.error(`${AddUserService.name} error ${error}`);
      return this.response.INSERT_USER_ERROR;
    }
  }
}

export default AddUserService;
