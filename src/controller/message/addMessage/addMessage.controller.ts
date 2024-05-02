// module import
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ObjectSchema } from 'joi';
// domain import
import { IMessageDomain, MessageDomain } from '../../../domain/message.domain';
import { IResponseDomain } from '../../../domain/response.domain';
// controller main class import
import { Controller } from '../../controller';
// interface import
import { IAddMessageService } from '../../../service/message/addMessage/addMessage.service.interface';
import { IAddMessageController } from './addMessage.controller.interface';

export class AddMessageController
  extends Controller
  implements IAddMessageController
{
  private addMessageService: IAddMessageService;

  public constructor(
    addMessageSchema: ObjectSchema,
    addMessageService: IAddMessageService
  ) {
    super(addMessageSchema);
    this.addMessageService = addMessageService;
  }

  public async addMessage(req: Request, res: Response): Promise<Response> {
    // get controller name for logging
    const controller = AddMessageController.name;
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

      // cast validated body into a message Domain instance
      const body = req.body as IMessageDomain;
      const messageData = new MessageDomain(
        body.text,
        body.sender,
        body.room,
        body.topScore,
        body.details
      );

      // call service
      const { error, message, code, data }: IResponseDomain =
        await this.addMessageService.addMessage(messageData);

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
