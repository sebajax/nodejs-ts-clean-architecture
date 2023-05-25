// module import
import {Optional} from 'sequelize';
// model import
import {UserModel} from '../index';

interface IUserModel {
  userId: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  createUser(data: object): Promise<object>;
}

type UserCreationAttributes = Optional<IUserModel, 'userId'>;

/*
 * model factory init
 */
const userModel: IUserModel = new UserModel();

export {IUserModel, UserCreationAttributes, userModel};
