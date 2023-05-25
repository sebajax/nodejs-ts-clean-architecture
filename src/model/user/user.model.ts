// module import
import {Model, Table, Column, DataType, HasMany} from 'sequelize-typescript';
// interface import
import {IUserModel, UserCreationAttributes} from './user.model.interface';
// model import
import MessageModel from '../message/message.model';

@Table({
  tableName: 'message',
  timestamps: true,
})
class UserModel
  extends Model<IUserModel, UserCreationAttributes>
  implements IUserModel
{
  userId: number;
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'user_id',
  })
  user_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

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

  @HasMany(() => MessageModel)
  players: MessageModel[];

  // method for creating a new user into the databse
  public async createUser(user: UserCreationAttributes): Promise<object> {
    const userCreate = new UserModel(user);
    return userCreate.save();
  }
}

export default UserModel;
