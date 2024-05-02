// domain import
import {
  IResponseDomain,
  ResponseDomain,
} from '../../../domain/response.domain';
import { UserDomain } from '../../../domain/user.domain';
// model import
import { userModel } from '../../../model/user/user.model.interface';
// service import
import { AddUserService } from './addUser.service';

// for addUserService response domain
export interface IAddUserResponse {
  USER_EXISTS: IResponseDomain;
  INSERT_USER_ERROR: IResponseDomain;
  CREATED: IResponseDomain;
}

// interface to implement the service
export interface IAddUserService {
  addUser(user: UserDomain): Promise<ResponseDomain>;
}

// service factory init
export const addUserService = new AddUserService(userModel);
