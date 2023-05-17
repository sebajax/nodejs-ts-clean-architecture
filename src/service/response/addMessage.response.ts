import {StatusCodes} from 'http-status-codes';
import {
  IResponseDomain,
  IAddMessageResponse,
} from '../../domain/response.domain';

/*
 * INTERNAL_SERVER_ERROR
 */
const INSERT_MESSAGE_ERROR: IResponseDomain = {
  error: true,
  message: 'INSERT_MESSAGE_ERROR',
  code: StatusCodes.INTERNAL_SERVER_ERROR,
};

/*
 * CREATED
 */
const CREATED: IResponseDomain = {
  error: false,
  message: 'MESSAGE_CREATED',
  code: StatusCodes.CREATED,
};

// response to export with definition
const addMessageResponse: IAddMessageResponse = {
  INSERT_MESSAGE_ERROR,
  CREATED,
};

export default addMessageResponse;

export {INSERT_MESSAGE_ERROR, CREATED};
