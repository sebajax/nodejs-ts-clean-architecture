// controller import
import AddUserController from '../addUser/addUser.controller';
// schema import
import { addUserSchema } from '../../../schema/user.schema';
// interface import
import { addUserService } from '../../../service/user/addUser/addUser.service.interface';

/*
 * controller factory init
 */
const addUserController: AddUserController = new AddUserController(
  addUserSchema,
  addUserService
);

export { addUserController };
