// module import
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
// domain import
import IResponseDomain from '../../../domain/response.domain';
// controller main class import
import Controller from '../../controller';
// interface import
import { IGetMessagesService } from '../../../service/message/getMessages/getMessages.service.interface';

class GetMessagesController extends Controller {
  private getMessagesService: IGetMessagesService;

  public constructor(getMessagesService: IGetMessagesService) {
    super();
    this.getMessagesService = getMessagesService;
  }

  public async getMessages(req: Request, res: Response): Promise<Response> {
    // get controller name for logging
    const controller = GetMessagesController.name;
    const method = 'get';
    // casting body to interface type
    const page: number = parseInt(req.params.page);
    // log end point execution
    this.logger.info(
      this.logMessage.init(req.url, method, req.method, controller)
    );

    try {
      // check params
      if (Number.isNaN(page)) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: true, message: 'PAGE_REQUIRED' });
      }

      // call service
      const { error, message, code, data }: IResponseDomain =
        await this.getMessagesService.getMessages(page);

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

export default GetMessagesController;
