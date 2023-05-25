// domain import
import {IMessageData} from '../../../controller/message/addMessage/addMessage.controller.interface';
import IResponseDomain from '../../../domain/response.domain';
// model import
import {messageModel} from '../../../model/message/message.model.interface';
import {userModel} from '../../../model/user/user.model.interface';
// service import
import AddMessageService from './addMessage.service';

// for addMessageService response domain
interface IAddMessageResponse {
  USER_NOT_FOUND: IResponseDomain;
  INSERT_MESSAGE_ERROR: IResponseDomain;
  CREATED: IResponseDomain;
}

// interface to implement the service
interface IAddMessageService {
  addMessage(messagaData: IMessageData): Promise<IResponseDomain>;
}

/*
 * service factory init
 */
const addMessageService: IAddMessageService = new AddMessageService(
  messageModel,
  userModel
);

export {IAddMessageResponse, IAddMessageService, addMessageService};
