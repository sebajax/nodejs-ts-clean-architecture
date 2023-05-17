// domain importS
import {Logger} from 'winston';
import {IAddMessageResponse, IResponseDomain} from '../domain/response.domain';

export default function makeAddMessageService(
  addMessageResponse: IAddMessageResponse,
  logger: Logger
): Function {
  return async function addMessageService(
    data: object
  ): Promise<IResponseDomain> {
    try {
      // if all the process was succuessfully we return an OK status
      return {
        ...addMessageResponse.CREATED,
        data,
      };
    } catch (error) {
      logger.error(`${addMessageService.name} error ${error}`);
      return addMessageResponse.INSERT_MESSAGE_ERROR;
    }
  };
}
