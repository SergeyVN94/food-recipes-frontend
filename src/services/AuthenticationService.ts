import _ from 'lodash';
import { stringify } from 'query-string';

import { IAuthenticationService } from 'types/service';
import api from 'api';

class AuthenticationService implements IAuthenticationService {
  async authentication(
    email: string,
    password: string,
  ): Promise<{ access: string }> {
    try {
      const { data } = await api.post(
        '/api/v1/auth/login',
        stringify({ email, password }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' } },
      );

      if (!data || typeof data !== 'object') {
        throw new Error('Invalid authentication response data');
      }

      const { access, errors } = data.data;

      if (errors) throw new Error(errors.msg);

      return ({ access });
    } catch (error) {
      const message = _.get(
        error,
        'response.data.errors.msg',
        _.get(error, 'message'),
      ) as unknown as string;
      throw new Error(message || (error as string));
    }
  }
}
export default AuthenticationService;
