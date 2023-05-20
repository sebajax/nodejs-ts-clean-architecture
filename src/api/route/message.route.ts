import express, {Request, Response} from 'express';
import checkBodyMiddleware from '../middleware/checkBody.middleware';
import AddMessageController from '../../controller/message/addMessage.controller';
import {addMessageSchema} from '../../schema/message.schema';
import AddMessageService from '../../service/message/addMessage/addMessage.service';

const router = express.Router();

// add a new message
router.post(
  '/',
  checkBodyMiddleware,
  (req: Request, res: Response): Promise<Response> => {
    // creates a service instance with dependencies
    const addMessageService = new AddMessageService();

    // creates a controller instance with dependencies
    const addMessageController = new AddMessageController(
      addMessageSchema,
      addMessageService
    );

    // executes use case
    return addMessageController.addMessage(req, res);
  }
);

export default router;
