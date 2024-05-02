// domain import
import { IResponseDomain } from '../../../domain/response.domain';
import { IUserDomain } from '../../../domain/user.domain';
// model import
import { userModel } from '../../../model/user/user.model.interface';
// service import
import { AddUserService } from './addUser.service';

// for addMessageService response domain
export interface IAddUserResponse {
  USER_EXISTS: IResponseDomain;
  INSERT_USER_ERROR: IResponseDomain;
  CREATED: IResponseDomain;
}

// interface to implement the service
export interface IAddUserService {
  addUser(userData: IUserDomain): Promise<IResponseDomain>;
}

/*
 * service factory init
 */
export const addUserService: IAddUserService = new AddUserService(userModel);
