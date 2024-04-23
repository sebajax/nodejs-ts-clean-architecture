// module import
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
// interface import
import {
  IMessageModel,
  MessageCreationAttributes,
} from './message.model.interface';
// model import
import UserModel from '../user/user.model';

@Table({
  tableName: 'message',
  timestamps: true,
})
class MessageModel
  extends Model<IMessageModel, MessageCreationAttributes>
  implements IMessageModel {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'message_id',
  })
  messageId: number;

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

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'user_id',
  })
  userId: number;

  @BelongsTo(() => UserModel)
  user: UserModel;

  // method for creating a new message into the databse
  public async createMessage(
    message: MessageCreationAttributes
  ): Promise<object> {
    const messageCreate = new MessageModel(message);
    return messageCreate.save();
  }

  // method for getting all the messages with pagination
  public async getMessages(
    limit: number,
    offset: number
  ): Promise<{ count: number; rows: Array<object> }> {
    const messages = await MessageModel.findAndCountAll({
      include: {
        model: UserModel,
        attributes: ['name', 'email'],
        required: true,
      },
      limit,
      offset,
    });

    return {
      count: messages.count,
      rows: messages.rows as Array<object>,
    };
  }
}

export default MessageModel;
