// module import
import { Request, Response } from 'express';
// controller import
import { GetMessagesController } from './getMessages.controller';
// service import
import { getMessagesService } from '../../../service/message/getMessages/getMessages.service.interface';

// interface to implement the controller
export interface IGetMessagesController {
  getMessages(req: Request, res: Response): Promise<Response>;
}

// controller factory init
export const getMessagesController = new GetMessagesController(
  getMessagesService
);
