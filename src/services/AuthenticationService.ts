import _ from 'lodash';
import { stringify } from 'query-string';

import { IAuthenticationService } from 'types/service';
import { UserRegister } from 'types/user';
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

      if (_.isNil(data) || !_.isObject(data)) {
        throw new Error('Invalid authentication response data');
      }

      const { accessToken, error } = data as { accessToken: string, error: Error };

      if (error) throw new Error(error.message);
      if (!accessToken) throw new Error('Некорректный токен');

      return ({ access: accessToken });
    } catch (error) {
      const message = _.get(
        error,
        'response.data.error.msg',
        _.get(error, 'message'),
      ) as unknown as string;
      throw new Error(message || (error as string));
    }
  }

  async signup(userRegister: UserRegister) {
    try {
      const { data } = await api.post(
        '/api/v1/auth/signup',
        stringify(userRegister),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' } },
      );

      if (!data || typeof data !== 'object') {
        throw new Error('Invalid authentication response data');
      }

      const { access, error } = data.data;

      if (error) throw new Error(error.msg);

      return ({ access });
    } catch (error) {
      const message = _.get(
        error,
        'response.data.error.msg',
        _.get(error, 'message'),
      ) as unknown as string;
      throw new Error(message || (error as string));
    }
  }
}

export default AuthenticationService;
