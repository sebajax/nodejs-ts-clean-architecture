// module import
import { Request, Response } from 'express';
// controller import
import { AddMessageController } from './addMessage.controller';
// schema import
import { addMessageSchema } from './addMessage.controller.schema';
// service import
import { addMessageService } from '../../../service/message/addMessage/addMessage.service.interface';

// interface to implement the controller
export interface IAddMessageController {
  addMessage(req: Request, res: Response): Promise<Response>;
}

// controller factory init
export const addMessageController = new AddMessageController(
  addMessageSchema,
  addMessageService
);
