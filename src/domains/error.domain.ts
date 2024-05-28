// Response error domain interface
interface IResponseErrorDomain extends Partial<Error> {
  error: boolean;
  message: string;
  code: number;
}

// Response error domain class
class ResponseErrorDomain extends Error implements IResponseErrorDomain {
  error: boolean;
  message: string;
  code: number;

  constructor({ error, message, code }: IResponseErrorDomain) {
    super(message);
    this.error = error;
    this.code = code;
  }
}

export { IResponseErrorDomain, ResponseErrorDomain };
