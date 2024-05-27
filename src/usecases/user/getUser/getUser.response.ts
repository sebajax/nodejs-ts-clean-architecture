// module import
import { StatusCodes } from 'http-status-codes';
// domain import
import { IResponseErrorDomain } from '../../../domains/error.domain';
import { IResponseDomain } from '../../../domains/response.domain';
import { IGetUserResponse, ResponseGetUser } from './getUser.interface';
// interface import

/*
 * THROW RESPONSE ERROR
 */

// BAD_REQUEST
const USER_NOT_FOUND: IResponseErrorDomain = {
  error: true,
  message: 'USER_NOT_FOUND',
  code: StatusCodes.NOT_FOUND,
};

// INTERNAL_SERVER_ERROR
const GET_USER_ERROR: IResponseErrorDomain = {
  error: true,
  message: 'GET_USER_ERROR',
  code: StatusCodes.INTERNAL_SERVER_ERROR,
};

/*
 * RETURN RESPONSE DOMAIN
 */
const OK: IResponseDomain<ResponseGetUser> = {
  error: false,
  message: 'OK',
  code: StatusCodes.OK,
};

// response to export with definition
const getUserResponse: IGetUserResponse = {
  USER_NOT_FOUND,
  GET_USER_ERROR,
  OK,
};

export { GET_USER_ERROR, getUserResponse, OK, USER_NOT_FOUND };
