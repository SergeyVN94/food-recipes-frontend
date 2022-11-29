/* eslint-disable object-curly-newline */
import { SERVICE_API_DATA_KEY, ApiDataType } from 'types/apiDataService';

export const mapApiKeyToUrl: { [key in SERVICE_API_DATA_KEY]: string } = {
  [SERVICE_API_DATA_KEY.GENERAL]: '/api/v1/site_settings/general/',
};

export const normalizeApiDataFunctions: {
  [key in SERVICE_API_DATA_KEY]?: (item: object) => ApiDataType<key>;
} = {};

export const apiDataToFormDataFunctions: {
  [key in SERVICE_API_DATA_KEY]?: (item: ApiDataType<key>) => FormData
} = {};
