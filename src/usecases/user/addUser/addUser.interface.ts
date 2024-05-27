// domain import
import {
  IResponseDomain,
  ResponseDomain,
} from '../../../domains/response.domain';
import { UserDomain } from '../../../domains/user.domain';

// AddUser DI identifiers
export const ADD_USER_TYPE = {
  AddUser: Symbol.for('UserRepository'),
  AddUserResponse: Symbol.for('AddUserResponse'),
};

// for AddUser response domain
export interface IAddUserResponse {
  USER_EXISTS: IResponseDomain;
  INSERT_USER_ERROR: IResponseDomain;
  CREATED: IResponseDomain;
}

// interface to implement the use case
export interface IAddUser {
  execute(user: UserDomain): Promise<ResponseDomain>;
}
