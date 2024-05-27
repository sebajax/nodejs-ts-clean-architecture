import { ResponseDomain } from './response.domain';

interface ICustomError extends Error {
  response: ResponseDomain;
}

class CustomError extends Error implements ICustomError {
  response: ResponseDomain;

  constructor(response: ResponseDomain) {
    super(response.message);
    this.response = response;
  }
}

export { CustomError, ICustomError };
