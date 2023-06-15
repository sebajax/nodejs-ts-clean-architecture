// module import
import express, {Request, Response} from 'express';
// middleware import
import checkBodyMiddleware from '../middleware/checkBody.middleware';
// interface import
import {addMessageController} from '../../controller/message/addMessage/addMessage.controller.interface';
import {getMessagesController} from '../../controller/message/getMessages/getMessages.controller.interface';

const router = express.Router();

// add a new message
router.post(
  '/',
  checkBodyMiddleware,
  (req: Request, res: Response): Promise<Response> => {
    // execute controller
    return addMessageController.addMessage(req, res);
  }
);

// get all messages paginated
router.get('/page/:page', (req: Request, res: Response): Promise<Response> => {
  // execute controller
  return getMessagesController.getMessages(req, res);
});

export default router;
