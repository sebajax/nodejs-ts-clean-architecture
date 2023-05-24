// module import
import {Optional} from 'sequelize';
// model import
import {MessageModel} from '../index';

interface IMessageModel {
  messageId: number;
  sender: string;
  text: string;
  details: object;
  messageTimestamp: Date;
  topScore: object;
  room: string;
  createdAt: Date;
  updatedAt: Date;
  createMessage(data: object): Promise<object>;
}

type MessageCreationAttributes = Optional<IMessageModel, 'messageId'>;

/*
 * model factory init
 */
const messageModel: IMessageModel = new MessageModel();

export {IMessageModel, MessageCreationAttributes, messageModel};
