// module import
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
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
import {
  ILogger,
  LOGGER_TYPE,
} from '../../../infrastructure/logging/logger.interface';
import { validate } from '../../../infrastructure/middleware/validate.middleware';
// use case import
import {
  ADD_USER_TYPE,
  IAddUser,
} from '../../../usecases/user/addUser/addUser.interface';
// schema import
import { IAddUserRequest } from './user.interface';
import { addUserSchema } from './user.schema';

@controller('/user')
export class UserController {
  // logger
  private _logger: ILogger;
  // use cases
  private _addUser: IAddUser;

  public constructor(
    @inject(LOGGER_TYPE.Logger) logger: ILogger,
    @inject(ADD_USER_TYPE.AddUser) addUser: IAddUser
  ) {
    this._logger = logger;
    this._addUser = addUser;
  }

  @httpPost('/', validate(addUserSchema))
  async addUser(
    @request() req: Request,
    @response() res: Response
  ): Promise<void> {
    // log end point execution
    this._logger.info(req.url, {
      method: req.method,
      body: req.body,
    });
    try {
      // cast validated body into a user Domain instance
      const user = req.body as unknown as IAddUserRequest; // Type assertion

      // call the use case
      const { error, message, code, data }: IResponseDomain =
        await this._addUser.execute(user);

      res.status(code).send({ error, message, data });
    } catch (error: unknown) {
      this._logger.error(req.url, {
        method: req.method,
        body: req.body,
        error,
      });
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: true, message: 'SERVER_ERROR' });
    }
  }
}
