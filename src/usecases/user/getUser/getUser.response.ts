// module import
import { StatusCodes } from 'http-status-codes';
// domain import
import { IResponseDomain } from '../../../domains/response.domain';
import { IGetUserResponse } from './getUser.interface';
// interface import

/*
 * THROW RESPONSE ERROR
 */

// BAD_REQUEST
const USER_NOT_EXISTS: IResponseDomain = {
  error: true,
  message: 'USER_EXISTS',
  code: StatusCodes.BAD_REQUEST,
};

// INTERNAL_SERVER_ERROR
const GET_USER_ERROR: IResponseDomain = {
  error: true,
  message: 'GET_USER_ERROR',
  code: StatusCodes.INTERNAL_SERVER_ERROR,
};

/*
 * RETURN RESPONSE DOMAIN
 */
const OK: IResponseDomain = {
  error: false,
  message: 'OK',
  code: StatusCodes.OK,
};

// response to export with definition
const addUserResponse: IGetUserResponse = {
  USER_NOT_EXISTS,
  GET_USER_ERROR,
  OK,
};

export { addUserResponse, GET_USER_ERROR, OK, USER_NOT_EXISTS };
