// module import
import {Model, Table, Column, DataType} from 'sequelize-typescript';
// interface import
import {
  IMessageModel,
  MessageCreationAttributes,
} from './message.model.interface';

@Table({
  tableName: 'message',
  timestamps: true,
})
class MessageModel
  extends Model<IMessageModel, MessageCreationAttributes>
  implements IMessageModel
{
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'message_id',
  })
  messageId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  sender: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  text: string;

  @Column({
    type: DataType.JSONB,
    allowNull: false,
  })
  details: object;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: 'message_timestamp',
  })
  messageTimestamp: Date;

  @Column({
    type: DataType.JSONB,
    allowNull: false,
    field: 'top_score',
  })
  topScore: object;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  room: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'created_at',
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'updated_at',
  })
  updatedAt: Date;

  // method for creating a new message into the databse
  public async createMessage(
    message: MessageCreationAttributes
  ): Promise<object> {
    const messageCreate = new MessageModel(message);
    return messageCreate.save();
  }
}

export default MessageModel;
