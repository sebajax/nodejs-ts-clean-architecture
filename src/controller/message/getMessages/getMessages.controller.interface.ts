// controller import
import GetMessagesController from './getMessages.controller';
// interface import
import {getMessagesService} from '../../../service/message/getMessages/getMessages.service.interface';

/*
 * controller factory init
 */
const getMessagesController: GetMessagesController = new GetMessagesController(
  getMessagesService
);

export {getMessagesController};
