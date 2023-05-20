import AddMessageController from '../../controller/message/addMessage.controller';
import {addMessageSchema} from '../../schema/message.schema';
import {addMessageService} from '../../service/message/addMessage/addMessage.interface';

/*
 * controller factory init
 */
const addMessageController = new AddMessageController(
  addMessageSchema,
  addMessageService
);

export {addMessageController};
