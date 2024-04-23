// domain import
import { IUserData } from '../../../controller/user/addUser/addUser.controller.interface';
import IResponseDomain from '../../../domain/response.domain';
// model import
import { userModel } from '../../../model/user/user.model.interface';
// service import
import AddUserService from './addUser.service';

// for addMessageService response domain
interface IAddUserResponse {
  USER_EXISTS: IResponseDomain;
  INSERT_USER_ERROR: IResponseDomain;
  CREATED: IResponseDomain;
}

// interface to implement the service
interface IAddUserService {
  addUser(userData: IUserData): Promise<IResponseDomain>;
}

/*
 * service factory init
 */
const addUserService: IAddUserService = new AddUserService(userModel);

export { addUserService, IAddUserResponse, IAddUserService };
