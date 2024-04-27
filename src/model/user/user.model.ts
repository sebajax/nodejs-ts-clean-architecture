// module import
import { Repository } from 'typeorm';
// interface import
import { IUserModel } from './user.model.interface';
// entity import
import { UserEntity } from './user.model.entity';
// dto import
import { CreateUserDTO } from './dto/createUser.dto';
import { FindUserDTO } from './dto/findUser.dto';
// domain import
import { IUserDomain } from '../../domain/user.domain';

export class UserModel implements IUserModel {
  private userRepository: Repository<UserEntity>;

  public constructor(userRepository: Repository<UserEntity>) {
    this.userRepository = userRepository;
  }

  public async createUser(user: IUserDomain): Promise<CreateUserDTO> {
    const createdUser = await this.userRepository.save(user);
    return new CreateUserDTO(createdUser.id, createdUser.email);
  }

  public async findUser(email: string): Promise<FindUserDTO | null> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    return user;
  }
}
