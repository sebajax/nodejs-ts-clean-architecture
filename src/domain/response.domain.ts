/*
 * response domain
 */

// response domain interface
export default interface IResponseDomain {
  error: boolean;
  message: string;
  code: number;
  data?: object;
}

// response domain class
export class ResponseDomain implements IResponseDomain {
  error: boolean;
  message: string;
  code: number;
  data?: object;

  constructor({ error, message, code }: IResponseDomain, data?: object) {
    this.error = error;
    this.message = message;
    this.code = code;
    this.data = data;
  }
}
