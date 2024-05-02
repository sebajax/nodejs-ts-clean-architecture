/*
 * logger domain
 */

// log domain interface
export interface ILogDomain {
  init: Function;
  error: Function;
}

// message domain interface
export interface IMessageDomain {
  requestMethod: string;
  controller: string;
  method?: string;
  body?: object;
  statusCode?: number;
  errorMessage?: string;
}
