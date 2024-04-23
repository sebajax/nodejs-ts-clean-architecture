// module import
import chai from 'chai';
import { afterEach } from 'mocha';
import sinon from 'sinon';
// response import
import { OK } from '../../../service/message/getMessages/getMessages.response';
// interface import
import { IGetMessagesService } from '../../../service/message/getMessages/getMessages.service.interface';
// service import
import GetMessagesService from '../../../service/message/getMessages/getMessages.service';
// model import
import MessageModel from '../../../model/message/message.model';
// util import
import PaginationUtil from '../../../util/pagination.util';

const expect = chai.expect;

// test #GetMessagesService()
describe('#GetMessagesService()', () => {
  afterEach(() => {
    // restore the default sandbox here
    sinon.restore();
  });

  it('It should pass and return all the existing messages paginated OK', async () => {
    // mock params
    const page = 1;

    // mock model response
    const messages = {
      rows: [
        {
          messageId: 1,
          text: 'Testing id 1',
        },
        {
          messageId: 2,
          text: 'Testing id 2',
        },
      ],
      count: 2,
    };

    // create a stub instance for models
    const messageModel = sinon.createStubInstance(MessageModel, {
      getMessages: Promise.resolve(messages),
    });

    // instance GetMessagesService class
    const getMessagesService: IGetMessagesService = new GetMessagesService(
      messageModel
    );

    // execute use case
    const result = await getMessagesService.getMessages(page);

    // pagination data
    const offset = PaginationUtil.getPagination(page);

    // sinon - assert stubs expectation
    // sinon.assert.calledOnceWithExactly(PaginationUtil.getPagination, page);
    sinon.assert.calledOnceWithExactly(
      messageModel.getMessages,
      PaginationUtil.limit,
      offset
    );

    // chai - assert usecase expectation
    expect(result).to.be.a('object');
    expect(result).to.have.property('error', OK.error);
    expect(result).to.have.property('code', OK.code);
    expect(result).to.have.property('message', OK.message);
    expect(result).to.have.property('data').to.be.a('object');
    expect(result.data)
      .to.have.property('messages')
      .to.be.a('array')
      .to.be.eql(messages.rows);
    expect(result.data)
      .to.have.property('total')
      .to.be.a('number')
      .to.be.eql(messages.count);
    expect(result.data)
      .to.have.property('page')
      .to.be.a('number')
      .to.be.eql(page);
  });
});
