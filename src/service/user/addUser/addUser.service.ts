// domain import
import IResponseDomain from '../../../domain/response.domain';
// interface import
import { IUserData } from '../../../controller/user/addUser/addUser.controller.interface';
import { IUserModel } from '../../../model/user/user.model.interface';
import { IAddUserResponse, IAddUserService } from './addUser.service.interface';
// service main class import
import Service from '../../service';
// response import
import addUserResponse from './addUser.response';

class AddUserService extends Service implements IAddUserService {
  private response: IAddUserResponse;
  private userModel: IUserModel;

  public constructor(userModel: IUserModel) {
    super();
    this.response = addUserResponse;
    this.userModel = userModel;
  }

  public async addUser(userData: IUserData): Promise<IResponseDomain> {
    try {
      // check that email does not exist
      // check if is a valid user using user model
      const checkUser = await this.userModel.findUser(userData.email);
      if (checkUser !== null) {
        return this.response.USER_EXISTS;
      }

      // map user data to user model data
      const user = {
        name: userData.name,
        email: userData.email,
      };

      const createdUser = await this.userModel.create(user);

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
