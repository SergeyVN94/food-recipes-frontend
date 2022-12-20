import axios from 'axios';
import _ from 'lodash';

import api from 'api';
import { authenticationStore } from 'store';
import { sleep } from 'utils';

import { ApiRequestFunc } from './types';

export const apiRequest: ApiRequestFunc = async (requestConfig, replaceConfig = {}) => {
  const { attempts = 3, timeout = 1000 } = replaceConfig;

  for (let i = 1; i <= attempts; i += 1) {
    try {
      const headers = _.merge(
        requestConfig.headers,
        { Authorization: `Bearer ${authenticationStore.accessToken}` },
      );
      // eslint-disable-next-line no-await-in-loop
      const response = await api({ ...requestConfig, headers });
      const data = _.get(response, 'data');

      return ({ data, success: true });
    } catch (err) {
      if (axios.isCancel(err)) return ({ success: false, cancel: true });

      const resError = new Error();
      const response = _.get(err, 'response') as any;

      if (!response) {
        resError.message = 'Ошибка соединения с сервером';
        console.error(resError);

        // eslint-disable-next-line no-continue
        continue;
      }

      const detail = _.get(response, 'data.errors.detail') as string;
      const msg = _.get(response, 'data.errors.msg');

      // if (String(response.status) === '401') {
      //   if (detail.includes('Given token not valid')) {
      //     // eslint-disable-next-line no-await-in-loop
      //     if (!authenticationStore.isLoading) await authenticationStore.doRefreshToken();
      //     i -= 1;
      //     if (i < 1) i = 0;
      //   }
      // }

      if (detail) resError.message = detail;
      else if (msg) resError.message = msg;
      else resError.message = 'Неизвестная ошибка';

      if (String(response.status) !== '401') {
        console.error(resError);
      }

      if (i === attempts) {
        return ({
          error: resError,
          success: false,
        });
      }
    }

    // eslint-disable-next-line no-await-in-loop
    await sleep(timeout);
  }

  return ({ error: new Error('Неизвестная ошибка'), success: false });
};
