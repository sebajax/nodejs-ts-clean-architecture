// domain import
import IResponseDomain from '../../../domain/response.domain';
// interface import
import { IMessageModel } from '../../../model/message/message.model.interface';
import {
  IGetMessagesResponse,
  IGetMessagesService,
} from './getMessages.service.interface';
// service main class import
import Service from '../../service';
// response import
import getMessagesResponse from './getMessages.response';
// util import
import PaginationUtil from '../../../util/pagination.util';

class GetMessagesService extends Service implements IGetMessagesService {
  private response: IGetMessagesResponse;
  private messageModel: IMessageModel;

  public constructor(messageModel: IMessageModel) {
    super();
    this.response = getMessagesResponse;
    this.messageModel = messageModel;
  }

  public async getMessages(page: number): Promise<IResponseDomain> {
    try {
      // pagination data
      const offset = PaginationUtil.getPagination(page);

      const getMessages = await this.messageModel.getMessages(
        PaginationUtil.limit,
        offset
      );

      // get pagination info
      const { count, rows } = getMessages;
      const { total, current } = PaginationUtil.getPaginationData(count, page);

      // if all the process was succuessfully we return an OK status
      return {
        ...this.response.OK,
        data: {
          messages: rows,
          showing: rows.length,
          total: count,
          pages: total,
          page: current,
        },
      };
    } catch (error) {
      this.logger.error(`${GetMessagesService.name} error ${error}`);
      return this.response.GET_MESSAGES_ERROR;
    }
  }
}

export default GetMessagesService;
