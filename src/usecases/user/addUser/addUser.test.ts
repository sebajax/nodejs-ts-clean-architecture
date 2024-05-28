import 'reflect-metadata';
// Response import
import { CREATED } from './addUser.response';
// Domain import
import { Container } from 'inversify';
import { type CreateUserDto } from '../../../adapters/repositories/user/dto/createUser.dto';
import {
  IUserRepository,
  USER_REPOSITORY_TYPE,
} from '../../../adapters/repositories/user/user.repository.interface';
import { UserDomain } from '../../../domains/user.domain';
import { Logger } from '../../../infrastructure/logging/logger';
import {
  ILogger,
  LOGGER_TYPE,
} from '../../../infrastructure/logging/logger.interface';
import { AddUser } from './addUser';
import { ADD_USER_TYPE, IAddUser } from './addUser.interface';
// Infrastructure import

// Test #AddUser()
describe('#AddUser()', () => {
  let userRepositoryMock: jest.Mocked<IUserRepository>;
  let addUser: IAddUser;
  let testContainer: Container;
  // Create a user domain instance from body
  const user = new UserDomain('John Doo', 'example@example.com');

  beforeEach(() => {
    // Create a mock UserRepository
    userRepositoryMock = {
      createUser: jest.fn(),
      findUser: jest.fn(),
    } as jest.Mocked<IUserRepository>;
    // Create a new container for each test
    testContainer = new Container();
    // Bind the logger
    testContainer.bind<ILogger>(LOGGER_TYPE.Logger).to(Logger);
    // Bind the needed repository
    testContainer
      .bind<IUserRepository>(USER_REPOSITORY_TYPE.UserRepository)
      .toConstantValue(userRepositoryMock);
    // Bind the use case
    testContainer.bind<IAddUser>(ADD_USER_TYPE.AddUser).to(AddUser);
    // Get the user container with a new repository binding
    addUser = testContainer.get<IAddUser>(ADD_USER_TYPE.AddUser);
  });

  afterEach(() => {
    // Clean up container after each test
    testContainer.unbindAll();
  });

  // Each test is executed with a snapshot of the container
  it('It should pass and return that the user was created successfully CREATED', async () => {
    // Mock create user response
    const userCreated = {
      id: 1,
      email: 'test@test.com',
    } as CreateUserDto;

    // Mock repository used methods
    userRepositoryMock.createUser.mockResolvedValue(userCreated);
    userRepositoryMock.findUser.mockResolvedValue(null);

    // Execute use case
    const result = await addUser.execute(user);

    // Assert model methods were called with correct arguments
    expect(userRepositoryMock.findUser).toHaveBeenCalledWith(user.email);
    expect(userRepositoryMock.createUser).toHaveBeenCalledWith(user);

    // Assert expectations
    expect(result).toEqual({
      error: CREATED.error,
      code: CREATED.code,
      message: CREATED.message,
      data: {
        id: userCreated.id,
        email: userCreated.email,
      },
    });
  });
});
