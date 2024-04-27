// module import
import chai from 'chai';
import { afterEach } from 'mocha';
import sinon from 'sinon';
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
// model import
import { UserModel } from '../../../model/user/user.model';
// dto import
import { CreateUserDTO } from '../../../model/user/dto/createUser.dto';
import { FindUserDTO } from '../../../model/user/dto/findUser.dto';
// domain import
import { UserDomain } from '../../../domain/user.domain';

const expect = chai.expect;

// test #AddUserService()
describe('#AddUserService()', () => {
  afterEach(() => {
    // restore the default sandbox here
    sinon.restore();
  });

  // create a user domain instance from body
  const user = new UserDomain('John Doo', 'example@example.com');

  it('It should pass and return that the user was created successfully CREATED', async () => {
    // mock create user response
    const userCreated = new CreateUserDTO(1, 'test@test.com');

    // create a stub instance for models
    const userModelMock = sinon.createStubInstance(UserModel, {
      createUser: Promise.resolve(userCreated),
      findUser: Promise.resolve(null),
    });

    // instance AddUserService class
    const addUserService: IAddUserService = new AddUserService(userModelMock);

    // execute use case
    const result = await addUserService.addUser(user);

    // sinon - assert stubs expectation
    sinon.assert.calledOnceWithExactly(userModelMock.findUser, user.email);
    sinon.assert.calledOnceWithExactly(
      userModelMock.createUser,
      sinon.match(user)
    );

    // chai - assert usecase expectation
    expect(result).to.be.a('object');
    expect(result).to.have.property('error', CREATED.error);
    expect(result).to.have.property('code', CREATED.code);
    expect(result).to.have.property('message', CREATED.message);
    expect(result).to.have.property('data').to.be.a('object');
    expect(result.data)
      .to.have.property('id')
      .to.be.a('number')
      .to.be.eql(userCreated.id);
  });

  it('It should not pass and return user already exists USER_EXISTS', async () => {
    // mock finded user response
    const findedUser = new FindUserDTO(1, 'Test', 'test@test.com');

    // create a stub instance for models
    const userModel = sinon.createStubInstance(UserModel, {
      findUser: Promise.resolve(findedUser),
    });

    // instance AddUserService class
    const addUserService: IAddUserService = new AddUserService(userModel);

    // execute use case
    const result = await addUserService.addUser(user);

    // sinon - assert stubs expectation
    sinon.assert.calledOnceWithExactly(userModel.findUser, user.email);
    sinon.assert.notCalled(userModel.createUser);

    // chai - assert usecase expectation
    expect(result).to.be.a('object');
    expect(result).to.have.property('error', USER_EXISTS.error);
    expect(result).to.have.property('code', USER_EXISTS.code);
    expect(result).to.have.property('message', USER_EXISTS.message);
  });

  it('It should fail when an exception occurs INSERT_USER_ERROR', async () => {
    // create a stub instance for models
    const userModel = sinon.createStubInstance(UserModel, {
      findUser: Promise.reject(new Error('error')),
    });

    // instance AddUserService class
    const addUserService: IAddUserService = new AddUserService(userModel);

    // execute use case
    const result = await addUserService.addUser(user);

    // sinon - assert stubs expectation
    sinon.assert.calledOnceWithExactly(userModel.findUser, user.email);
    sinon.assert.notCalled(userModel.createUser);

    // chai - assert usecase expectation
    expect(result).to.be.a('object');
    expect(result).to.have.property('error', INSERT_USER_ERROR.error);
    expect(result).to.have.property('code', INSERT_USER_ERROR.code);
    expect(result).to.have.property('message', INSERT_USER_ERROR.message);
  });
});
