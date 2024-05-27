// domain import
import {
  IResponseErrorDomain,
  ResponseErrorDomain,
} from '../../../domains/error.domain';
import {
  IResponseDomain,
  ResponseDomain,
} from '../../../domains/response.domain';

// GetUser DI identifiers
const GET_USER_TYPE = {
  GetUser: Symbol.for('GetUser'),
  GetUserResponse: Symbol.for('GetUserResponse'),
};

// response type for the use case
type ResponseGetUser = {
  id: number;
  name: string;
  email: string;
};

// for GetUser response domain
interface IGetUserResponse {
  USER_NOT_FOUND: IResponseErrorDomain;
  GET_USER_ERROR: IResponseErrorDomain;
  OK: IResponseDomain<ResponseGetUser>;
}

// interface to implement the use case
interface IGetUser {
  execute(
    email: string
  ): Promise<ResponseDomain<ResponseGetUser> | ResponseErrorDomain>;
}

export { GET_USER_TYPE, IGetUser, IGetUserResponse, ResponseGetUser };
