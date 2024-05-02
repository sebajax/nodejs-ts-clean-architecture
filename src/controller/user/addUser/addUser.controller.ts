// module import
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ObjectSchema } from 'joi';
// domain import
import { IResponseDomain } from '../../../domain/response.domain';
import { IUserDomain, UserDomain } from '../../../domain/user.domain';
// controller main class import
import { Controller } from '../../controller';
// interface import
import { IAddUserService } from '../../../service/user/addUser/addUser.service.interface';
import { IAddUserController } from './addUser.controller.interface';

export class AddUserController
  extends Controller
  implements IAddUserController
{
  private addUserService: IAddUserService;

  public constructor(
    addUserSchema: ObjectSchema,
    addUserService: IAddUserService
  ) {
    super(addUserSchema);
    this.addUserService = addUserService;
  }

  public async addUser(req: Request, res: Response): Promise<Response> {
    // get controller name for logging
    const controller = AddUserController.name;
    const method = 'post';
    // log end point execution
    this.logger.info(
      this.logMessage.init(req.url, method, req.method, controller, req.body)
    );

    try {
      // validate request with schema
      const errorRequest = this.schemaValidation(req.body, controller, method);
      if (errorRequest !== null) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: true, message: errorRequest });
      }

      // cast validated body into a user Domain instance
      const body = req.body as IUserDomain;
      const user = new UserDomain(body.name, body.email);

      // call service
      const { error, message, code, data }: IResponseDomain =
        await this.addUserService.addUser(user);

      return res.status(code).send({ error, message, data });
    } catch (error) {
      this.logMessage.error(
        req.method,
        controller,
        StatusCodes.INTERNAL_SERVER_ERROR,
        error
      );
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: true, message: 'SERVER_ERROR' });
    }
  }
}
