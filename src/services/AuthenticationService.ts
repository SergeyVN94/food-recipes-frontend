import _ from 'lodash';

import api from 'api';

class AuthenticationService {
  async authentication(
    email: string,
    password: string,
  ): Promise<{ refresh: string, access: string }> {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
      const { data } = await api.post('/api/v1/auth/token/create/', formData);

      if (!data || typeof data !== 'object') {
        throw new Error('Invalid authentication response data');
      }

      const { refresh, access, errors } = data.data;

      if (errors) throw new Error(errors.msg);

      return ({ refresh, access });
    } catch (error) {
      const message = _.get(
        error,
        'response.data.errors.msg',
        _.get(error, 'message'),
      ) as unknown as string;
      throw new Error(message || (error as string));
    }
  }

  async refreshToken(refreshToken: string): Promise<{ access: string; refresh: string } | Error> {
    const formData = new FormData();
    formData.set('refresh', refreshToken);

    try {
      const response = await api({
        method: 'post',
        url: '/api/v1/auth/token/refresh/',
        data: formData,
      });
      const { access, refresh } = _.get(response, 'data.data');

      if (!_.isString(access) || !_.isString(refresh)) throw new Error('Invalid response data');

      return ({ access, refresh });
    } catch (error) {
      return new Error(_.get(error, 'message', 'Unknown error'));
    }
  }
}
export default AuthenticationService;
