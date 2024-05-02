/*
 * logger domain
 */

// log domain interface
export interface ILogDomain {
  init: Function;
  error: Function;
}

// message domain interface
export interface ILogMessageDomain {
  requestMethod: string;
  controller: string;
  method?: string;
  body?: object;
  statusCode?: number;
  errorMessage?: string;
}
