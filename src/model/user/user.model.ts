// module import
import { Repository } from 'typeorm';
// interface import
import { IUserEntity, IUserModel } from './user.model.interface';
// entity import
import { UserEntity } from './user.model.entity';

export class UserModel implements IUserModel {
  private userRepository: Repository<UserEntity>;

  public constructor(userRepository: Repository<UserEntity>) {
    this.userRepository = userRepository;
  }

  public async create(user: IUserEntity): Promise<IUserEntity> {
    const createdUser = await this.userRepository.save(user);
    console.log(createdUser);
    return createdUser;
  }

  public async findUser(email: string): Promise<IUserEntity | null> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    return user;
  }
}
