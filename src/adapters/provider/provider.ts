// interface import
import { type IEnvironmentConfig } from '../../infrastructure/config/environment.config';
// infrastructure import
import type { Http } from '../../infrastructure/http/http';

/*
 * provider main class import all the providers must extend this class
 */
export abstract class Provider {
  public environmentConfig: IEnvironmentConfig;
  public http: Http;

  public constructor(environmentConfig: IEnvironmentConfig, http: Http) {
    this.environmentConfig = environmentConfig;
    this.http = http;
  }
}
