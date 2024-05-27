// module import
import { Request, Response } from 'express';
import { inject } from 'inversify';
import {
  controller,
  httpPost,
  request,
  response,
} from 'inversify-express-utils';
// domain import
import { IResponseDomain } from '../../../domains/response.domain';
// infrastructure import
import { ValidationMiddleware } from '../../../infrastructure/middleware/validate.middleware';
// use case import
import {
  ADD_USER_TYPE,
  IAddUser,
  ResponseAddUser,
} from '../../../usecases/user/addUser/addUser.interface';
// schema import
import { IAddUserRequest } from './user.interface';
import { addUserSchema } from './user.schema';

@controller('/user')
export class UserController {
  public constructor(
    @inject(ADD_USER_TYPE.AddUser) private _addUser: IAddUser
  ) {}

  @httpPost('/', ValidationMiddleware.prototype.validate(addUserSchema))
  async addUser(
    @request() req: Request,
    @response() res: Response
  ): Promise<void> {
    // cast validated body into a user Domain instance
    const user = req.body as unknown as IAddUserRequest; // Type assertion

    // call the use case
    const { error, message, code, data }: IResponseDomain<ResponseAddUser> =
      await this._addUser.execute(user);

    res.status(code).json({ error, message, data });
  }
}
