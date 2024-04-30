// module import
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
// interface import
import { IUserModel } from './user.model.interface';
// entity import
import { UserEntity } from './user.model.entity';
// dto import
import { CreateUserDto } from './dto/createUser.dto';
import { QueryUserDto } from './dto/queryUser.dto';
// domain import
import { UserDomain } from '../../domain/user.domain';

export class UserModel implements IUserModel {
  private userRepository: Repository<UserEntity>;

  public constructor(userRepository: Repository<UserEntity>) {
    this.userRepository = userRepository;
  }

  public async createUser(user: UserDomain): Promise<CreateUserDto> {
    const createdUser = await this.userRepository.save(user);
    return plainToClass(CreateUserDto, createdUser, {
      excludeExtraneousValues: true,
    });
  }

  public async findUser(email: string): Promise<QueryUserDto | null> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (user !== null) {
      return plainToClass(QueryUserDto, user, {
        excludeExtraneousValues: true,
      });
    }

    return null;
  }
}
