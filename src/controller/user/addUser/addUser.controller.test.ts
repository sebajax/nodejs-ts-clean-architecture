// module import
import { Request, Response } from 'express';
// domain import
import { ResponseDomain } from '../../../domain/response.domain';
import { UserDomain } from '../../../domain/user.domain';
// response import
import addUserResponse from '../../../service/user/addUser/addUser.response';
// schema import
import { addUserSchema } from '../../../schema/user.schema';
// controller import
import { TestController } from '../../test.controller';
import { AddUserController } from './addUser.controller';

// test #AddUserController()
describe('#AddUserController()', () => {
  it('It should pass and return status 201 and that the user was created successfully CREATED', async () => {
    // request body
    const body = {
      name: 'Test',
      email: 'test@test.com',
    };

    // generate mockReq/mockRes from TestController static class
    const mockReq = TestController.mockRequest(body);
    const mockRes = TestController.mockResponse();

    // cast body into a user Domain instance
    const user = new UserDomain(body.name, body.email);

    // mock an api response
    const serviceReturn = new ResponseDomain(addUserResponse.CREATED, {
      id: 1,
      name: user.name,
      email: user.email,
    });

    // mock AddUserService
    const mockAddUserService = {
      addUser: jest.fn().mockResolvedValue(serviceReturn),
    };

    // instance AddUserController class
    const addUserController = new AddUserController(
      addUserSchema,
      mockAddUserService
    );

    // execute controller
    const result = await addUserController.addUser(
      mockReq as Request,
      mockRes as Response
    );

    // assert service method were called with correct arguments
    expect(mockAddUserService.addUser).toHaveBeenCalledWith(user);

    // assert expectations
    expect(result.status).toHaveBeenCalledWith(serviceReturn.code);
    expect(result.send).toHaveBeenCalledWith({
      error: serviceReturn.error,
      message: serviceReturn.message,
      data: serviceReturn.data,
    });
  });

  it('It should fail and return status 400 bad request incorrect body schema', async () => {
    // request body
    const body = {
      email: 'test@test.com',
    };

    // generate mockReq/mockRes from TestController static class
    const mockReq = TestController.mockRequest(body);
    const mockRes = TestController.mockResponse();

    // mock AddUserService
    const mockAddUserService = {
      addUser: jest.fn(),
    };

    // instance AddUserController class
    const addUserController = new AddUserController(
      addUserSchema,
      mockAddUserService
    );

    // execute controller
    const result = await addUserController.addUser(
      mockReq as Request,
      mockRes as Response
    );

    // assert service method were called with correct arguments
    expect(mockAddUserService.addUser).not.toHaveBeenCalled();

    // assert expectations
    expect(result.status).toHaveBeenCalledWith(400);
    expect(result.send).toHaveBeenCalledWith({
      error: true,
      message: '"name" is required',
    });
  });

  it('It should fail when an exception occurs INSERT_USER_ERROR', async () => {
    // request body
    const body = {
      name: 'Test',
      email: 'test@test.com',
    };

    // generate mockReq/mockRes from TestController static class
    const mockReq = TestController.mockRequest(body);
    const mockRes = TestController.mockResponse();

    // cast body into a user Domain instance
    const user = new UserDomain(body.name, body.email);

    // mock an api response
    const serviceReturn = new ResponseDomain(
      addUserResponse.INSERT_USER_ERROR,
      {
        id: 1,
        name: user.name,
        email: user.email,
      }
    );

    // mock AddUserService
    const mockAddUserService = {
      addUser: jest.fn().mockRejectedValue(new Error('SERVER_ERROR')),
    };

    // instance AddUserController class
    const addUserController = new AddUserController(
      addUserSchema,
      mockAddUserService
    );

    // execute controller
    const result = await addUserController.addUser(
      mockReq as Request,
      mockRes as Response
    );

    // assert service method were called with correct arguments
    expect(mockAddUserService.addUser).toHaveBeenCalledWith(user);

    // assert expectations
    expect(result.status).toHaveBeenCalledWith(serviceReturn.code);
    expect(result.send).toHaveBeenCalledWith({
      error: serviceReturn.error,
      message: 'SERVER_ERROR',
    });
  });
});
