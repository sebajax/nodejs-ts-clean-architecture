// Module import
import { plainToClass } from 'class-transformer';
import { inject, injectable } from 'inversify';
import { Repository } from 'typeorm';
// Interface import
import {
  IUserRepository,
  USER_REPOSITORY_TYPE,
} from './user.repository.interface';
// Entity import
import { UserEntity } from './user.repository.entity';
// Dto import
import { CreateUserDto } from './dto/createUser.dto';
import { QueryUserDto } from './dto/queryUser.dto';
// Domain import
import { UserDomain } from '../../../domains/user.domain';

@injectable()
class UserRepository implements IUserRepository {
  constructor(
    @inject(USER_REPOSITORY_TYPE.UserRepositoryEntity)
    private readonly _repository: Repository<UserEntity>
  ) {}

  public async createUser(user: UserDomain): Promise<CreateUserDto> {
    // Create a new UserEntity instance
    const userEntity = this._repository.create(user);
    // Save the UserEntity instance
    const createdUser = await this._repository.save(userEntity);
    return plainToClass(CreateUserDto, createdUser, {
      excludeExtraneousValues: true,
    });
  }

  public async findUser(email: string): Promise<QueryUserDto | null> {
    const user = await this._repository.findOne({
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

export { UserRepository };
