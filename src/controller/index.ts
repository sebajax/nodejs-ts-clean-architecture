// infraestructure import
import {logger, logMessage} from '../infraestructure/log/logger';
// schema import
import {addMessageSchema} from '../schema/message.schema';
// controller import
import makeAddMessageController from './addMessage.controller';

/* controller definition */
const addMessageController = makeAddMessageController(
  logger,
  logMessage,
  addMessageSchema
);

export default addMessageController;
