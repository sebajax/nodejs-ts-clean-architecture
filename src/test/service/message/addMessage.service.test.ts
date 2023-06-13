// module import
import sinon from 'sinon';
import {afterEach} from 'mocha';
import chai from 'chai';
// response import
import {
  CREATED,
  USER_NOT_FOUND,
  INSERT_MESSAGE_ERROR,
} from '../../../service/message/addMessage/addMessage.response';
// interface import
import {IAddMessageService} from '../../../service/message/addMessage/addMessage.service.interface';
import {IMessageData} from '../../../controller/message/addMessage/addMessage.controller.interface';
// service import
import AddMessageService from '../../../service/message/addMessage/addMessage.service';
// model import
import MessageModel from '../../../model/message/message.model';
import UserModel from '../../../model/user/user.model';

const expect = chai.expect;

// test #AddMessageService()
describe('#AddMessageService()', () => {
  afterEach(() => {
    // restore the default sandbox here
    sinon.restore();
  });

  // mock request body
  const messagaData = {
    text: 'Probando texto',
    sender: 'example@example.com',
    room: 'probando_room',
    messageTimestamp: new Date('2023-5-17'),
    classification: {
      topScore: {
        token: 'secret_token',
        riskId: 1,
        classificationId: 5,
      },
      details: [
        {
          token: 'secret_token',
          riskId: 1,
          classificationId: 5,
        },
        {
          token: 'secret_token',
          riskId: 2,
          classificationId: 3,
        },
      ],
    },
  } as IMessageData;

  it('It should pass and return that the message was created successfully CREATED', async () => {
    // mock create message response
    const messageId = 1;
    const userId = 10;

    // create a stub instance for models
    const messageModel = sinon.createStubInstance(MessageModel, {
      createMessage: Promise.resolve({messageId}),
    });
    const userModel = sinon.createStubInstance(UserModel, {
      getUser: Promise.resolve({userId}),
    });

    // instance AddMessageService class
    const addMessageService: IAddMessageService = new AddMessageService(
      messageModel,
      userModel
    );

    // execute use case
    const result = await addMessageService.addMessage(messagaData);

    // map message data to message model data
    const message = {
      text: messagaData.text,
      userId: userId,
      details: messagaData.classification.details,
      messageTimestamp: messagaData.messageTimestamp,
      topScore: messagaData.classification.topScore,
      room: messagaData.room,
    };

    // sinon - assert stubs expectation
    sinon.assert.calledOnceWithExactly(userModel.getUser, messagaData.sender);
    sinon.assert.calledOnceWithExactly(
      messageModel.createMessage,
      sinon.match(message)
    );

    // chai - assert usecase expectation
    expect(result).to.be.a('object');
    expect(result).to.have.property('error', CREATED.error);
    expect(result).to.have.property('code', CREATED.code);
    expect(result).to.have.property('message', CREATED.message);
    expect(result).to.have.property('data').to.be.a('object');
    expect(result.data)
      .to.have.property('messageId')
      .to.be.a('number')
      .to.be.eql(messageId);
  });

  it('It should not pass and return user not found USER_NOT_FOUND', async () => {
    // create a stub instance for models
    const messageModel = sinon.createStubInstance(MessageModel);
    const userModel = sinon.createStubInstance(UserModel, {
      getUser: Promise.resolve(null),
    });

    // instance AddMessageService class
    const addMessageService: IAddMessageService = new AddMessageService(
      messageModel,
      userModel
    );

    // execute use case
    const result = await addMessageService.addMessage(messagaData);

    // sinon - assert stubs expectation
    sinon.assert.calledOnceWithExactly(userModel.getUser, messagaData.sender);
    sinon.assert.notCalled(messageModel.createMessage);

    // chai - assert usecase expectation
    expect(result).to.be.a('object');
    expect(result).to.have.property('error', USER_NOT_FOUND.error);
    expect(result).to.have.property('code', USER_NOT_FOUND.code);
    expect(result).to.have.property('message', USER_NOT_FOUND.message);
  });

  it('It should fail when an exception occurs INSERT_MESSAGE_ERROR', async () => {
    // create a stub instance for models
    const messageModel = sinon.createStubInstance(MessageModel);
    const userModel = sinon.createStubInstance(UserModel, {
      getUser: Promise.reject(new Error('error')),
    });

    // instance AddMessageService class
    const addMessageService: IAddMessageService = new AddMessageService(
      messageModel,
      userModel
    );

    // execute use case
    const result = await addMessageService.addMessage(messagaData);

    // sinon - assert stubs expectation
    sinon.assert.calledOnceWithExactly(userModel.getUser, messagaData.sender);
    sinon.assert.notCalled(messageModel.createMessage);

    // chai - assert usecase expectation
    expect(result).to.be.a('object');
    expect(result).to.have.property('error', INSERT_MESSAGE_ERROR.error);
    expect(result).to.have.property('code', INSERT_MESSAGE_ERROR.code);
    expect(result).to.have.property('message', INSERT_MESSAGE_ERROR.message);
  });
});
