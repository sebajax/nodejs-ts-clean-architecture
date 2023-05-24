import {Optional} from 'sequelize';
import MessageModel from './message.model';

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
