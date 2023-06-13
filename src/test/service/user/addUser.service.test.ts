// module import
import sinon from 'sinon';
import {afterEach} from 'mocha';
import chai from 'chai';
// response import
import {
  CREATED,
  USER_EXISTS,
  INSERT_USER_ERROR,
} from '../../../service/user/addUser/addUser.response';
// interface import
import {IAddUserService} from '../../../service/user/addUser/addUser.service.interface';
import {IUserData} from '../../../controller/user/addUser/addUser.controller.interface';
// service import
import AddUserService from '../../../service/user/addUser/addUser.service';
// model import
import UserModel from '../../../model/user/user.model';

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
    const userId = 1;

    // create a stub instance for models
    const userModel = sinon.createStubInstance(UserModel, {
      getUser: Promise.resolve(null),
      createUser: Promise.resolve({userId}),
    });

    // instance AddUserService class
    const addUserService: IAddUserService = new AddUserService(userModel);

    // execute use case
    const result = await addUserService.addUser(userData);

    // map user data to user model data
    const user = {
      name: userData.name,
      email: userData.email,
    };

    // sinon - assert stubs expectation
    sinon.assert.calledOnceWithExactly(userModel.getUser, userData.email);
    sinon.assert.calledOnceWithExactly(userModel.createUser, sinon.match(user));

    // chai - assert usecase expectation
    expect(result).to.be.a('object');
    expect(result).to.have.property('error', CREATED.error);
    expect(result).to.have.property('code', CREATED.code);
    expect(result).to.have.property('message', CREATED.message);
    expect(result).to.have.property('data').to.be.a('object');
    expect(result.data)
      .to.have.property('userId')
      .to.be.a('number')
      .to.be.eql(userId);
  });

  it('It should not pass and return user already exists USER_EXISTS', async () => {
    // mock get user response
    const userId = 1;

    // create a stub instance for models
    const userModel = sinon.createStubInstance(UserModel, {
      getUser: Promise.resolve({userId}),
    });

    // instance AddUserService class
    const addUserService: IAddUserService = new AddUserService(userModel);

    // execute use case
    const result = await addUserService.addUser(userData);

    // sinon - assert stubs expectation
    sinon.assert.calledOnceWithExactly(userModel.getUser, userData.email);
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
      getUser: Promise.reject(new Error('error')),
    });

    // instance AddUserService class
    const addUserService: IAddUserService = new AddUserService(userModel);

    // execute use case
    const result = await addUserService.addUser(userData);

    // sinon - assert stubs expectation
    sinon.assert.calledOnceWithExactly(userModel.getUser, userData.email);
    sinon.assert.notCalled(userModel.createUser);

    // chai - assert usecase expectation
    expect(result).to.be.a('object');
    expect(result).to.have.property('error', INSERT_USER_ERROR.error);
    expect(result).to.have.property('code', INSERT_USER_ERROR.code);
    expect(result).to.have.property('message', INSERT_USER_ERROR.message);
  });
});
