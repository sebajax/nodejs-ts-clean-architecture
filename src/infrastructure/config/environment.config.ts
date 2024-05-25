const { NODE_ENV, API_NAME, API_VERSION } = process.env;
const VERSION_NUMBER: string = process.env.VERSION_NUMBER
  ? process.env.VERSION_NUMBER
  : '1.0';
const LOG_LEVEL: string = process.env.LOG_LEVEL
  ? process.env.LOG_LEVEL
  : 'debug';
const CLEAN_ARCHITECTURE_API: string = process.env.CLEAN_ARCHITECTURE_API
  ? process.env.CLEAN_ARCHITECTURE_API
  : 'http://localhost:8080/v1';

export default Object.freeze({
  VERSION_NUMBER,
  NODE_ENV,
  API_NAME,
  LOG_LEVEL,
  API_VERSION,
});

export interface IEnvironmentConfig {
  VERSION_NUMBER: string;
  NODE_ENV: string | undefined;
  API_NAME: string | undefined;
  LOG_LEVEL: string;
  API_VERSION: string | undefined;
  CLEAN_ARCHITECTURE_API: string;
}

export const environmentConfig: IEnvironmentConfig = {
  VERSION_NUMBER: VERSION_NUMBER,
  NODE_ENV: NODE_ENV,
  API_NAME: API_NAME,
  LOG_LEVEL: LOG_LEVEL,
  API_VERSION: API_VERSION,
  CLEAN_ARCHITECTURE_API: CLEAN_ARCHITECTURE_API,
};

export { API_NAME, API_VERSION, LOG_LEVEL, NODE_ENV, VERSION_NUMBER };
