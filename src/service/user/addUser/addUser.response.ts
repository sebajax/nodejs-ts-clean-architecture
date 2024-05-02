// module import
import { StatusCodes } from 'http-status-codes';
// domain import
import { IResponseDomain } from '../../../domain/response.domain';
// interface import
import { IAddUserResponse } from './addUser.service.interface';

/*
 * BAD_REQUEST
 */
const USER_EXISTS: IResponseDomain = {
  error: true,
  message: 'USER_EXISTS',
  code: StatusCodes.BAD_REQUEST,
};

/*
 * INTERNAL_SERVER_ERROR
 */
const INSERT_USER_ERROR: IResponseDomain = {
  error: true,
  message: 'INSERT_USER_ERROR',
  code: StatusCodes.INTERNAL_SERVER_ERROR,
};

/*
 * CREATED
 */
const CREATED: IResponseDomain = {
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

export default addUserResponse;

export { CREATED, INSERT_USER_ERROR, USER_EXISTS };
