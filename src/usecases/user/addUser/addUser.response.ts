// Module import
import { StatusCodes } from 'http-status-codes';
// Domain import
import { IResponseDomain } from '../../../domains/response.domain';
// Interface import
import {
  ErrorNames,
  IResponseErrorDomain,
} from '../../../domains/error.domain';
import { IAddUserResponse, ResponseAddUser } from './addUser.interface';

/*
 * BAD_REQUEST
 */
const USER_EXISTS: IResponseErrorDomain = {
  name: ErrorNames.BadRequestError,
  error: true,
  message: 'USER_EXISTS',
  code: StatusCodes.BAD_REQUEST,
};

/*
 * INTERNAL_SERVER_ERROR
 */
const INSERT_USER_ERROR: IResponseErrorDomain = {
  name: ErrorNames.InternalServerError,
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

// Response to export with definition
const addUserResponse: IAddUserResponse = {
  USER_EXISTS,
  INSERT_USER_ERROR,
  CREATED,
};

export { addUserResponse, CREATED, INSERT_USER_ERROR, USER_EXISTS };
