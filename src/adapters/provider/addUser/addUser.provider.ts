// module import
import type { AxiosResponse } from 'axios';
// domain import
import { ResponseDomain } from '../../../domains/response.domain';
import type { UserDomain } from '../../../domains/user.domain';
// interface import
import type { IAddUserProvider } from './addUser.interface';
// provider import
import { Provider } from '../provider';

export class AddUserProvider extends Provider implements IAddUserProvider {
  // method to create a new user
  public async create(user: UserDomain): Promise<ResponseDomain> {
    try {
      // call the api
      const response: AxiosResponse<ResponseDomain> =
        await this.http.client.post(
          `${this.environmentConfig.CLEAN_ARCHITECTURE_API}/user`,
          JSON.stringify(user),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      // return api response
      return new ResponseDomain(response.data);
    } catch (error: unknown) {
      return this.http.handleHttpError(error);
    }
  }
}
