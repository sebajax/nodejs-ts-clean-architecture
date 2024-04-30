// module import
import { Repository } from 'typeorm';
// interface import
import { IUserModel } from './user.model.interface';
// entity import
import { UserEntity } from './user.model.entity';
// dto import
import { CreateUserDTO, ICreateUserDTO } from './dto/createUser.dto';
import { FindUserDTO, IFindUserDTO } from './dto/findUser.dto';
// domain import
import { UserDomain } from '../../domain/user.domain';

export class UserModel implements IUserModel {
  private userRepository: Repository<UserEntity>;

  public constructor(userRepository: Repository<UserEntity>) {
    this.userRepository = userRepository;
  }

  public async createUser(user: UserDomain): Promise<ICreateUserDTO> {
    const createdUser = await this.userRepository.save(user);
    return new CreateUserDTO(createdUser.id, createdUser.email);
  }

  public async findUser(email: string): Promise<IFindUserDTO | null> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (user !== null) {
      return new FindUserDTO(user.id, user.name, user.email);
    }

    return null;
  }
}
