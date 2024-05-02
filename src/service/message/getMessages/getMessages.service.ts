// domain import
import { ResponseDomain } from '../../../domain/response.domain';
// interface import
import { IMessageModel } from '../../../model/message/message.model.interface';
import {
  IGetMessagesResponse,
  IGetMessagesService,
} from './getMessages.service.interface';
// service main class import
import { Service } from '../../service';
// response import
import { getMessagesResponse } from './getMessages.response';

export class GetMessagesService extends Service implements IGetMessagesService {
  private response: IGetMessagesResponse;
  private messageModel: IMessageModel;

  public constructor(messageModel: IMessageModel) {
    super();
    this.response = getMessagesResponse;
    this.messageModel = messageModel;
  }

  public async getMessages(): Promise<ResponseDomain> {
    try {
      // get messages
      const messages = await this.messageModel.getMessages();

      // if all the process was succuessfully we return an OK status
      return new ResponseDomain(this.response.OK, messages);
    } catch (error) {
      this.logger.error(`${GetMessagesService.name} error ${error}`);
      return this.response.GET_MESSAGES_ERROR;
    }
  }
}
