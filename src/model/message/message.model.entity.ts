// module import
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
// domain import
import { MessageDetail } from '../../domain/message.domain';

@Entity()
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'text',
    type: 'text',
    nullable: false,
  })
  text: string;

  @Column({
    name: 'sender',
    type: 'text',
    nullable: false,
  })
  sender: string;

  @Index('idx_message_room')
  @Column({
    name: 'room',
    type: 'text',
    nullable: false,
  })
  room: string;

  @Column({
    name: 'top_score',
    type: 'jsonb',
    nullable: false,
  })
  topScore: MessageDetail;

  @Column({
    name: 'details',
    type: 'jsonb',
    nullable: false,
  })
  details: MessageDetail[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
