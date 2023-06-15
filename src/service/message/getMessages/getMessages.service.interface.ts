// domain import
import IResponseDomain from '../../../domain/response.domain';
// model import
import {messageModel} from '../../../model/message/message.model.interface';
// service import
import GetMessagesService from './getMessages.service';

// for getMessagesService response domain
interface IGetMessagesResponse {
  GET_MESSAGES_ERROR: IResponseDomain;
  OK: IResponseDomain;
}

// interface to implement the service
interface IGetMessagesService {
  getMessages(page: number): Promise<IResponseDomain>;
}

/*
 * service factory init
 */
const getMessagesService: IGetMessagesService = new GetMessagesService(
  messageModel
);

export {IGetMessagesResponse, IGetMessagesService, getMessagesService};
