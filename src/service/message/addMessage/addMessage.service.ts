// domain import
import IResponseDomain from '../../../domain/response.domain';
// interface import
import { IMessageData } from '../../../controller/message/addMessage/addMessage.controller.interface';
import { IMessageModel } from '../../../model/message/message.model.interface';
import { IUserModel } from '../../../model/user/user.model.interface';
import {
  IAddMessageResponse,
  IAddMessageService,
} from './addMessage.service.interface';
// service main class import
import Service from '../../service';
// response import
import addMessageResponse from './addMessage.response';

class AddMessageService extends Service implements IAddMessageService {
  private response: IAddMessageResponse;
  private messageModel: IMessageModel;
  private userModel: IUserModel;

  public constructor(messageModel: IMessageModel, userModel: IUserModel) {
    super();
    this.response = addMessageResponse;
    this.messageModel = messageModel;
    this.userModel = userModel;
  }

  public async addMessage(messagaData: IMessageData): Promise<IResponseDomain> {
    try {
      // check if is a valid user using user model
      const user = await this.userModel.getUser(messagaData.sender);
      if (user === null) {
        return this.response.USER_NOT_FOUND;
      }

      // map message data to message model data
      const message = {
        text: messagaData.text,
        userId: user.userId,
        details: messagaData.classification.details,
        messageTimestamp: messagaData.messageTimestamp,
        topScore: messagaData.classification.topScore,
        room: messagaData.room,
      };

      const createdMessage = await this.messageModel.createMessage(message);

      // if all the process was succuessfully we return an OK status
      return {
        ...this.response.CREATED,
        data: createdMessage,
      };
    } catch (error) {
      this.logger.error(`${AddMessageService.name} error ${error}`);
      return this.response.INSERT_MESSAGE_ERROR;
    }
  }
}

export default AddMessageService;
