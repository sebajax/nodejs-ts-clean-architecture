// domain importS
import {
  IAddMessageResponse,
  IResponseDomain,
} from '../../../domain/response.domain';
import Service from '../../service';
import addMessageResponse from './addMessage.response';

class AddMessageService extends Service {
  private response: IAddMessageResponse;

  public constructor() {
    super();
    this.response = addMessageResponse;
  }

  public async addMessage(data: object): Promise<IResponseDomain> {
    try {
      // if all the process was succuessfully we return an OK status
      return {
        ...this.response.CREATED,
        data,
      };
    } catch (error) {
      this.logger.error(`${AddMessageService.name} error ${error}`);
      return this.response.INSERT_MESSAGE_ERROR;
    }
  }
}

export default AddMessageService;
