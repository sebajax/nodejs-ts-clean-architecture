// Domain import
import {
  IResponseErrorDomain,
  ResponseErrorDomain,
} from '../../../domains/error.domain';
import {
  IResponseDomain,
  ResponseDomain,
} from '../../../domains/response.domain';
import { UserDomain } from '../../../domains/user.domain';

// AddUser DI identifiers
const ADD_USER_TYPE = {
  AddUser: Symbol.for('AddUser'),
  AddUserResponse: Symbol.for('AddUserResponse'),
};

// Response type for the use case
type ResponseAddUser = {
  id: number;
  name: string;
  email: string;
};

// For AddUser response domain
interface IAddUserResponse {
  USER_EXISTS: IResponseErrorDomain;
  INSERT_USER_ERROR: IResponseErrorDomain;
  CREATED: IResponseDomain<ResponseAddUser>;
}

// Interface to implement the use case
interface IAddUser {
  execute(
    user: UserDomain
  ): Promise<ResponseDomain<ResponseAddUser> | ResponseErrorDomain>;
}

export { ADD_USER_TYPE, IAddUser, IAddUserResponse, ResponseAddUser };
