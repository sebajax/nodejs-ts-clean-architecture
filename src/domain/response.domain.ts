// global response domain
interface IResponseDomain {
  error: boolean;
  message: string;
  code: number;
  data?: object;
}

// for addMessageService response domain
interface IAddMessageResponse {
  INSERT_MESSAGE_ERROR: IResponseDomain;
  CREATED: IResponseDomain;
}

export {IResponseDomain, IAddMessageResponse};
