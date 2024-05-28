// Response domain interface
interface IResponseDomain<T> {
  error: boolean;
  message: string;
  code: number;
  data?: T;
}

// Define a type alias for the constructor parameters, excluding 'data'
type TypeResponseDomain<T> = Omit<IResponseDomain<T>, 'data'>;

// Response domain class
class ResponseDomain<T> implements IResponseDomain<T> {
  error: boolean;
  message: string;
  code: number;
  data: T;

  constructor({ error, message, code }: TypeResponseDomain<T>, data: T) {
    this.error = error;
    this.message = message;
    this.code = code;
    this.data = data;
  }
}

export { IResponseDomain, ResponseDomain };
