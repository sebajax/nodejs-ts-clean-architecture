// module import
import {Request, Response} from 'express';
import {ObjectSchema} from 'joi';
import {StatusCodes} from 'http-status-codes';
// domain import
import IResponseDomain from '../../../domain/response.domain';
// controller main class import
import Controller from '../../controller';
// interface import
import {IAddUserService} from '../../../service/user/addUser/addUser.service.interface';
import {IUserData} from './addUser.controller.interface';

class AddUserController extends Controller {
  private addUserSchema: ObjectSchema;
  private addUserService: IAddUserService;

  public constructor(
    addUserSchema: ObjectSchema,
    addUserService: IAddUserService
  ) {
    super();
    this.addUserSchema = addUserSchema;
    this.addUserService = addUserService;
  }

  public async addUser(req: Request, res: Response): Promise<Response> {
    // get controller name for logging
    const controller = AddUserController.name;
    const method = 'post';
    // casting body to interface type
    const userData = req.body as IUserData;
    // log end point execution
    this.logger.info(
      this.logMessage.init(req.url, method, req.method, controller, userData)
    );

    try {
      // validate request with schema
      const {error: errorRequest} = this.addUserSchema.validate(userData);
      if (errorRequest !== undefined) {
        this.logger.warn(
          this.logMessage.error(
            req.method,
            controller,
            StatusCodes.BAD_REQUEST,
            errorRequest.details[0].message
          )
        );
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send({error: true, message: errorRequest.details[0].message});
      }

      // call service
      const {error, message, code, data}: IResponseDomain =
        await this.addUserService.addUser(userData);

      return res.status(code).send({error, message, data});
    } catch (error) {
      this.logMessage.error(
        req.method,
        controller,
        StatusCodes.INTERNAL_SERVER_ERROR,
        error
      );
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({error: true, message: 'SERVER_ERROR'});
    }
  }
}

export default AddUserController;
