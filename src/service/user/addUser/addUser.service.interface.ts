// domain import
import IResponseDomain from '../../../domain/response.domain';
// model import
import {userModel} from '../../../model/user/user.model.interface';
// service import
import AddUserService from './addUser.service';

// for addMessageService response domain
interface IAddUserResponse {
  INSERT_USER_ERROR: IResponseDomain;
  CREATED: IResponseDomain;
}

// interface to implement the service
interface IAddUserService {
  addUser(data: object): Promise<IResponseDomain>;
}

/*
 * service factory init
 */
const addUserService: IAddUserService = new AddUserService(userModel);

export {IAddUserResponse, IAddUserService, addUserService};
