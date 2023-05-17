const {NODE_ENV} = process.env;
const VERSION_NUMBER: string = process.env.VERSION_NUMER
  ? process.env.VERSION_NUMER
  : '1.0';
const API_NAME: string = process.env.API_NAME
  ? process.env.API_NAME
  : 'nodejs-ts-abcdin';
const LOG_LEVEL: string = process.env.LOG_LEVEL
  ? process.env.LOG_LEVEL
  : 'debug';

export default Object.freeze({
  VERSION_NUMBER,
  NODE_ENV,
  API_NAME,
  LOG_LEVEL,
});

export {VERSION_NUMBER, NODE_ENV, API_NAME, LOG_LEVEL};
