// infraestructure import
import {logger, logMessage} from '../infraestructure/log/logger';
// schema import
import {addMessageSchema} from '../schema/message.schema';
// controller import
import makeAddMessageController from './addMessage.controller';
// service import
import addMessageService from '../service';

/* controller definition */
const addMessageController = makeAddMessageController(
  logger,
  logMessage,
  addMessageSchema,
  addMessageService
);

export default addMessageController;
