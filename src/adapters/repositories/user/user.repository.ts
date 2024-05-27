// di import
import { inject, injectable } from 'inversify';
// module import
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
// interface import
import { IUserRepository } from './user.repository.interface';
// entity import
import { UserEntity } from './user.repository.entity';
// dto import
import { CreateUserDto } from './dto/createUser.dto';
import { QueryUserDto } from './dto/queryUser.dto';
// domain import
import { UserDomain } from '../../../domains/user.domain';

@injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @inject(Repository<UserEntity>)
    private _userRepository: Repository<UserEntity>
  ) {}

  public async createUser(user: UserDomain): Promise<CreateUserDto> {
    // Create a new UserEntity instance
    const userEntity = this._userRepository.create(user);
    // Save the UserEntity instance
    const createdUser = await this._userRepository.save(userEntity);
    return plainToClass(CreateUserDto, createdUser, {
      excludeExtraneousValues: true,
    });
  }

  public async findUser(email: string): Promise<QueryUserDto | null> {
    const user = await this._userRepository.findOne({
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
