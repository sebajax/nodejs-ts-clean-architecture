// domain import
import {
  IResponseDomain,
  ResponseDomain,
} from '../../../domains/response.domain';
import { UserDomain } from '../../../domains/user.domain';

// GetUser DI identifiers
export const GET_USER_TYPE = {
  GetUser: Symbol.for('UserRepository'),
  GetUserResponse: Symbol.for('GetUserResponse'),
};

// for GetUser response domain
export interface IGetUserResponse {
  USER_NOT_EXISTS: IResponseDomain;
  GET_USER_ERROR: IResponseDomain;
  OK: IResponseDomain;
}

// interface to implement the use case
export interface IGetUser {
  execute(user: UserDomain): Promise<ResponseDomain>;
}
