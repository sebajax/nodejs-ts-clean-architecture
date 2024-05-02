// domain import
import { MessageDomain } from '../../../domain/message.domain';
import { ResponseDomain } from '../../../domain/response.domain';
// interface import
import { IMessageModel } from '../../../model/message/message.model.interface';
import {
  IAddMessageResponse,
  IAddMessageService,
} from './addMessage.service.interface';
// service main class import
import { Service } from '../../service';
// response import
import { addMessageResponse } from './addMessage.response';

export class AddMessageService extends Service implements IAddMessageService {
  private response: IAddMessageResponse;
  private messageModel: IMessageModel;

  public constructor(messageModel: IMessageModel) {
    super();
    this.response = addMessageResponse;
    this.messageModel = messageModel;
  }

  public async addMessage(message: MessageDomain): Promise<ResponseDomain> {
    try {
      // creating a new message
      const createdMessage = await this.messageModel.createMessage(message);

      // if all the process was succuessfully we return an OK status
      return new ResponseDomain(this.response.CREATED, createdMessage);
    } catch (error) {
      this.logger.error(`${AddMessageService.name} error ${error}`);
      return this.response.CREATED;
    }
  }
}
