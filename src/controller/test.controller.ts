// module import
import { Request, Response } from 'express';

// this class will help in the testing for Controllers
export default class TestController {
  // generate mock request
  static mockRequest(body: object): Partial<Request> {
    return {
      body: {
        ...body,
      },
    };
  }

  // generate mock response status and send methods
  static mockResponse(): Partial<Response> {
    return {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
  }
}
