// domain import
import {
  IResponseDomain,
  ResponseDomain,
} from '../../../domain/response.domain';
// model import
import { messageModel } from '../../../model/message/message.model.interface';
// service import
import { GetMessagesService } from './getMessages.service';

// for getMessageService response domain
export interface IGetMessagesResponse {
  GET_MESSAGES_ERROR: IResponseDomain;
  OK: IResponseDomain;
}

// interface to implement the service
export interface IGetMessagesService {
  getMessages(): Promise<ResponseDomain>;
}

// service factory init
export const getMessagesService = new GetMessagesService(messageModel);
