// controller import
import AddMessageController from '../addMessage/addMessage.controller';
// schema import
import { addMessageSchema } from '../../../schema/message.schema';
// interface import
import { addMessageService } from '../../../service/message/addMessage/addMessage.service.interface';

/*
 * body request data interface
 */
interface IMessageData {
  text: string;
  sender: string;
  room: string;
  messageTimestamp: Date;
  classification: {
    topScore: object;
    details: Array<object>;
  };
}

/*
 * controller factory init
 */
const addMessageController: AddMessageController = new AddMessageController(
  addMessageSchema,
  addMessageService
);

export { addMessageController, IMessageData };
