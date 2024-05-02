// module import
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
// interface import
import { IMessageModel } from './message.model.interface';
// entity import
import { MessageEntity } from './message.model.entity';
// dto import
import { CreateMessageDto } from './dto/createMessage.dto';
import { QueryMessageDto } from './dto/queryMessage.dto';
// domain import
import { MessageDomain } from '../../domain/message.domain';

export class MessageModel implements IMessageModel {
  private messageRepository: Repository<MessageEntity>;

  public constructor(messageRepository: Repository<MessageEntity>) {
    this.messageRepository = messageRepository;
  }

  public async createMessage(
    message: MessageDomain
  ): Promise<CreateMessageDto> {
    const createdMessage = await this.messageRepository.save(message);
    return plainToClass(CreateMessageDto, createdMessage, {
      excludeExtraneousValues: true,
    });
  }

  public async getMessages(): Promise<QueryMessageDto[]> {
    const messages = await this.messageRepository.find();
    return messages.map(message =>
      plainToClass(QueryMessageDto, message, {
        excludeExtraneousValues: true,
      })
    );
  }
}
