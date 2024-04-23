// module import
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
// interface import
import { IUserModel, UserCreationAttributes } from './user.model.interface';
// model import
import MessageModel from '../message/message.model';

@Table({
  tableName: 'user',
  timestamps: true,
})
class UserModel
  extends Model<IUserModel, UserCreationAttributes>
  implements IUserModel
{
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'user_id',
  })
  userId: number;

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
  messages: MessageModel[];

  // method for creating a new user into the databse
  public async createUser(user: UserCreationAttributes): Promise<object> {
    const userCreate = new UserModel(user);
    return userCreate.save();
  }

  // method to get the user data by the email
  public async getUser(email: string): Promise<{ userId: number } | null> {
    return UserModel.findOne({
      where: {
        email,
      },
    });
  }
}

export default UserModel;
