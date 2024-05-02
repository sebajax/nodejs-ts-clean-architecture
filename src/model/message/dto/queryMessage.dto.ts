// module import
import { Exclude, Expose } from 'class-transformer';
// domain import
import { MessageDetail } from '../../../domain/message.domain';

// query message dto
export class QueryMessageDto {
  @Expose()
  id: number;
  @Expose()
  text: string;
  @Expose()
  sender: string;
  @Expose()
  room: string;
  @Expose()
  topScore: MessageDetail;
  @Expose()
  details: MessageDetail[];
  @Expose()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
}
