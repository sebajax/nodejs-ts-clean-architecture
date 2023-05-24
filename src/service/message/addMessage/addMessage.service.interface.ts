// domain import
import IResponseDomain from '../../../domain/response.domain';
// model import
import {messageModel} from '../../../model/message/message.model.interface';
// service import
import AddMessageService from './addMessage.service';

// for addMessageService response domain
interface IAddMessageResponse {
  INSERT_MESSAGE_ERROR: IResponseDomain;
  CREATED: IResponseDomain;
}

// interface to implement the service
interface IAddMessageService {
  addMessage(data: object): Promise<IResponseDomain>;
}

/*
 * service factory init
 */
const addMessageService: IAddMessageService = new AddMessageService(
  messageModel
);

export {IAddMessageResponse, IAddMessageService, addMessageService};
