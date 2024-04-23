interface ILogDomain {
  init: Function;
  error: Function;
}

interface IMessageDomain {
  requestMethod: string;
  controller: string;
  method?: string;
  body?: object;
  statusCode?: number;
  errorMessage?: string;
}

export { ILogDomain, IMessageDomain };
