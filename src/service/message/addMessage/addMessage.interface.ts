import {IResponseDomain} from '../../../domain/response.domain';
import AddMessageService from './addMessage.service';

interface IAddMessageService {
  addMessage(data: object): Promise<IResponseDomain>;
}

/*
 * service factory init
 */
const addMessageService: IAddMessageService = new AddMessageService();

export {IAddMessageService, addMessageService};
