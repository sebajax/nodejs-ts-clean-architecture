// model import
import { MessageModel } from './message.model';
import { MessageEntity } from './message.model.entity';
// db import
import { AppDataSource } from '../../infraestructure/database/db';
// domain import
import { MessageDomain } from '../../domain/message.domain';
// dto import
import { CreateMessageDto } from './dto/createMessage.dto';
import { QueryMessageDto } from './dto/queryMessage.dto';

export interface IMessageModel {
  createMessage(message: MessageDomain): Promise<CreateMessageDto>;
  getMessages(): Promise<QueryMessageDto[]>;
}

// get entity repository
const messageRepository = AppDataSource.getRepository(MessageEntity);

// model factory init
export const messageModel = new MessageModel(messageRepository);
