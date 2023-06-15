// module import
import {Optional} from 'sequelize';
// model import
import {MessageModel} from '../index';

interface IMessageModel {
  messageId: number;
  text: string;
  details: object;
  messageTimestamp: Date;
  topScore: object;
  room: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number; // FK to user
  createMessage(data: object): Promise<object>;
  getMessages(
    limit: number,
    offset: number
  ): Promise<{count: number; rows: Array<object>}>;
}

type MessageCreationAttributes = Optional<IMessageModel, 'messageId'>;

/*
 * model factory init
 */
const messageModel: IMessageModel = new MessageModel();

export {IMessageModel, MessageCreationAttributes, messageModel};
