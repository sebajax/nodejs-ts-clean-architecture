/*
 * response domain
 */

// response domain interface
interface IResponseDomain {
  error: boolean;
  message: string;
  code: number;
  data: object;
}

// response domain class
class ResponseDomain implements IResponseDomain {
  error: boolean;
  message: string;
  code: number;
  data: object;

  constructor({ error, message, code }: IResponseDomain, data: object) {
    this.error = error;
    this.message = message;
    this.code = code;
    this.data = data;
  }
}

export { IResponseDomain, ResponseDomain };
