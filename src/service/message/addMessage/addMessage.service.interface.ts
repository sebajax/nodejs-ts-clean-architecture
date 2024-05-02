// domain import
import { MessageDomain } from '../../../domain/message.domain';
import {
  IResponseDomain,
  ResponseDomain,
} from '../../../domain/response.domain';
// model import
import { messageModel } from '../../../model/message/message.model.interface';
// service import
import { AddMessageService } from './addMessage.service';

// for addMessageService response domain
export interface IAddMessageResponse {
  USER_NOT_FOUND: IResponseDomain;
  INSERT_MESSAGE_ERROR: IResponseDomain;
  CREATED: IResponseDomain;
}

// interface to implement the service
export interface IAddMessageService {
  addMessage(message: MessageDomain): Promise<ResponseDomain>;
}

// service factory init
export const addMessageService = new AddMessageService(messageModel);
