// domain import
import addMessageResponse from './response/addMessage.response';
// service import
import makeAddMessageService from './addMessage.service';
// infraestructure import
import logger from '../infraestructure/log/logger';

/* service definition */
const addMessageService = makeAddMessageService(addMessageResponse, logger);

export default addMessageService;
