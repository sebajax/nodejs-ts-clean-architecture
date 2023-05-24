// domain import
import {Request, Response} from 'express';
import {ObjectSchema} from 'joi';
import {StatusCodes} from 'http-status-codes';
import IResponseDomain from '../../domain/response.domain';
import Controller from '../controller';
import {IAddMessageService} from '../../service/message/addMessage/addMessage.interface';
import {IMessageData} from '../../schema/message.schema';

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
    // destructuring req info
    const {body} = req;
    // log end point execution
    this.logger.info(
      this.logMessage.init(req.url, method, req.method, controller, body)
    );

    try {
      // validate request with schema
      const {error: errorRequest} = this.addMessageSchema.validate(body);
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
        await this.addMessageService.addMessage(body as IMessageData);

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
