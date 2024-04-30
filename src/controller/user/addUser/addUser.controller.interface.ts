// module import
import { Request, Response } from 'express';
// controller import
import AddUserController from '../addUser/addUser.controller';
// schema import
import { addUserSchema } from '../../../schema/user.schema';
// interface import
import { addUserService } from '../../../service/user/addUser/addUser.service.interface';

// interface to implement the controller
interface IAddUserController {
  addUser(req: Request, res: Response): Promise<Response>;
}

/*
 * controller factory init
 */
const addUserController = new AddUserController(addUserSchema, addUserService);

export { addUserController, IAddUserController };
