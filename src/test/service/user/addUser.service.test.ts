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
import { IUserData } from '../../../controller/user/addUser/addUser.controller.interface';
import { IAddUserService } from '../../../service/user/addUser/addUser.service.interface';
// service import
import AddUserService from '../../../service/user/addUser/addUser.service';
// model import
import { UserModel } from '../../../model/user/user.model';
import { IUserEntity } from '../../../model/user/user.model.interface';

const expect = chai.expect;

// test #AddUserService()
describe('#AddUserService()', () => {
  afterEach(() => {
    // restore the default sandbox here
    sinon.restore();
  });

  // mock request body
  const userData = {
    name: 'John Doo',
    email: 'example@example.com',
  } as IUserData;

  it('It should pass and return that the user was created successfully CREATED', async () => {
    // mock create user response
    const userCreated: IUserEntity = {
      id: 1,
      name: 'Test',
      email: 'test@test.com',
    };

    // create a stub instance for models
    const userModelMock = sinon.createStubInstance(UserModel, {
      create: Promise.resolve(userCreated),
      findUser: Promise.resolve(null),
    });

    // instance AddUserService class
    const addUserService: IAddUserService = new AddUserService(userModelMock);

    // execute use case
    const result = await addUserService.addUser(userData);

    // map user data to user model data
    const user = {
      name: userData.name,
      email: userData.email,
    };

    // sinon - assert stubs expectation
    sinon.assert.calledOnceWithExactly(userModelMock.findUser, userData.email);
    sinon.assert.calledOnceWithExactly(userModelMock.create, sinon.match(user));

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
    const findedUser: IUserEntity = {
      id: 1,
      name: 'Test',
      email: 'test@test.com',
    };

    // create a stub instance for models
    const userModel = sinon.createStubInstance(UserModel, {
      findUser: Promise.resolve(findedUser),
    });

    // instance AddUserService class
    const addUserService: IAddUserService = new AddUserService(userModel);

    // execute use case
    const result = await addUserService.addUser(userData);

    // sinon - assert stubs expectation
    sinon.assert.calledOnceWithExactly(userModel.findUser, userData.email);
    sinon.assert.notCalled(userModel.create);

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
    const result = await addUserService.addUser(userData);

    // sinon - assert stubs expectation
    sinon.assert.calledOnceWithExactly(userModel.findUser, userData.email);
    sinon.assert.notCalled(userModel.create);

    // chai - assert usecase expectation
    expect(result).to.be.a('object');
    expect(result).to.have.property('error', INSERT_USER_ERROR.error);
    expect(result).to.have.property('code', INSERT_USER_ERROR.code);
    expect(result).to.have.property('message', INSERT_USER_ERROR.message);
  });
});
