const {NODE_ENV, API_NAME, API_VERSION} = process.env;
const VERSION_NUMBER: string = process.env.VERSION_NUMER
  ? process.env.VERSION_NUMER
  : '1.0';
const LOG_LEVEL: string = process.env.LOG_LEVEL
  ? process.env.LOG_LEVEL
  : 'debug';

export default Object.freeze({
  VERSION_NUMBER,
  NODE_ENV,
  API_NAME,
  LOG_LEVEL,
  API_VERSION,
});

export {VERSION_NUMBER, NODE_ENV, API_NAME, LOG_LEVEL, API_VERSION};
