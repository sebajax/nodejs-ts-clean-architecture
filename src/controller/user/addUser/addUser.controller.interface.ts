// controller import
import AddUserController from '../addUser/addUser.controller';
// schema import
import {addUserSchema} from '../../../schema/user.schema';
// interface import
import {addUserService} from '../../../service/user/addUser/addUser.service.interface';

/*
 * body request data interface
 */
interface IUserData {
  name: string;
  email: string;
}

/*
 * controller factory init
 */
const addUserController: AddUserController = new AddUserController(
  addUserSchema,
  addUserService
);

export {IUserData, addUserController};
