// domain import
import type { ResponseDomain } from '../../../domains/response.domain';
import type { UserDomain } from '../../../domains/user.domain';
// provider import
import { AddUserProvider } from './addUser.provider';
// infrastructure import
import { environmentConfig } from '../../../infrastructure/config/environment.config';
import { http } from '../../../infrastructure/http/http.interface';

// interface to implement the provider
export interface IAddUserProvider {
  create(user: UserDomain): Promise<ResponseDomain>;
}

// provider factory init
export const addUserProvider = new AddUserProvider(environmentConfig, http);
