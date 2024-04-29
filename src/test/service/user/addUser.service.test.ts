// response import
import {
  CREATED,
  INSERT_USER_ERROR,
  USER_EXISTS,
} from '../../../service/user/addUser/addUser.response';
// interface import
import { IAddUserService } from '../../../service/user/addUser/addUser.service.interface';
// service import
import AddUserService from '../../../service/user/addUser/addUser.service';
// dto import
import { CreateUserDTO } from '../../../model/user/dto/createUser.dto';
import { FindUserDTO } from '../../../model/user/dto/findUser.dto';
// domain import
import { UserDomain } from '../../../domain/user.domain';

// Mocking UserModel module
jest.mock('../../../model/user/user.model');

// test #AddUserService()
describe('#AddUserService()', () => {
  // create a user domain instance from body
  const user = new UserDomain('John Doo', 'example@example.com');

  it('It should pass and return that the user was created successfully CREATED', async () => {
    // mock create user response
    const userCreated = new CreateUserDTO(1, 'test@test.com');

    // mock model used methods
    const userModelMock = {
      createUser: jest.fn().mockResolvedValue(userCreated),
      findUser: jest.fn().mockResolvedValue(null),
    };

    // instance AddUserService class
    const addUserService = new AddUserService(userModelMock);

    // execute use case
    const result = await addUserService.addUser(user);

    // assert model methods were called with correct arguments
    expect(userModelMock.findUser).toHaveBeenCalledWith(user.email);
    expect(userModelMock.createUser).toHaveBeenCalledWith(user);

    // assert expectations
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

  it('It should not pass and return user already exists USER_EXISTS', async () => {
    // mock finded user response
    const findedUser = new FindUserDTO(1, 'Test', 'test@test.com');

    // mock model used methods
    const userModelMock = {
      createUser: jest.fn().mockResolvedValue(null),
      findUser: jest.fn().mockResolvedValue(findedUser),
    };

    // instance AddUserService class
    const addUserService = new AddUserService(userModelMock);

    // execute use case
    const result = await addUserService.addUser(user);

    // assert model methods were called with correct arguments
    expect(userModelMock.findUser).toHaveBeenCalledWith(user.email);
    expect(userModelMock.createUser).not.toHaveBeenCalled();

    // assert expectations
    expect(result).toEqual({
      error: USER_EXISTS.error,
      code: USER_EXISTS.code,
      message: USER_EXISTS.message,
    });
  });

  it('It should fail when an exception occurs INSERT_USER_ERROR', async () => {
    // mock model used methods
    const userModelMock = {
      createUser: jest.fn().mockResolvedValue(null),
      findUser: jest.fn().mockRejectedValue(new Error('infraestructure error')),
    };

    // instance AddUserService class
    const addUserService: IAddUserService = new AddUserService(userModelMock);

    // execute use case
    const result = await addUserService.addUser(user);

    // sinon - assert stubs expectation
    expect(userModelMock.findUser).toHaveBeenCalledWith(user.email);
    await expect(userModelMock.findUser).rejects.toThrow(
      'infraestructure error'
    );
    expect(userModelMock.createUser).not.toHaveBeenCalled();

    // assert expectations
    expect(result).toEqual({
      error: INSERT_USER_ERROR.error,
      code: INSERT_USER_ERROR.code,
      message: INSERT_USER_ERROR.message,
    });
  });
});
