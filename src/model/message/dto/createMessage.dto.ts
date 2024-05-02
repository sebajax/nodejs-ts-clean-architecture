import { Expose } from 'class-transformer';

/*
 * create a new message dto
 */
export class CreateMessageDto {
  @Expose()
  id: number;
  @Expose()
  sender: string;
  @Expose()
  createdAt: Date;
}
