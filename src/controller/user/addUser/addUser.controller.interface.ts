// module import
import { Request, Response } from 'express';
// controller import
import { AddUserController } from '../addUser/addUser.controller';
// schema import
import { addUserSchema } from './addUser.controller.schema';
// service import
import { addUserService } from '../../../service/user/addUser/addUser.service.interface';

// interface to implement the controller
export interface IAddUserController {
  addUser(req: Request, res: Response): Promise<Response>;
}

// controller factory init
export const addUserController = new AddUserController(
  addUserSchema,
  addUserService
);
