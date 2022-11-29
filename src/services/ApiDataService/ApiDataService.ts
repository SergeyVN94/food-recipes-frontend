import _ from 'lodash';

import { SERVICE_API_DATA_KEY, ApiDataType, ApiRequestParams } from 'types/apiDataService';
import { ServiceApiResponse, ServiceApiResponseWithData } from 'services/types';
import { objectKeysToCamelCase, objectKeysToSnakeCase } from 'utils/common';

import { apiRequest } from '../utils';
import { mapApiKeyToUrl, apiDataToFormDataFunctions, normalizeApiDataFunctions } from './lib';

export class ApiDataService {
  async fetchData<K extends SERVICE_API_DATA_KEY>(
    key: K,
    requestConfig?: ApiRequestParams<K>,
  ): Promise<ServiceApiResponseWithData<ApiDataType<K>, unknown>> {
    const { data, error } = await apiRequest({
      method: 'GET',
      url: mapApiKeyToUrl[key],
    });

    if (error) return ({ error, success: false });

    const apiData = _.get(data, 'data.data');

    if (!_.isObject(apiData)) {
      return ({
        success: false,
        error: new Error('Invalid response data'),
      });
    }

    const normalizeFunc = normalizeApiDataFunctions[key];

    return ({
      success: true,
      data: normalizeFunc ? normalizeFunc(apiData) : apiData as ApiDataType<K>,
    });
  }

  async saveData<K extends SERVICE_API_DATA_KEY>(
    key: K,
    data: ApiDataType<K>,
    requestConfig?: ApiRequestParams<K>,
  ): Promise<ServiceApiResponse> {
    const toFormDataFunc = apiDataToFormDataFunctions[key];
    if (toFormDataFunc) {
      return apiRequest({
        method: 'PUT',
        url: mapApiKeyToUrl[key],
        data: toFormDataFunc(data),
      });
    }

    const formData: FormData = new FormData();
    _.entries(data).forEach(([k, value]) => formData.set(k, value as string));

    return apiRequest({
      method: 'PUT',
      url: mapApiKeyToUrl[key],
      data: formData,
    });
  }
}

export default ApiDataService;
