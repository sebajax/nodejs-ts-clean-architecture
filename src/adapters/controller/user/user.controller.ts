// Module import
import { Request, Response } from 'express';
import { inject } from 'inversify';
import {
  controller,
  httpPost,
  request,
  response,
} from 'inversify-express-utils';
// Domain import
import { IResponseDomain } from '../../../domains/response.domain';
// Infrastructure import
import { ValidationMiddleware } from '../../../infrastructure/middleware/validate.middleware';
// Use case import
import {
  ADD_USER_TYPE,
  IAddUser,
  ResponseAddUser,
} from '../../../usecases/user/addUser/addUser.interface';
// Interface import
import { IAddUserRequest } from './user.interface';
// Schema import
import { addUserSchema } from './user.schema';

@controller('/user')
class UserController {
  public constructor(
    @inject(ADD_USER_TYPE.AddUser) private readonly _addUser: IAddUser
  ) {}

  @httpPost('/', ValidationMiddleware.prototype.validate(addUserSchema))
  async addUser(
    @request() req: Request,
    @response() res: Response
  ): Promise<void> {
    // Cast validated body into a user Domain instance
    const user = req.body as unknown as IAddUserRequest; // Type assertion

    // Call the use case
    const { error, message, code, data }: IResponseDomain<ResponseAddUser> =
      await this._addUser.execute(user);

    res.status(code).json({ error, message, data });
  }
}

export { UserController };
