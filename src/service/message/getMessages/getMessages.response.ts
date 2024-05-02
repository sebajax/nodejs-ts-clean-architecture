// module import
import { StatusCodes } from 'http-status-codes';
// domain import
import { IResponseDomain } from '../../../domain/response.domain';
// interface import
import { IGetMessagesResponse } from './getMessages.service.interface';

/*
 * NOT_FOUND
 */
const GET_MESSAGES_ERROR: IResponseDomain = {
  error: true,
  message: 'GET_MESSAGES_ERROR',
  code: StatusCodes.INTERNAL_SERVER_ERROR,
};

/*
 * OK
 */
const OK: IResponseDomain = {
  error: false,
  message: 'OK',
  code: StatusCodes.OK,
};

// response to export with definition
const getMessagesResponse: IGetMessagesResponse = {
  GET_MESSAGES_ERROR,
  OK,
};

export { GET_MESSAGES_ERROR, getMessagesResponse, OK };
