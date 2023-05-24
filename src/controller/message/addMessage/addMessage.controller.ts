// module import
import {Request, Response} from 'express';
import {ObjectSchema} from 'joi';
import {StatusCodes} from 'http-status-codes';
// domain import
import IResponseDomain from '../../../domain/response.domain';
// controller main class import
import Controller from '../../controller';
// interface import
import {IAddMessageService} from '../../../service/message/addMessage/addMessage.service.interface';
import {IMessageData} from './addMessage.controller.interface';

class AddMessageController extends Controller {
  private addMessageSchema: ObjectSchema;
  private addMessageService: IAddMessageService;

  public constructor(
    addMessageSchema: ObjectSchema,
    addMessageService: IAddMessageService
  ) {
    super();
    this.addMessageSchema = addMessageSchema;
    this.addMessageService = addMessageService;
  }

  public async addMessage(req: Request, res: Response): Promise<Response> {
    // get controller name for logging
    const controller = AddMessageController.name;
    const method = 'post';
    // casting body to interface type
    const messagaData = req.body as IMessageData;
    // log end point execution
    this.logger.info(
      this.logMessage.init(req.url, method, req.method, controller, messagaData)
    );

    try {
      // validate request with schema
      const {error: errorRequest} = this.addMessageSchema.validate(messagaData);
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
        await this.addMessageService.addMessage(messagaData);

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

export default AddMessageController;
