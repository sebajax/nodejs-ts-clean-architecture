// domain importS
import IResponseDomain from '../../../domain/response.domain';
import {IMessageModel} from '../../../model/message.model.interface';
import {IMessageData} from '../../../schema/message.schema';
import Service from '../../service';
import {IAddMessageResponse, IAddMessageService} from './addMessage.interface';
import addMessageResponse from './addMessage.response';

class AddMessageService extends Service implements IAddMessageService {
  private response: IAddMessageResponse;
  private messageModel: IMessageModel;

  public constructor(messageModel: IMessageModel) {
    super();
    this.response = addMessageResponse;
    this.messageModel = messageModel;
  }

  public async addMessage(data: IMessageData): Promise<IResponseDomain> {
    try {
      const message = {
        text: data.text,
        sender: data.sender,
        details: data.classification.details,
        messageTimestamp: data.messageTimestamp,
        topScore: data.classification.topScore,
        room: data.room,
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
