import express, {Request, Response} from 'express';
import checkBodyMiddleware from '../middleware/checkBody.middleware';
import {addMessageController} from '../../controller/message/addMessage/addMessage.controller.interface';

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

export default router;
