// module import
import { StatusCodes } from 'http-status-codes';
// domain import
import { IResponseDomain } from '../../../domains/response.domain';
// interface import
import { IResponseErrorDomain } from '../../../domains/error.domain';
import { IAddUserResponse, ResponseAddUser } from './addUser.interface';

/*
 * BAD_REQUEST
 */
const USER_EXISTS: IResponseErrorDomain = {
  error: true,
  message: 'USER_EXISTS',
  code: StatusCodes.BAD_REQUEST,
};

/*
 * INTERNAL_SERVER_ERROR
 */
const INSERT_USER_ERROR: IResponseErrorDomain = {
  error: true,
  message: 'INSERT_USER_ERROR',
  code: StatusCodes.INTERNAL_SERVER_ERROR,
};

/*
 * CREATED
 */
const CREATED: IResponseDomain<ResponseAddUser> = {
  error: false,
  message: 'USER_CREATED',
  code: StatusCodes.CREATED,
};

// response to export with definition
const addUserResponse: IAddUserResponse = {
  USER_EXISTS,
  INSERT_USER_ERROR,
  CREATED,
};

export { addUserResponse, CREATED, INSERT_USER_ERROR, USER_EXISTS };
