// All of the possible error names
enum ErrorNames {
  Error = 'Error',
  EvalError = 'EvalError',
  RangeError = 'RangeError',
  ReferenceError = 'ReferenceError',
  SyntaxError = 'SyntaxError',
  TypeError = 'TypeError',
  URIError = 'URIError',
  AuthenticationError = 'AuthenticationError',
  AuthorizationError = 'AuthorizationError',
  ValidationError = 'ValidationError',
  DatabaseError = 'DatabaseError',
  NotFoundError = 'NotFoundError',
  ConflictError = 'ConflictError',
  TimeoutError = 'TimeoutError',
  ServiceUnavailableError = 'ServiceUnavailableError',
  NetworkError = 'NetworkError',
  BadRequestError = 'BadRequestError',
  ForbiddenError = 'ForbiddenError',
  InternalServerError = 'InternalServerError',
  PaymentRequiredError = 'PaymentRequiredError',
  MethodNotAllowedError = 'MethodNotAllowedError',
  GoneError = 'GoneError',
  PayloadTooLargeError = 'PayloadTooLargeError',
  UnsupportedMediaTypeError = 'UnsupportedMediaTypeError',
  UnprocessableEntityError = 'UnprocessableEntityError',
  TooManyRequestsError = 'TooManyRequestsError',
}

// Response error domain interface
interface IResponseErrorDomain extends Error {
  name: ErrorNames;
  error: boolean;
  message: string;
  code: number;
}

// Response error domain class
class ResponseErrorDomain extends Error implements IResponseErrorDomain {
  name: ErrorNames;
  error: boolean;
  message: string;
  code: number;

  constructor({ name, error, message, code }: IResponseErrorDomain) {
    super(message);
    this.name = name;
    this.error = error;
    this.code = code;
  }
}

export { ErrorNames, IResponseErrorDomain, ResponseErrorDomain };
